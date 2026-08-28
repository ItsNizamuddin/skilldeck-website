import { formatPrice, getCurrencySymbol } from "@/lib/courseCardHelpers";

/** A schedule as returned by /api/schedules, limited to the fields compare uses. */
export interface CompareSchedule {
    _id?: string;
    id?: string;
    code?: string;
    tenantId?: string;
    title?: string;
    marketplaceProduct?: { name?: string; slug?: string };
    product?: { name?: string; slug?: string; categorySlug?: string };
    company?: { name?: string; logo?: string; slug?: string; id?: string };
    deliveryType?: string;
    batchType?: string;
    scheduleType?: string;
    skillLevels?: string[];
    modules?: { title?: string }[];
    projects?: string[];
    jobAssistance?: boolean;
    jobGuaranteed?: boolean;
    totalSessions?: number | string;
    duration?: number | string;
    sessionsDates?: string[];
    startsAt?: string;
    endsAt?: string;
    commencementDate?: string;
    venu?: string;
    country?: { name?: string };
    seatsAvailable?: number;
    enableFastfilling?: boolean;
    enableRecommend?: boolean;
    isFlexibleSchedule?: boolean;
    isFeatured?: boolean;
    currency?: string;
    price?: number;
    pricing?: { comparedPrice?: number; actualPrice?: number; price?: number; currency?: { code?: string; symbol?: string } }[];
}

export interface CompareTenant {
    id?: string;
    name?: string;
    legalName?: string;
    slug?: string;
    logo?: string;
    industry?: string;
    companySize?: number | string;
    foundedYear?: number;
}

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function toDate(v?: string): Date | null {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * The backend occasionally double-encodes currency symbols (₹ arrives as "â‚¹"),
 * so fall back to a known-good symbol when the string is not printable.
 */
function safeSymbol(symbol: string | undefined, currency: string): string {
    if (!symbol || /[ÂÃâ]/.test(symbol)) return getCurrencySymbol(currency);
    return symbol;
}

/**
 * Weeks of instruction. `sessionsDates` is the reliable source; fall back to the
 * startsAt/endsAt span. Returns 0 when neither is present, which suppresses every
 * per-week figure rather than inventing one.
 */
export function weeksOfInstruction(s: CompareSchedule): number {
    const dates = (s.sessionsDates || []).map(toDate).filter((d): d is Date => Boolean(d)).sort((a, b) => a.getTime() - b.getTime());
    if (dates.length >= 2) {
        return Math.max(1, Math.round((dates[dates.length - 1].getTime() - dates[0].getTime()) / MS_PER_WEEK));
    }
    const start = toDate(s.startsAt) || toDate(s.commencementDate);
    const end = toDate(s.endsAt);
    if (start && end && end > start) {
        return Math.max(1, Math.round((end.getTime() - start.getTime()) / MS_PER_WEEK));
    }
    return 0;
}

export type CompareKind = "schedule" | "company";

export interface CompareColumn {
    key: string;
    kind: CompareKind;
    /** Number of schedules folded into this column (always 1 in schedule mode). */
    scheduleCount: number;
    schedule: CompareSchedule;
    tenant?: CompareTenant;

    programme: string;
    companyName: string;
    companyLogo?: string;
    companyHref: string;

    category?: string;
    skillLevel?: string;
    learningMode?: string;
    batchType?: string;
    scheduleType?: string;
    nextCohort?: Date | null;

    weeks: number;
    sessions: number;
    minutesPerSession: number;
    hoursPerWeek: number;

    symbol: string;
    fee: number;
    listFee: number;
    discount: number;
    costPerWeek: number;
    costPerSession: number;

    jobGuarantee?: boolean;
    placementAssistance?: boolean;

    modules: string[];
    projects: string[];

    location?: string;
    seatsAvailable: number;
    fillingFast: boolean;
    flexible: boolean;
    recommended: boolean;

    established?: string;
    teamSize?: string;
    industry?: string;
}

export function buildColumn(
    schedule: CompareSchedule,
    tenant: CompareTenant | undefined,
    activeCurrency: string
): CompareColumn {
    const priceObj =
        schedule.pricing?.find((p) => p.currency?.code?.toUpperCase() === activeCurrency.toUpperCase()) ||
        schedule.pricing?.[0];

    const fee = priceObj?.comparedPrice || priceObj?.price || schedule.price || 0;
    const listFee = priceObj?.actualPrice || 0;
    const symbol = safeSymbol(priceObj?.currency?.symbol, priceObj?.currency?.code || schedule.currency || activeCurrency);

    const weeks = weeksOfInstruction(schedule);
    const sessions = Number(schedule.totalSessions) || 0;
    const minutesPerSession = Number(schedule.duration) || 0;
    const totalHours = (sessions * minutesPerSession) / 60;

    const companySlug = tenant?.slug || schedule.company?.slug;
    const companyId = tenant?.id || schedule.company?.id || schedule.tenantId;

    return {
        key: schedule._id || schedule.id || schedule.code || Math.random().toString(36),
        kind: "schedule",
        scheduleCount: 1,
        schedule,
        tenant,

        programme: schedule.marketplaceProduct?.name || schedule.product?.name || schedule.title || "Programme",
        companyName: tenant?.legalName || tenant?.name || schedule.company?.name || "Training partner",
        companyLogo: tenant?.logo || schedule.company?.logo,
        companyHref: companySlug ? `/companies/${companySlug}?id=${companyId}` : `/companies/${companyId}`,

        category: schedule.product?.categorySlug,
        skillLevel: (schedule.skillLevels || []).filter(Boolean).join(", ") || undefined,
        learningMode: schedule.deliveryType,
        batchType: schedule.batchType,
        scheduleType: schedule.scheduleType || undefined,
        nextCohort: toDate(schedule.startsAt) || toDate(schedule.commencementDate),

        weeks,
        sessions,
        minutesPerSession,
        hoursPerWeek: weeks > 0 && totalHours > 0 ? Math.round((totalHours / weeks) * 10) / 10 : 0,

        symbol,
        fee,
        listFee,
        discount: listFee > fee && fee > 0 ? Math.round(((listFee - fee) / listFee) * 100) : 0,
        costPerWeek: weeks > 0 && fee > 0 ? Math.round(fee / weeks) : 0,
        costPerSession: sessions > 0 && fee > 0 ? Math.round(fee / sessions) : 0,

        jobGuarantee: typeof schedule.jobGuaranteed === "boolean" ? schedule.jobGuaranteed : undefined,
        placementAssistance: typeof schedule.jobAssistance === "boolean" ? schedule.jobAssistance : undefined,

        modules: (schedule.modules || []).map((m) => m?.title).filter((t): t is string => Boolean(t)),
        projects: (schedule.projects || []).filter(Boolean),

        location: schedule.venu || schedule.country?.name,
        seatsAvailable: Number(schedule.seatsAvailable) || 0,
        fillingFast: Boolean(schedule.enableFastfilling),
        flexible: Boolean(schedule.isFlexibleSchedule),
        recommended: Boolean(schedule.enableRecommend),

        established: tenant?.foundedYear ? String(tenant.foundedYear) : undefined,
        teamSize: tenant?.companySize
            ? typeof tenant.companySize === "number" ? `${tenant.companySize}+ team` : String(tenant.companySize)
            : undefined,
        industry: tenant?.industry,
    };
}

export function money(value: number, symbol: string): string {
    return formatPrice(value, symbol);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function humanDate(d?: Date | null): string {
    if (!d) return "";
    return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}


/**
 * Company mode: fold every schedule a provider runs for the course into a single
 * column. Fees take the cheapest schedule, content takes the richest, dates take
 * the soonest — the same "what would I actually get" question a learner asks.
 */
export function buildCompanyColumn(
    tenant: CompareTenant,
    schedules: CompareSchedule[],
    activeCurrency: string
): CompareColumn {
    const columns = schedules.map((s) => buildColumn(s, tenant, activeCurrency));

    const priced = columns.filter((c) => c.fee > 0);
    const cheapest = priced.length ? priced.reduce((a, b) => (b.fee < a.fee ? b : a)) : columns[0];
    const richest = columns.reduce(
        (a, b) => (b.sessions + b.modules.length * 2 > a.sessions + a.modules.length * 2 ? b : a),
        columns[0]
    );

    const dated = columns.filter((c) => c.nextCohort);
    const soonest = dated.length
        ? dated.reduce((a, b) => (b.nextCohort!.getTime() < a.nextCohort!.getTime() ? b : a))
        : undefined;

    const uniq = (values: (string | undefined)[]) =>
        Array.from(new Set(values.filter((v): v is string => Boolean(v && v.trim()))));

    const withWeeks = columns.filter((c) => c.weeks > 0);
    const weeks = withWeeks.length ? Math.max(...withWeeks.map((c) => c.weeks)) : 0;
    const hoursPerWeek = withWeeks.length ? Math.max(...withWeeks.map((c) => c.hoursPerWeek)) : 0;

    return {
        key: tenant.id || tenant.slug || richest?.key || Math.random().toString(36),
        kind: "company",
        scheduleCount: schedules.length,
        schedule: cheapest?.schedule || schedules[0],
        tenant,

        programme: tenant.legalName || tenant.name || "Training partner",
        companyName: tenant.legalName || tenant.name || "Training partner",
        companyLogo: tenant.logo,
        companyHref: tenant.slug ? `/companies/${tenant.slug}?id=${tenant.id}` : `/companies/${tenant.id}`,

        category: uniq(columns.map((c) => c.category)).join(", ") || undefined,
        skillLevel: uniq(columns.map((c) => c.skillLevel)).join(", ") || undefined,
        learningMode: uniq(columns.map((c) => c.learningMode)).join(" / ") || undefined,
        batchType: uniq(columns.map((c) => c.batchType)).join(" / ") || undefined,
        scheduleType: uniq(columns.map((c) => c.scheduleType)).join(", ") || undefined,
        nextCohort: soonest?.nextCohort ?? null,

        weeks,
        sessions: Math.max(0, ...columns.map((c) => c.sessions)),
        minutesPerSession: Math.max(0, ...columns.map((c) => c.minutesPerSession)),
        hoursPerWeek,

        symbol: cheapest?.symbol || getCurrencySymbol(activeCurrency),
        fee: cheapest?.fee || 0,
        listFee: cheapest?.listFee || 0,
        discount: cheapest?.discount || 0,
        costPerWeek: cheapest?.costPerWeek || 0,
        costPerSession: cheapest?.costPerSession || 0,

        jobGuarantee: columns.some((c) => c.jobGuarantee === true)
            ? true
            : columns.some((c) => c.jobGuarantee === false) ? false : undefined,
        placementAssistance: columns.some((c) => c.placementAssistance === true)
            ? true
            : columns.some((c) => c.placementAssistance === false) ? false : undefined,

        modules: Array.from(new Set(columns.flatMap((c) => c.modules))),
        projects: Array.from(new Set(columns.flatMap((c) => c.projects))),

        location: uniq(columns.map((c) => c.location))[0],
        seatsAvailable: Math.max(0, ...columns.map((c) => c.seatsAvailable)),
        fillingFast: columns.some((c) => c.fillingFast),
        flexible: columns.some((c) => c.flexible),
        recommended: columns.some((c) => c.recommended),

        established: tenant.foundedYear ? String(tenant.foundedYear) : undefined,
        teamSize: tenant.companySize
            ? typeof tenant.companySize === "number" ? `${tenant.companySize}+ team` : String(tenant.companySize)
            : undefined,
        industry: tenant.industry,
    };
}
