/** Mirrors the compare page layout so the shell does not shift once data lands. */

const shimmer = "animate-pulse bg-slate-100";

export default function CompareSkeleton({ columns = 3 }: { columns?: number }) {
    return (
        <div className="container mx-auto px-4 lg:px-0 py-8 md:py-12 space-y-6" aria-hidden="true">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
                <div className={`h-3 w-12 rounded ${shimmer}`} />
                <div className={`h-3 w-16 rounded ${shimmer}`} />
                <div className={`h-3 w-16 rounded ${shimmer}`} />
            </div>

            {/* Hero */}
            <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(120deg,#faf9ff_0%,#ffffff_60%)] px-6 py-8 md:px-10 md:py-10 space-y-4">
                <div className={`h-6 w-40 rounded-full ${shimmer}`} />
                <div className={`h-9 w-2/3 max-w-md rounded ${shimmer}`} />
                <div className="space-y-2 max-w-2xl">
                    <div className={`h-3.5 w-full rounded ${shimmer}`} />
                    <div className={`h-3.5 w-4/5 rounded ${shimmer}`} />
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <div className={`h-9 w-56 rounded-xl ${shimmer}`} />
                    <div className={`h-9 w-48 rounded-xl ${shimmer}`} />
                    <div className={`h-9 w-32 rounded-xl ${shimmer}`} />
                </div>
                <div className={`h-4 w-32 rounded ${shimmer}`} />
            </div>

            {/* Option cards */}
            <div className="flex gap-4 overflow-hidden">
                <div className="w-[150px] md:w-[190px] shrink-0 space-y-2 self-center">
                    <div className={`h-2.5 w-28 rounded ${shimmer}`} />
                    <div className={`h-4 w-16 rounded ${shimmer}`} />
                </div>
                {Array.from({ length: columns }).map((_, i) => (
                    <div key={i} className="w-[230px] md:w-[260px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded shrink-0 ${shimmer}`} />
                            <div className="flex-1 space-y-1.5">
                                <div className={`h-2.5 w-24 rounded ${shimmer}`} />
                                <div className={`h-2 w-14 rounded ${shimmer}`} />
                            </div>
                        </div>
                        <div className={`h-4 w-3/4 rounded ${shimmer}`} />
                        <div className={`h-4 w-20 rounded ${shimmer}`} />
                    </div>
                ))}
            </div>

            {/* Award strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`h-28 rounded-2xl ${shimmer}`} />
                ))}
            </div>

            {/* Row groups */}
            {Array.from({ length: 2 }).map((_, g) => (
                <div key={g} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <div className={`h-3 w-32 rounded ${shimmer}`} />
                        <div className={`h-3 w-14 rounded ${shimmer}`} />
                    </div>
                    {Array.from({ length: 4 }).map((_, r) => (
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
            ))}
        </div>
    );
}
