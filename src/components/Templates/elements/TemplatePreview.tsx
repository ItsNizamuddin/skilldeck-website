import Image from "next/image";
import { Lock } from "lucide-react";
import type { WebsiteTemplate } from "@/lib/templates";

interface TemplatePreviewProps {
    template: WebsiteTemplate;
    priority?: boolean;
}

/**
 * Screenshots are captured at 1440x682, so the frame carries that ratio rather
 * than a fixed height — a fixed height cropped the hero of every shot.
 */
const FRAME_ASPECT = "aspect-[1440/682]";

/**
 * Browser-chrome frame around a template screenshot.
 *
 * Templates without a screenshot in `public/templates/` fall back to a branded
 * gradient plate, so an entry can be listed the day it is sold instead of
 * waiting on assets.
 */
export default function TemplatePreview({ template, priority = false }: TemplatePreviewProps) {
    return (
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            {/* Fake address bar — carries the real hostname so the card doubles as proof */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100">
                <span className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="flex items-center gap-1.5 flex-1 min-w-0 px-2.5 py-1 rounded-md bg-white border border-slate-100">
                    <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="text-[10px] 2xl:text-xs text-brand-muted truncate">
                        {template.displayUrl}
                    </span>
                </span>
            </div>

            <div className={`relative w-full ${FRAME_ASPECT} overflow-hidden bg-slate-50`}>
                {template.preview ? (
                    <Image
                        src={template.preview}
                        alt={`${template.name} template preview`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className={`absolute inset-0 bg-linear-to-br ${template.accent} flex flex-col items-center justify-center gap-2 p-6 text-center`}
                    >
                        <span className="text-white/90 text-2xl md:text-3xl font-extrabold tracking-tight">
                            {template.name}
                        </span>
                        <span className="text-white/70 text-[11px] 2xl:text-xs uppercase tracking-widest font-semibold">
                            {template.category}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
