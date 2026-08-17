import Link from 'next/link';

interface PatternListProps {
    patterns: {
        title: string;
        slug: string;
    }[];
    currentSlug: string;
    courseTitle?: string;
}

export default function PatternSidebar({ patterns, currentSlug, courseTitle }: PatternListProps) {
    return (
        <div className="sticky top-24 space-y-5 w-full lg:w-80">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 p-5 md:p-6">
                <h3 className="text-sm md:text-base font-bold text-slate-800 mb-4 px-2.5 border-l-4 border-brand-primary leading-tight">
                    {courseTitle ? `More about ${courseTitle}` : 'Related Topics'}
                </h3>

                <nav className="space-y-1.5">
                    {patterns?.map((pattern) => {
                        const isActive = pattern.slug === currentSlug;
                        return (
                            <Link
                                key={pattern.slug}
                                href={`/info/${pattern.slug}`}
                                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                                    ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/10 shadow-[0_4px_12px_rgba(92,63,250,0.06)]'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                                    }`}
                            >
                                <span className="truncate">{pattern.title}</span>
                                <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${isActive
                                        ? 'bg-brand-primary scale-110'
                                        : 'bg-slate-300 group-hover:bg-brand-primary'
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
