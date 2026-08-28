import { CompareColumn, humanDate, money } from "./compareModel";

export type Better = "higher" | "lower" | "true" | "none";

export interface CompareRow {
    key: string;
    label: string;
    /** Small print under the label, as in the reference design. */
    hint?: string;
    /** Rendered value; return null when this column has no data for the row. */
    value: (c: CompareColumn) => string | null;
    /** Numeric basis for picking the winner. */
    score?: (c: CompareColumn) => number | null;
    better?: Better;
    /** Renders as a tick / dash pair rather than text. */
    boolean?: boolean;
    /** Renders as chips. */
    chips?: (c: CompareColumn) => string[];
}

export interface CompareGroup {
    key: string;
    title: string;
    accent: string;
    rows: CompareRow[];
}

const nz = (n: number) => (n > 0 ? n : null);

export const COMPARE_GROUPS: CompareGroup[] = [
    {
        key: "basics",
        title: "The basics",
        accent: "bg-violet-50 text-violet-700 border-violet-100",
        rows: [
            { key: "company", label: "Training company", value: (c) => c.companyName || null },
            { key: "category", label: "Category", value: (c) => (c.category ? c.category.replace(/-/g, " ") : null) },
            { key: "skill", label: "Skill level", value: (c) => c.skillLevel || null },
            { key: "mode", label: "Learning mode", value: (c) => c.learningMode || null },
            { key: "batch", label: "Batch type", value: (c) => c.batchType || null },
            { key: "focus", label: "Programme focus", value: (c) => c.scheduleType || null },
            {
                key: "duration",
                label: "Duration",
                value: (c) => (c.weeks > 0 ? `${c.weeks} week${c.weeks === 1 ? "" : "s"}` : null),
                score: (c) => nz(c.weeks),
                better: "lower",
            },
            {
                key: "sessions",
                label: "Sessions",
                value: (c) => (c.sessions > 0 ? `${c.sessions} sessions` : null),
                score: (c) => nz(c.sessions),
                better: "higher",
            },
            {
                key: "commitment",
                label: "Weekly commitment",
                hint: "Total instruction hours divided by weeks",
                value: (c) => (c.hoursPerWeek > 0 ? `${c.hoursPerWeek} hrs/week` : null),
                score: (c) => nz(c.hoursPerWeek),
                better: "lower",
            },
            {
                key: "cohort",
                label: "Next cohort",
                value: (c) => humanDate(c.nextCohort) || null,
                score: (c) => (c.nextCohort ? c.nextCohort.getTime() : null),
                better: "lower",
            },
            { key: "location", label: "Location", value: (c) => c.location || null },
            {
                key: "seats",
                label: "Seats available",
                value: (c) => (c.seatsAvailable > 0 ? `${c.seatsAvailable} left` : null),
                score: (c) => nz(c.seatsAvailable),
                better: "higher",
            },
        ],
    },
    {
        key: "fees",
        title: "Fees and commitments",
        accent: "bg-rose-50 text-rose-700 border-rose-100",
        rows: [
            {
                key: "fee",
                label: "Programme fee",
                value: (c) => (c.fee > 0 ? money(c.fee, c.symbol) : null),
                score: (c) => nz(c.fee),
                better: "lower",
            },
            {
                key: "listFee",
                label: "Original fee",
                value: (c) => (c.listFee > c.fee ? money(c.listFee, c.symbol) : null),
            },
            {
                key: "discount",
                label: "Discount",
                value: (c) => (c.discount > 0 ? `${c.discount}% off` : null),
                score: (c) => nz(c.discount),
                better: "higher",
            },
            {
                key: "costPerWeek",
                label: "Cost per week",
                hint: "Fee divided by weeks of instruction",
                value: (c) => (c.costPerWeek > 0 ? money(c.costPerWeek, c.symbol) : null),
                score: (c) => nz(c.costPerWeek),
                better: "lower",
            },
            {
                key: "costPerSession",
                label: "Cost per session",
                value: (c) => (c.costPerSession > 0 ? money(c.costPerSession, c.symbol) : null),
                score: (c) => nz(c.costPerSession),
                better: "lower",
            },
            {
                key: "jobGuarantee",
                label: "Job guarantee",
                boolean: true,
                value: (c) => (typeof c.jobGuarantee === "boolean" ? (c.jobGuarantee ? "Yes" : "No") : null),
                score: (c) => (typeof c.jobGuarantee === "boolean" ? (c.jobGuarantee ? 1 : 0) : null),
                better: "true",
            },
            {
                key: "placement",
                label: "Placement assistance",
                boolean: true,
                value: (c) => (typeof c.placementAssistance === "boolean" ? (c.placementAssistance ? "Yes" : "No") : null),
                score: (c) => (typeof c.placementAssistance === "boolean" ? (c.placementAssistance ? 1 : 0) : null),
                better: "true",
            },
        ],
    },
    {
        key: "curriculum",
        title: "Curriculum and delivery",
        accent: "bg-sky-50 text-sky-700 border-sky-100",
        rows: [
            {
                key: "modules",
                label: "Modules",
                value: (c) => (c.modules.length > 0 ? `${c.modules.length} modules` : null),
                score: (c) => nz(c.modules.length),
                better: "higher",
            },
            { key: "moduleList", label: "Module breakdown", chips: (c) => c.modules, value: (c) => (c.modules.length ? "" : null) },
            {
                key: "projects",
                label: "Graded projects",
                value: (c) => (c.projects.length > 0 ? String(c.projects.length) : null),
                score: (c) => nz(c.projects.length),
                better: "higher",
            },
            { key: "projectList", label: "Project work", chips: (c) => c.projects, value: (c) => (c.projects.length ? "" : null) },
            {
                key: "sessionLength",
                label: "Session length",
                value: (c) => (c.minutesPerSession > 0 ? `${c.minutesPerSession} mins` : null),
            },
            {
                key: "flexible",
                label: "Flexible schedule",
                boolean: true,
                value: (c) => (c.flexible ? "Yes" : "No"),
                score: (c) => (c.flexible ? 1 : 0),
                better: "true",
            },
        ],
    },
    {
        key: "provider",
        title: "Provider profile",
        accent: "bg-amber-50 text-amber-700 border-amber-100",
        rows: [
            {
                key: "scheduleCount",
                label: "Batches for this course",
                value: (c) => (c.kind === "company" ? `${c.scheduleCount} scheduled` : null),
                score: (c) => (c.kind === "company" ? c.scheduleCount : null),
                better: "higher",
            },
            { key: "industry", label: "Specialisation", value: (c) => c.industry || null },
            {
                key: "established",
                label: "Established",
                value: (c) => c.established || null,
                score: (c) => (c.established ? Number(c.established) : null),
                better: "lower",
            },
            { key: "team", label: "Team size", value: (c) => c.teamSize || null },
            {
                key: "recommended",
                label: "Recommended",
                boolean: true,
                value: (c) => (c.recommended ? "Yes" : "No"),
                score: (c) => (c.recommended ? 1 : 0),
                better: "true",
            },
            {
                key: "fillingFast",
                label: "Filling fast",
                boolean: true,
                value: (c) => (c.fillingFast ? "Yes" : "No"),
            },
        ],
    },
];

/** Index of the winning column for a row, or -1 when there is no clear winner. */
export function winnerIndex(row: CompareRow, columns: CompareColumn[]): number {
    if (!row.better || row.better === "none" || !row.score) return -1;

    const scores = columns.map((c) => row.score!(c));
    const valid = scores.filter((s): s is number => s !== null);
    if (valid.length < 2) return -1;

    const target =
        row.better === "lower" ? Math.min(...valid) : Math.max(...valid);

    // A row where everyone ties tells the reader nothing.
    if (valid.every((s) => s === target)) return -1;
    if (row.better === "true" && target !== 1) return -1;

    return scores.findIndex((s) => s === target);
}

/** True when the columns do not all show the same value for this row. */
export function rowDiffers(row: CompareRow, columns: CompareColumn[]): boolean {
    const values = columns.map((c) => (row.chips ? (row.chips(c) || []).join("|") : row.value(c)));
    return new Set(values.map((v) => v ?? "")).size > 1;
}

export function rowHasData(row: CompareRow, columns: CompareColumn[]): boolean {
    return columns.some((c) => {
        if (row.chips) return (row.chips(c) || []).length > 0;
        const v = row.value(c);
        return v !== null && v !== "";
    });
}
