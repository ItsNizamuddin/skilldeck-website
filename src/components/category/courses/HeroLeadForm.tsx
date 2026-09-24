"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BadgeCheck, CalendarDays, ChevronDown } from "lucide-react";
import CompanyForm from "@/components/Forms/CompanyForm";
import { formatDate } from "@/lib/courseCardHelpers";
import type { PlatformSchedule } from "@/types/hero";
import NoScheduleEnquiry from "./NoScheduleEnquiry";

/** The tenant fields this form needs; the context hands over a looser shape. */
interface TenantLike {
    id?: string;
    _id?: string;
    name?: string;
    legalName?: string;
    companyName?: string;
    logo?: string;
}

interface HeroLeadFormProps {
    courseSlug: string;
    courseTitle?: string;
    schedules: PlatformSchedule[];
    tenants: TenantLike[];
    loading?: boolean;
}

interface Provider {
    tenantId: string;
    name: string;
    logo?: string;
    /** The schedule the lead is filed against — the one starting soonest. */
    schedule: PlatformSchedule;
}

/** `_id` arrives either as a string or as a Mongo `{ $oid }` wrapper. */
function scheduleIdOf(schedule: PlatformSchedule): string | undefined {
    const raw = schedule._id;
    if (typeof raw === "string") return raw;
    if (raw && typeof raw === "object" && "$oid" in raw) return raw.$oid;
    return schedule.id;
}

function startTime(schedule: PlatformSchedule): number {
    const t = schedule.startsAt ? new Date(schedule.startsAt).getTime() : NaN;
    return Number.isNaN(t) ? Number.MAX_SAFE_INTEGER : t;
}

/**
 * Lead form for the course hero.
 *
 * One provider → it is selected for the visitor. Several → they pick which
 * institute the enquiry goes to, because each lead lands in that tenant's CRM.
 * None → there is no tenant to route to, so the generic enquiry form runs
 * instead.
 */
export default function HeroLeadForm({
    courseSlug,
    courseTitle,
    schedules,
    tenants,
    loading = false,
}: HeroLeadFormProps) {
    const [chosenTenantId, setChosenTenantId] = useState<string | null>(null);

    const providers = useMemo<Provider[]>(() => {
        const byTenant = new Map<string, Provider>();

        for (const schedule of schedules ?? []) {
            const tenantId = schedule.tenantId || schedule.tenant?.id;
            if (!tenantId) continue;

            const tenant = (tenants ?? []).find(
                (t) => t?.id === tenantId || t?._id === tenantId
            );

            const name =
                tenant?.legalName ||
                tenant?.name ||
                tenant?.companyName ||
                schedule.tenant?.name ||
                "Training provider";

            const existing = byTenant.get(tenantId);
            // Keep the batch starting soonest — that is the one a visitor asks about.
            if (!existing || startTime(schedule) < startTime(existing.schedule)) {
                byTenant.set(tenantId, {
                    tenantId,
                    name,
                    logo: tenant?.logo || schedule.tenant?.logo,
                    schedule,
                });
            }
        }

        return Array.from(byTenant.values()).sort(
            (a, b) => startTime(a.schedule) - startTime(b.schedule)
        );
    }, [schedules, tenants]);

    if (loading) {
        return <div className="w-full h-[480px] rounded-2xl bg-slate-50 animate-pulse" />;
    }

    // No tenant to route the lead to — fall back to the platform enquiry form.
    if (providers.length === 0) {
        return (
            <NoScheduleEnquiry
                courseSlug={courseSlug}
                courseTitle={courseTitle}
                className="border-0"
            />
        );
    }

    // Derived rather than stored, so a schedules refresh cannot leave the form
    // pointing at a provider that is no longer listed.
    const active =
        providers.find((p) => p.tenantId === chosenTenantId) ?? providers[0];
    const hasChoice = providers.length > 1;

    return (
        <div className="w-full bg-white rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <span className="inline-flex self-start items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                    Request a callback
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug mt-1">
                    {hasChoice
                        ? "Choose an institute and we will connect you"
                        : `Talk to ${active.name}`}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                    Your details go straight to the institute running this batch. They come back
                    with fees, schedule and seat availability.
                </p>
            </div>

            {hasChoice ? (
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="hero-provider"
                        className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide"
                    >
                        Training provider
                    </label>
                    <div className="relative">
                        <select
                            id="hero-provider"
                            value={active.tenantId}
                            onChange={(e) => setChosenTenantId(e.target.value)}
                            className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs 2xl:text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary cursor-pointer"
                        >
                            {providers.map((provider) => (
                                <option key={provider.tenantId} value={provider.tenantId}>
                                    {provider.name}
                                    {provider.schedule.startsAt
                                        ? ` — starts ${formatDate(provider.schedule.startsAt)}`
                                        : ""}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    {active.logo ? (
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0">
                            <Image
                                src={active.logo}
                                alt={`${active.name} logo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <span className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                            <BadgeCheck className="w-5 h-5 text-brand-primary" />
                        </span>
                    )}
                    <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">{active.name}</div>
                        {active.schedule.startsAt && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <CalendarDays className="w-3 h-3" />
                                Next batch {formatDate(active.schedule.startsAt)}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Remount on provider change so half-typed state never files against
                the wrong tenant. */}
            <CompanyForm
                key={active.tenantId}
                tenantId={active.tenantId}
                scheduleId={scheduleIdOf(active.schedule)}
                courseId={courseSlug}
                courseTitle={courseTitle}
                submitText="Request a callback"
                layout="compact"
            />
        </div>
    );
}
