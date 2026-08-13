"use client";

import { Check, Sparkles } from "lucide-react";

interface KeyFeaturesProps {
    features?: string[];
}

export default function KeyFeatures({ features }: KeyFeaturesProps) {
    if (!features || features.length === 0) return null;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles className="w-4 h-4 fill-purple-600/25" />
                </div>
                <h3 className="body-large  font-bold text-[#101A3D] tracking-tight">
                    Key features of the programme
                </h3>
            </div>

            {/* Two column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <div className="mt-0.5 w-5 h-5 rounded-full border border-purple-300 flex items-center justify-center text-purple-600 bg-white shrink-0">
                            <Check className="w-3 h-3" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] 2xl:text-sm font-bold text-gray-700 leading-normal">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
