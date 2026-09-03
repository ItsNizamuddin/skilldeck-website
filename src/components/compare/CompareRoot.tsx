"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ArrowUpRight, Award, BadgeCheck, Check, ChevronDown, Gauge, Layers, Minus, Plus, Trophy, X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ComparisonProof from "@/components/shared/ComparisonProof";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { buildColumn, buildCompanyColumn, CompareColumn, CompareSchedule, CompareTenant, humanDate, money } from "./compareModel";
import { COMPARE_GROUPS, CompareRow, rowDiffers, rowHasData, winnerIndex } from "./compareRows";
import ComparePickerModal, { PickerItem } from "./ComparePickerModal";
import CompareSkeleton from "./CompareSkeleton";

export const COMPARE_STORAGE_KEY = "skilldeck:compare";
const MAX_COMPARE = 4;

/** What the page is comparing. "both" mixes institutes and individual batches. */
type CompareView = "both" | "company" | "schedule";

/** Selections are prefixed so institutes and schedules can share one list. */
const companyKey = (id: string) => `c:${id}`;
const scheduleKey = (id: string) => `s:${id}`;
const isCompanyKey = (key: string) => key.startsWith("c:");
const rawId = (key: string) => key.slice(2);

/** What the schedule drawer persists: enough to re-fetch the full payload. */
export interface CompareRef {
    id: string;
    slug?: string;
}

function readSelection(): CompareRef[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = sessionStorage.getItem(COMPARE_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((r) => r && r.id).slice(0, MAX_COMPARE) : [];
    } catch {
        return [];
    }
}

function writeSelection(refs: CompareRef[]) {
    try {
        sessionStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(refs));
    } catch {
        /* storage disabled — comparison simply will not persist */
    }
}

const tenantName = (t: CompareTenant) => t.legalName || t.name || "Training partner";

const VIEW_OPTIONS: { value: CompareView; label: string }[] = [
    { value: "both", label: "Both" },
    { value: "company", label: "Institutes" },
    { value: "schedule", label: "Schedules" },
];

export default function CompareRoot() {
    const { openModal } = useLeadModal();
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Absent `type` means "both" — the course page still links with type=companies.
    const typeParam = params.get("type");
    const view: CompareView =
        typeParam === "companies" ? "company" : typeParam === "schedules" ? "schedule" : "both";
    const courseSlug = params.get("course") || undefined;
    const titleParam = params.get("title") || params.get("courseTitle");
    const urlIds = useMemo(
        () => (params.get("ids") || "").split(",").map((v) => v.trim()).filter(Boolean),
        [params]
    );

    const [schedules, setSchedules] = useState<CompareSchedule[]>([]);

    const rawCourseTitle = titleParam || schedules[0]?.product?.name || schedules[0]?.marketplaceProduct?.name;

    const displayCourseTitle = useMemo(() => {
        if (rawCourseTitle) {
            const cleaned = rawCourseTitle.replace(/\s+(training|course|certification|provider|providers)$/i, "").trim();
            return cleaned || rawCourseTitle;
        }
        if (courseSlug) {
            const words = courseSlug.split("-").filter((w) => w !== "training" && w !== "course");
            if (words.length === 0) return undefined;
            return words.map((w) => (w.length <= 4 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");
        }
        return undefined;
    }, [rawCourseTitle, courseSlug]);
    const [tenants, setTenants] = useState<CompareTenant[]>([]);
    const [directory, setDirectory] = useState<CompareTenant[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyKey, setBusyKey] = useState<string | null>(null);
    const [diffOnly, setDiffOnly] = useState(false);
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const [currency, setCurrency] = useState("INR");
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [pickerOpen, setPickerOpen] = useState(false);

    const scheduleQuery = useCallback(
        (extra: Record<string, string>) =>
            `/api/schedules?${new URLSearchParams({ limit: "50", currency, timezone, ...extra }).toString()}`,
        [currency, timezone]
    );

    // Everything is set inside the async body, so the selection is seeded once
    // from real data rather than from a placeholder.
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const storedCurrency = sessionStorage.getItem("currency") || "INR";
            const storedTimezone = sessionStorage.getItem("timezone") || "Asia/Kolkata";
            const qs = (extra: Record<string, string>) =>
                `/api/schedules?${new URLSearchParams({ limit: "50", currency: storedCurrency, timezone: storedTimezone, ...extra }).toString()}`;

            try {
                let list: CompareSchedule[] = [];
                let tenantList: CompareTenant[] = [];
                let directoryList: CompareTenant[] = [];

                if (courseSlug) {
                    const [res, dir] = await Promise.all([
                        fetch(qs({ slug: courseSlug })).then((r) => (r.ok ? r.json() : { data: [], tenants: [] })),
                        fetch("/api/tenants?limit=50").then((r) => (r.ok ? r.json() : { data: [] })),
                    ]);
                    if (cancelled) return;
                    list = res?.data || [];
                    tenantList = res?.tenants || [];
                    directoryList = dir?.data || [];
                    setDirectory(directoryList);
                } else {
                    const refs = readSelection();
                    const slugs = Array.from(new Set(refs.map((r) => r.slug).filter((v): v is string => Boolean(v))));
                    const responses = await Promise.all(
                        (slugs.length > 0 ? slugs : [undefined]).map((slug) =>
                            fetch(qs(slug ? { slug } : {})).then((r) => (r.ok ? r.json() : { data: [], tenants: [] }))
                        )
                    );
                    if (cancelled) return;
                    list = responses.flatMap((r) => r?.data || []);
                    tenantList = responses.flatMap((r) => r?.tenants || []);
                    setDirectory([]);

                    // Honour whatever the drawer picked when there is no course context.
                    const seenDrawerTenants = new Set<string>();
                    const picked = refs
                        .map((r) => list.find((s) => s._id === r.id || s.id === r.id || s.code === r.id))
                        .filter((s): s is CompareSchedule => Boolean(s))
                        .filter((s) => {
                            if (!s.tenantId) return true;
                            if (seenDrawerTenants.has(s.tenantId)) return false;
                            seenDrawerTenants.add(s.tenantId);
                            return true;
                        })
                        .map((s) => scheduleKey((s._id || s.id)!));
                    if (picked.length > 0) {
                        setSchedules(list);
                        setTenants(tenantList);
                        setSelectedKeys(picked.slice(0, MAX_COMPARE));
                        setCurrency(storedCurrency);
                        setTimezone(storedTimezone);
                        return;
                    }
                }

                setSchedules(list);
                setTenants(tenantList);

                // An explicit ?ids= list wins — that is what the course page hands
                // over when someone opens the full comparison.
                if (urlIds.length > 0) {
                    const tenantIds = new Set(
                        [...tenantList, ...directoryList].map((t) => t.id).filter(Boolean)
                    );
                    const scheduleIds = new Set(list.map((s) => s._id || s.id).filter(Boolean));

                    const keys = urlIds
                        .map((id) => {
                            if (view === "company") return companyKey(id);
                            if (view === "schedule") return scheduleKey(id);
                            if (tenantIds.has(id) || list.some((s) => s.tenantId === id)) return companyKey(id);
                            return scheduleIds.has(id) ? scheduleKey(id) : companyKey(id);
                        })
                        .slice(0, MAX_COMPARE);

                    setSelectedKeys(keys);
                    setCurrency(storedCurrency);
                    setTimezone(storedTimezone);

                    // Institutes with no batch for this course would otherwise render
                    // an empty column, so pull their other schedules.
                    const missing = keys
                        .filter((k) => isCompanyKey(k) && !list.some((s) => s.tenantId === rawId(k)))
                        .map((k) => rawId(k));
                    if (missing.length > 0) {
                        const extra = await Promise.all(
                            missing.map((tenantId) =>
                                fetch(qs({ tenantId })).then((r) => (r.ok ? r.json() : null)).catch(() => null)
                            )
                        );
                        if (cancelled) return;
                        const extraSchedules = extra.flatMap((r) => r?.data || []);
                        const extraTenants = extra.flatMap((r) => r?.tenants || []);
                        if (extraSchedules.length) setSchedules((prev) => [...prev, ...extraSchedules]);
                        if (extraTenants.length) setTenants((prev) => [...prev, ...extraTenants]);
                    }
                    return;
                }

                // One column per training provider: an institute column already
                // folds in every batch it runs, so adding its own batch beside it
                // would just repeat the same numbers.
                const seenTenants = new Set<string>();
                const seed: string[] = [];

                if (view !== "schedule") {
                    list.forEach((s) => {
                        if (!s.tenantId || seenTenants.has(s.tenantId)) return;
                        seenTenants.add(s.tenantId);
                        seed.push(companyKey(s.tenantId));
                    });
                }

                if (view !== "company") {
                    list.forEach((s) => {
                        const id = s._id || s.id;
                        if (!id || !s.tenantId || seenTenants.has(s.tenantId)) return;
                        seenTenants.add(s.tenantId);
                        seed.push(scheduleKey(id));
                    });
                }

                setSelectedKeys(seed.slice(0, MAX_COMPARE));
                setCurrency(storedCurrency);
                setTimezone(storedTimezone);
            } catch {
                if (!cancelled) {
                    setSchedules([]);
                    setTenants([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        const timer = setTimeout(load, 0);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [view, courseSlug, urlIds]);

    const columns: CompareColumn[] = useMemo(
        () =>
            selectedKeys
                .slice(0, MAX_COMPARE)
                .map((key) => {
                    if (isCompanyKey(key)) {
                        const tenantId = rawId(key);
                        const list = schedules.filter((s) => s.tenantId === tenantId);
                        const tenant =
                            tenants.find((t) => t.id === tenantId) ||
                            directory.find((t) => t.id === tenantId) || { id: tenantId };
                        return buildCompanyColumn(tenant, list, currency);
                    }
                    const id = rawId(key);
                    const schedule = schedules.find((s) => s._id === id || s.id === id || s.code === id);
                    if (!schedule) return null;
                    return buildColumn(schedule, tenants.find((t) => t.id === schedule.tenantId), currency);
                })
                .filter((c): c is CompareColumn => Boolean(c)),
        [selectedKeys, schedules, tenants, directory, currency]
    );

    const hasCourseBatches = useCallback(
        (tenantId: string) => schedules.some((s) => s.tenantId === tenantId),
        [schedules]
    );

    const tenantIdOfKey = useCallback(
        (key: string): string | undefined => {
            if (isCompanyKey(key)) return rawId(key);
            const id = rawId(key);
            return schedules.find((s) => s._id === id || s.id === id || s.code === id)?.tenantId;
        },
        [schedules]
    );

    /** Providers already occupying a column, in either representation. */
    const usedTenantIds = useMemo(
        () => new Set(selectedKeys.map(tenantIdOfKey).filter((v): v is string => Boolean(v))),
        [selectedKeys, tenantIdOfKey]
    );

    /** Everything that can still be added, in whichever units the view allows. */
    const addable: PickerItem[] = useMemo(() => {
        const selected = new Set(selectedKeys);
        const items: PickerItem[] = [];

        if (view !== "schedule") {
            const withSchedules = new Set(schedules.map((s) => s.tenantId));
            [...tenants, ...directory]
                .reduce<CompareTenant[]>((acc, t) => {
                    if (!t.id || usedTenantIds.has(t.id) || acc.some((x) => x.id === t.id)) return acc;
                    acc.push(t);
                    return acc;
                }, [])
                .sort((a, b) => Number(withSchedules.has(b.id)) - Number(withSchedules.has(a.id)))
                .forEach((t) =>
                    items.push({
                        key: companyKey(t.id!),
                        title: tenantName(t),
                        subtitle: withSchedules.has(t.id) ? "Runs batches for this course" : "Other programmes only",
                        logo: t.logo,
                        group: "Institutes",
                    })
                );
        }

        if (view !== "company") {
            // Only one batch per provider is offered, for the same reason.
            const offered = new Set<string>();
            schedules
                .filter((s) => {
                    const id = s._id || s.id;
                    if (!id || selected.has(scheduleKey(id))) return false;
                    if (!s.tenantId) return true;
                    if (usedTenantIds.has(s.tenantId) || offered.has(s.tenantId)) return false;
                    offered.add(s.tenantId);
                    return true;
                })
                .forEach((s) => {
                    const col = buildColumn(s, tenants.find((t) => t.id === s.tenantId), currency);
                    const bits = [col.companyName, humanDate(col.nextCohort), col.fee > 0 ? money(col.fee, col.symbol) : ""];
                    items.push({
                        key: scheduleKey((s._id || s.id)!),
                        title: col.programme,
                        subtitle: bits.filter(Boolean).join(" · "),
                        logo: col.companyLogo,
                        group: "Schedules",
                    });
                });
        }

        return items;
    }, [view, selectedKeys, usedTenantIds, tenants, directory, schedules, currency]);

    const addItem = useCallback(
        async (key: string) => {
            if (selectedKeys.includes(key) || selectedKeys.length >= MAX_COMPARE) return;

            // A provider gets at most one column, whichever way it is represented.
            const tenantId = tenantIdOfKey(key);
            if (tenantId && usedTenantIds.has(tenantId)) return;

            setSelectedKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
            setPickerOpen(false);

            // Institutes with no batch for this course still deserve a populated
            // column, so pull their other schedules on demand.
            if (isCompanyKey(key) && !hasCourseBatches(rawId(key))) {
                setBusyKey(key);
                try {
                    const res = await fetch(scheduleQuery({ tenantId: rawId(key) })).then((r) => (r.ok ? r.json() : null));
                    if (res?.data?.length) {
                        setSchedules((prev) => [...prev, ...res.data]);
                        if (res.tenants?.length) setTenants((prev) => [...prev, ...res.tenants]);
                    }
                } catch {
                    /* column falls back to the provider profile rows */
                } finally {
                    setBusyKey(null);
                }
            }
        },
        [selectedKeys, usedTenantIds, tenantIdOfKey, hasCourseBatches, scheduleQuery]
    );

    const remove = useCallback(
        (key: string) => {
            setSelectedKeys((prev) => {
                const next = prev.filter((x) => x !== key);
                if (!courseSlug) {
                    writeSelection(next.filter((k) => !isCompanyKey(k)).map((k) => ({ id: rawId(k) })));
                }
                return next;
            });
        },
        [courseSlug]
    );

    const clearAll = useCallback(() => {
        if (!courseSlug) writeSelection([]);
        setSelectedKeys([]);
    }, [courseSlug]);

    const toggleGroup = (key: string) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

    const switchView = useCallback(
        (next: CompareView) => {
            if (next === view) return;
            const qs = new URLSearchParams();
            if (next === "company") qs.set("type", "companies");
            if (next === "schedule") qs.set("type", "schedules");
            if (courseSlug) qs.set("course", courseSlug);

            // Carry the current selection across, translated into the target unit —
            // otherwise the view re-seeds from the course pool and drops providers
            // that have no batch for this course.
            const translated = selectedKeys
                .map((key) => {
                    if (next === "schedule") {
                        if (!isCompanyKey(key)) return rawId(key);
                        const match = schedules.find((x) => x.tenantId === rawId(key));
                        return match?._id || match?.id;
                    }
                    // Institutes and Both are both keyed off the provider.
                    return tenantIdOfKey(key);
                })
                .filter((v): v is string => Boolean(v));

            const unique = Array.from(new Set(translated));
            if (unique.length > 0) qs.set("ids", unique.join(","));

            router.replace(qs.toString() ? `${pathname}?${qs.toString()}` : pathname, { scroll: false });
        },
        [view, courseSlug, pathname, router, selectedKeys, schedules, tenantIdOfKey]
    );

    const awards = useMemo(() => {
        if (columns.length < 2) return [];
        const out: { label: string; title: string; detail: string; className: string; icon: typeof Award }[] = [];

        const priced = columns.filter((c) => c.costPerWeek > 0);
        if (priced.length > 1) {
            const best = priced.reduce((a, b) => (b.costPerWeek < a.costPerWeek ? b : a));
            out.push({
                label: "Best value",
                title: best.programme,
                detail: `${money(best.costPerWeek, best.symbol)} per week of instruction.`,
                className: "bg-amber-700 text-white",
                icon: Award,
            });
        }

        const withContent = columns.filter((c) => c.sessions > 0 || c.modules.length > 0);
        if (withContent.length > 1) {
            const best = withContent.reduce((a, b) =>
                b.sessions + b.modules.length * 2 > a.sessions + a.modules.length * 2 ? b : a
            );
            out.push({
                label: "Most content",
                title: best.programme,
                detail: `${best.sessions} sessions${best.modules.length ? `, ${best.modules.length} modules` : ""}.`,
                className: "bg-emerald-800 text-white",
                icon: Layers,
            });
        }

        const dated = columns.filter((c) => c.nextCohort);
        if (dated.length > 1) {
            const best = dated.reduce((a, b) => (b.nextCohort!.getTime() < a.nextCohort!.getTime() ? b : a));
            out.push({
                label: "Starts soonest",
                title: best.programme,
                detail: "Next cohort begins first.",
                className: "bg-violet-700 text-white",
                icon: Gauge,
            });
        }

        return out;
    }, [columns]);

    const unitLabel = view === "company" ? "institutes" : view === "schedule" ? "schedules" : "options";
    const addNoun = view === "company" ? "an institute" : view === "schedule" ? "a schedule" : "an option";

    const breadcrumb = [
        { label: "Home", href: "/" },
        { label: view === "company" ? "Institutes" : "Courses" },
        { label: "Compare" },
    ];

    const canAdd = selectedKeys.length < MAX_COMPARE && addable.length > 0;

    if (loading) return <CompareSkeleton />;

    return (
        <div className="container mx-auto px-4 lg:px-0 py-8 md:py-12 space-y-6">
            <Breadcrumb items={breadcrumb} />

            <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(120deg,#faf9ff_0%,#ffffff_60%)] px-6 py-8 md:px-10 md:py-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <span className="badge-brand mb-4">
                            <BadgeCheck className="w-3.5 h-3.5 mr-1.5" />
                            Up to four at a time
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark mb-3">
                            Compare{" "}
                            {displayCourseTitle ? (
                                <>
                                    <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                        {displayCourseTitle}
                                    </span>{" "}
                                    Training & certification Providers.
                                </>
                            ) : (
                                <>
                                    {view === "company" ? "institutes" : view === "schedule" ? "schedules" : "your options"}{" "}
                                    <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                        Training & certification Providers.
                                    </span>
                                </>
                            )}
                        </h1>
                        <p className="body-medium max-w-2xl">
                            Compare before you make the decision! Not all the institutes offer same value, cirriculum, price, pre and post training benefits. Compare all the offerings from the providers and place a quote here. We assure you of the best price and suggest the best rated training/certification providers for the {displayCourseTitle ? `${displayCourseTitle} ` : ""}course you are looking at.
                        </p>
                    </div>

                    <ComparisonProof variant="cards" className="lg:col-span-5" />
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <div role="tablist" aria-label="What to compare" className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                        {VIEW_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                role="tab"
                                aria-selected={view === opt.value}
                                onClick={() => switchView(opt.value)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === opt.value
                                    ? "bg-brand-primary text-white"
                                    : "text-slate-600 hover:text-brand-primary"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {columns.length > 0 && (
                        <button
                            type="button"
                            role="switch"
                            aria-checked={diffOnly}
                            onClick={() => setDiffOnly((v) => !v)}
                            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2"
                        >
                            <span className={`relative w-9 h-5 rounded-full transition-colors ${diffOnly ? "bg-brand-primary" : "bg-slate-300"}`}>
                                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${diffOnly ? "left-4.5" : "left-0.5"}`} />
                            </span>
                            <span className="text-xs font-bold text-slate-700">Show differences only</span>
                        </button>
                    )}

                    {canAdd ? (
                        <button
                            type="button"
                            onClick={() => setPickerOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add another
                        </button>
                    ) : (
                        <Link
                            href="/companies/schedules"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Browse more
                        </Link>
                    )}
                </div>

                {columns.length > 0 && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                        Clear comparison
                    </button>
                )}
            </div>

            {columns.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center space-y-3">
                    <p className="text-sm font-bold text-brand-dark">Nothing to compare yet</p>
                    <p className="body-small max-w-md mx-auto">
                        Add up to four {unitLabel} to see them side by side.
                    </p>
                    {canAdd && (
                        <button
                            type="button"
                            onClick={() => setPickerOpen(true)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:underline"
                        >
                            <Plus className="w-4 h-4" />
                            Add {addNoun}
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto overscroll-x-contain">
                        <div className="flex gap-4 min-w-max">
                            <div className="w-[150px] md:w-[190px] shrink-0 flex flex-col justify-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Comparing {unitLabel}
                                </span>
                                <span className="text-sm font-bold text-slate-700">
                                    {columns.length} of {MAX_COMPARE}
                                </span>
                            </div>
                            {columns.map((c, i) => {
                                const key = c.kind === "company" ? companyKey(c.tenant?.id || c.key) : scheduleKey(c.key);
                                return (
                                    <div key={key} className="w-[230px] md:w-[260px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 relative">
                                        <button
                                            type="button"
                                            onClick={() => remove(key)}
                                            aria-label={`Remove ${c.programme}`}
                                            className="absolute top-3 right-3 text-slate-300 hover:text-slate-600"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="flex items-center gap-2 mb-2 pr-5">
                                            <span className="relative w-6 h-6 shrink-0">
                                                {c.companyLogo ? (
                                                    <Image src={c.companyLogo} alt={c.companyName} fill sizes="24px" className="object-contain" />
                                                ) : (
                                                    <span className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center text-[10px] font-black text-purple-600">
                                                        {c.companyName.charAt(0)}
                                                    </span>
                                                )}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold text-slate-500 truncate">{c.companyName}</p>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                    {c.kind === "company" ? "Institute" : "Batch"} · Option {i + 1}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-brand-dark line-clamp-2 mb-2">{c.programme}</p>
                                        {c.fee > 0 && <span className="text-sm font-black text-brand-dark">{money(c.fee, c.symbol)}</span>}
                                        {busyKey === key && <span className="block text-[10px] text-slate-400 mt-1">Loading batches…</span>}
                                    </div>
                                );
                            })}

                            {canAdd && (
                                <button
                                    type="button"
                                    onClick={() => setPickerOpen(true)}
                                    className="w-[230px] md:w-[260px] shrink-0 rounded-2xl border border-dashed border-slate-300 bg-white p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="text-xs font-bold">Add {addNoun}</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {awards.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {awards.map((a) => (
                                <div key={a.label} className={`rounded-2xl p-5 ${a.className}`}>
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white/20 rounded-full px-2.5 py-1 mb-3">
                                        <a.icon className="w-3 h-3" />
                                        {a.label}
                                    </span>
                                    <p className="text-sm font-bold leading-snug">{a.title}</p>
                                    <p className="text-xs opacity-80 mt-1">{a.detail}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {COMPARE_GROUPS.map((group) => {
                        const visibleRows = group.rows.filter((row) => {
                            if (!rowHasData(row, columns)) return false;
                            if (diffOnly && !rowDiffers(row, columns)) return false;
                            return true;
                        });
                        if (visibleRows.length === 0) return null;
                        const isCollapsed = collapsed[group.key];

                        return (
                            <section key={group.key} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(group.key)}
                                    aria-expanded={!isCollapsed}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-b ${group.accent}`}
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest">{group.title}</span>
                                    <span className="flex items-center gap-2 text-[11px] font-semibold">
                                        {visibleRows.length} rows
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                                    </span>
                                </button>

                                {!isCollapsed && (
                                    <div className="overflow-auto max-h-[70vh] overscroll-x-contain">
                                        <table className="w-full table-fixed border-collapse">
                                            <colgroup>
                                                <col className="w-[130px] md:w-[190px]" />
                                                {columns.map((c) => (
                                                    <col key={c.key} className="w-[190px] md:w-[230px]" />
                                                ))}
                                            </colgroup>
                                            {/* Sticky primary header keeps the column identities visible
                                                while a long group scrolls. */}
                                            <thead>
                                                <tr>
                                                    <th className="text-left px-4 py-3 text-[10px] md:text-xs font-bold uppercase tracking-wide text-white bg-brand-primary sticky left-0 top-0 z-30 border-b border-brand-primary">
                                                        Comparing
                                                    </th>
                                                    {columns.map((c) => (
                                                        <th
                                                            key={c.key}
                                                            className="px-4 py-3 bg-brand-primary sticky top-0 z-20 border-b border-l border-white/20 align-middle"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="relative w-6 h-6 shrink-0 rounded-md bg-white p-0.5">
                                                                    {c.companyLogo ? (
                                                                        <Image
                                                                            src={c.companyLogo}
                                                                            alt={c.companyName}
                                                                            fill
                                                                            sizes="24px"
                                                                            className="object-contain p-0.5"
                                                                        />
                                                                    ) : (
                                                                        <span className="flex h-full w-full items-center justify-center text-[10px] font-black text-brand-primary">
                                                                            {c.companyName.charAt(0)}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <span className="min-w-0 text-left text-[11px] md:text-xs font-bold text-white line-clamp-2">
                                                                    {c.kind === "company" ? c.companyName : c.programme}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {visibleRows.map((row) => {
                                                    const win = winnerIndex(row, columns);
                                                    return (
                                                        <tr key={row.key}>
                                                            <th scope="row" className="text-left align-top px-4 py-3 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                                                                <span className="block text-[11px] md:text-xs font-bold text-slate-700">{row.label}</span>
                                                                {row.hint && (
                                                                    <span className="block text-[10px] text-slate-400 mt-0.5 leading-snug">{row.hint}</span>
                                                                )}
                                                            </th>
                                                            {columns.map((c, i) => (
                                                                <ValueCell key={c.key} row={row} column={c} isWinner={i === win} />
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        );
                    })}

                    <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full table-fixed border-collapse">
                            <colgroup>
                                <col className="w-[130px] md:w-[190px]" />
                                {columns.map((c) => (
                                    <col key={c.key} className="w-[190px] md:w-[230px]" />
                                ))}
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row" className="text-left px-4 py-4 text-[11px] md:text-xs font-bold text-slate-700 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                                        Next step
                                    </th>
                                    {columns.map((c) => (
                                        <td key={c.key} className="px-3 py-4 border-l border-slate-100 space-y-2">
                                            <Link
                                                href={c.companyHref}
                                                data-no-loader="true"
                                                className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-xl text-[11px] md:text-xs font-bold text-white bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]"
                                            >
                                                View details
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openModal({
                                                        source: "compare-page",
                                                        formTitle: `Enquire about ${c.programme}`,
                                                        defaultValues: { subject: `Enquiry: ${c.programme} — ${c.companyName}` },
                                                    })
                                                }
                                                className="w-full inline-flex items-center justify-center h-9 rounded-xl border border-slate-200 text-[11px] md:text-xs font-bold text-brand-primary hover:border-brand-primary/40 transition-colors"
                                            >
                                                Enquire
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-center text-[11px] text-slate-400">
                        * Fees and schedule details are indicative and may vary. Please confirm with the training provider.
                    </p>
                </>
            )}

            {pickerOpen && (
                <ComparePickerModal
                    items={addable}
                    noun={addNoun}
                    onPick={addItem}
                    onClose={() => setPickerOpen(false)}
                />
            )}
        </div>
    );
}

function ValueCell({ row, column, isWinner }: { row: CompareRow; column: CompareColumn; isWinner: boolean }) {
    const chips = row.chips ? row.chips(column) : null;
    const value = row.value(column);

    return (
        <td className={`px-3 md:px-4 py-3 border-l border-slate-100 align-top text-[11px] md:text-xs ${isWinner ? "bg-emerald-50/70" : ""}`}>
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    {chips && chips.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {chips.map((chip) => (
                                <span key={chip} className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    ) : row.boolean ? (
                        value === "Yes" ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} /> Yes
                            </span>
                        ) : value === "No" ? (
                            <span className="inline-flex items-center gap-1 text-slate-400">
                                <Minus className="w-3.5 h-3.5" /> No
                            </span>
                        ) : (
                            <span className="text-slate-300">Not published</span>
                        )
                    ) : value ? (
                        <span className={`capitalize ${isWinner ? "font-bold text-emerald-700" : "text-slate-700"}`}>{value}</span>
                    ) : (
                        <span className="text-slate-300">Not published</span>
                    )}
                </div>
                {isWinner && <Trophy className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-label="Best on this row" />}
            </div>
        </td>
    );
}
