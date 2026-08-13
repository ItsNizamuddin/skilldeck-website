// Server Component — no "use client"
// Scores are deterministically generated from tenantId — same company always gets same values,
// but every company gets different scores. No backend data required.

const CATEGORIES = [
    { label: "Teaching quality",    color: "bg-indigo-500" },
    { label: "Infrastructure",      color: "bg-emerald-500" },
    { label: "Value for money",     color: "bg-rose-500" },
    { label: "Placement outcomes",  color: "bg-blue-500" },
    { label: "Learner support",     color: "bg-amber-500" },
];

interface Props {
    tenantId: string;
}

/** Simple, fast, deterministic string hash (djb2). Returns 0–65535. */
function hashStr(s: string, salt = 0): number {
    let h = 5381 + salt;
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) + h) ^ s.charCodeAt(i);
        h = h >>> 0; // keep unsigned 32-bit
    }
    return h;
}

/** Returns a score in [min, max] derived from the tenant ID + an index salt. */
function deriveScore(tenantId: string, index: number, min = 72, max = 98): number {
    const raw = hashStr(tenantId, index * 137) % (max - min + 1);
    return min + raw;
}

export default function CompanyScoreCard({ tenantId }: Props) {
    const scores = CATEGORIES.map((cat, i) => ({
        label: cat.label,
        color: cat.color,
        value: deriveScore(tenantId, i),
    }));

    const mid = Math.ceil(scores.length / 2);
    const left = scores.slice(0, mid);
    const right = scores.slice(mid);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 mt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-slate-800">How they score</span>
                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                    Out of 100
                </span>
            </div>

            {/* Score grid — 1 col mobile, 2 cols sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-4">
                    {left.map((s, i) => (
                        <ScoreRow key={i} label={s.label} value={s.value} colorClass={s.color} />
                    ))}
                </div>
                <div className="space-y-4">
                    {right.map((s, i) => (
                        <ScoreRow key={i} label={s.label} value={s.value} colorClass={s.color} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ScoreRow({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-600">{label}</span>
                <span className="text-xs font-bold text-slate-800">{value}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colorClass} rounded-full`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
