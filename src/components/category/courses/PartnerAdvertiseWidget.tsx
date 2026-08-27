"use client";

import { GraduationCap, Megaphone, Sparkles, X } from "lucide-react";

interface PartnerAdvertiseWidgetProps {
    showAd: boolean;
    onClose: () => void;
}

export default function PartnerAdvertiseWidget({ showAd, onClose }: PartnerAdvertiseWidgetProps) {
    if (!showAd) return null;

    return (
        <div className="fixed right-0 top-24 z-50 w-[240px] bg-[#0D0B1E] text-white rounded-xl p-3 border border-white/10 border-r-0 shadow-2xl flex flex-col gap-2 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                        Partner & Advertise
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close advertisement"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Ad Item 1 — Feature Your Ad */}
            <div
                className="border border-purple-900/40 rounded-2xl p-2.5 flex flex-col gap-2 relative overflow-hidden min-h-[100px]"
                style={{
                    backgroundImage: `url('/heroSection/feature-your-ad.webp'), linear-gradient(135deg, #1a1245 0%, #110d35 100%)`,
                    backgroundSize: '90px, cover',
                    backgroundPosition: 'right 8px center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                {/* Small icon badge */}
                <div className="w-7 h-7 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-400">
                    <Megaphone className="w-3.5 h-3.5" />
                </div>
                <div>
                    <h5 className="text-xs font-bold text-white leading-snug">Feature Your Ad</h5>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed w-[130px]">
                        Reach 50K+ active learners looking for top tech tracks.
                    </p>
                </div>
                <a
                    href="/contact-us"
                    className="w-fit bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-4 rounded-lg text-[10px] flex items-center gap-1.5 transition-colors z-10"
                >
                    <span>Promote Ad</span>
                    <span>&rarr;</span>
                </a>
            </div>

            {/* Ad Item 2 — List Your Course */}
            <div
                className="border border-blue-900/40 rounded-2xl p-2.5 flex flex-col gap-2 relative overflow-hidden min-h-[100px]"
                style={{
                    backgroundImage: `url('/heroSection/list-your-course.webp'), linear-gradient(135deg, #0d1e3a 0%, #091529 100%)`,
                    backgroundSize: '90px, cover',
                    backgroundPosition: 'right 8px center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                {/* Small icon badge */}
                <div className="w-7 h-7 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div>
                    <h5 className="text-xs font-bold text-white leading-snug">List Your Course</h5>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed w-[140px]">
                        Get your institute &amp; programmes verified on SkillDeck.
                    </p>
                </div>
                <a
                    href="/register"
                    className="w-fit border border-blue-500/50 text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-1.5 px-4 rounded-lg text-[10px] flex items-center gap-1.5 transition-all z-10"
                >
                    <span>List Institute</span>
                    <span>&rarr;</span>
                </a>
            </div>
        </div>
    );
}
