import { Send } from 'lucide-react';
import Link from 'next/link';

const BlogSticky = () => {
    return (
        <div className="relative overflow-hidden space-y-2 p-4 md:p-5 rounded-[20px] border border-slate-100 shadow-[0_10px_25px_rgba(92,63,250,0.03)] bg-white lg:sticky top-40">
            {/* Top Brand Gradient Strip */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]" />

            <div className="text-center pt-1">
                <h2 className="text-sm md:text-base font-extrabold  leading-snug">
                    Run Your Training Business at 90% Lower Cost
                </h2>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
                <p className="text-[11px] leading-relaxed text-slate-400 font-semibold text-center">
                    Skilldeck replaces 10+ software tools with one integrated, automated platform.
                </p>

                {/* 2-Column Grid for Checklist items */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 pt-3 border-t border-slate-50">
                    {[
                        "CMS Portal",
                        "CRM Engine",
                        "Websites",
                        "LMS Software",
                        "Marketplace",
                        "Automation",
                        "Webinars",
                        "Scheduling"
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-1.5 text-[10.5px] text-slate-700 font-bold">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100/50">
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="truncate">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-2">
                <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] hover:shadow-lg hover:shadow-indigo-500/20 text-white font-extrabold text-[11px] py-2.5 px-3 rounded-xl transition-all duration-300"
                >
                    <Send className="w-3 h-3" />
                    Try it free
                </Link>
            </div>
        </div>
    );
};

export default BlogSticky;
