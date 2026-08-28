/**
 * Placeholders that mirror the real layout of the training-partners section, so
 * the area holds its space instead of collapsing and then popping in.
 */

const shimmer = "animate-pulse bg-slate-100";

export function PartnerCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="hidden md:grid md:grid-cols-4 gap-6" aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white border border-slate-100 rounded-3xl p-5 max-w-[320px] w-full mx-auto space-y-4"
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className={`w-24 h-10 rounded-lg ${shimmer}`} />
                        <div className={`h-3.5 w-32 rounded ${shimmer}`} />
                        <div className="flex gap-1.5">
                            <div className={`h-4 w-16 rounded-md ${shimmer}`} />
                            <div className={`h-4 w-12 rounded-md ${shimmer}`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3.5 border-t border-slate-100">
                        <div className="space-y-1.5 border-r border-slate-100 pr-2">
                            <div className={`h-2 w-14 rounded mx-auto ${shimmer}`} />
                            <div className={`h-3 w-16 rounded mx-auto ${shimmer}`} />
                        </div>
                        <div className="space-y-1.5 pl-2">
                            <div className={`h-2 w-14 rounded mx-auto ${shimmer}`} />
                            <div className={`h-3 w-16 rounded mx-auto ${shimmer}`} />
                        </div>
                    </div>
                    <div className={`h-10 w-full rounded-xl ${shimmer}`} />
                </div>
            ))}
        </div>
    );
}

export function PartnerCardsSkeletonMobile() {
    return (
        <div className="block md:hidden" aria-hidden="true">
            <div className="bg-white border border-slate-100 rounded-3xl p-5 max-w-[320px] w-full mx-auto space-y-4">
                <div className="flex flex-col items-center gap-3">
                    <div className={`w-24 h-10 rounded-lg ${shimmer}`} />
                    <div className={`h-3.5 w-32 rounded ${shimmer}`} />
                </div>
                <div className={`h-10 w-full rounded-xl ${shimmer}`} />
            </div>
        </div>
    );
}

export function ComparisonTableSkeleton({ columns = 3, rows = 5 }: { columns?: number; rows?: number }) {
    return (
        <div className="space-y-4" aria-hidden="true">
            <div className="flex items-end justify-between gap-3">
                <div className="space-y-2">
                    <div className={`h-4 w-52 rounded ${shimmer}`} />
                    <div className={`h-3 w-72 rounded ${shimmer}`} />
                </div>
                <div className={`h-8 w-44 rounded-xl ${shimmer}`} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <div className="w-[130px] md:w-[190px] shrink-0 px-4 py-3 bg-slate-50">
                        <div className={`h-3 w-20 rounded ${shimmer}`} />
                    </div>
                    {Array.from({ length: columns }).map((_, i) => (
                        <div key={i} className="flex-1 min-w-[150px] px-4 py-3 border-l border-slate-100 flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg shrink-0 ${shimmer}`} />
                            <div className={`h-3 flex-1 rounded ${shimmer}`} />
                        </div>
                    ))}
                </div>

                {Array.from({ length: rows }).map((_, r) => (
                    <div key={r} className="flex border-b border-slate-100 last:border-b-0">
                        <div className="w-[130px] md:w-[190px] shrink-0 px-4 py-4 bg-slate-50">
                            <div className={`h-3 w-24 rounded ${shimmer}`} />
                        </div>
                        {Array.from({ length: columns }).map((_, c) => (
                            <div key={c} className="flex-1 min-w-[150px] px-4 py-4 border-l border-slate-100">
                                <div className={`h-3 w-20 rounded mx-auto ${shimmer}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SchedulesSkeleton({ count = 2 }: { count?: number }) {
    return (
        <div className="space-y-4" aria-hidden="true">
            <div className="space-y-2">
                <div className={`h-4 w-56 rounded ${shimmer}`} />
                <div className={`h-3 w-80 rounded ${shimmer}`} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl shrink-0 ${shimmer}`} />
                            <div className="flex-1 space-y-2">
                                <div className={`h-3.5 w-2/3 rounded ${shimmer}`} />
                                <div className={`h-2.5 w-1/3 rounded ${shimmer}`} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className={`h-14 rounded-xl ${shimmer}`} />
                            <div className={`h-14 rounded-xl ${shimmer}`} />
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div className={`h-5 w-24 rounded ${shimmer}`} />
                            <div className={`h-9 w-32 rounded-xl ${shimmer}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
