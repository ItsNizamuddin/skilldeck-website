import Image from "next/image";
import { Lock } from "lucide-react";
import type { WebsiteTemplate } from "@/lib/templates";

interface TemplatesHeroCollageProps {
    /** First card sits in front; the next two fan out behind it. */
    templates: WebsiteTemplate[];
}

function MiniFrame({
    template,
    priority = false,
}: {
    template: WebsiteTemplate;
    priority?: boolean;
}) {
    return (
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 border-b border-slate-100">
                <span className="flex gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="flex items-center gap-1 flex-1 min-w-0 px-1.5 py-0.5 rounded bg-white border border-slate-100">
                    <Lock className="w-2 h-2 text-emerald-500 shrink-0" />
                    <span className="text-[8px] text-brand-muted truncate">{template.displayUrl}</span>
                </span>
            </div>
            <div className="relative w-full aspect-[1440/682] bg-slate-50">
                {template.preview && (
                    <Image
                        src={template.preview}
                        alt={`${template.name} template`}
                        fill
                        priority={priority}
                        sizes="(max-width: 1024px) 60vw, 30vw"
                        className="object-cover object-top"
                    />
                )}
            </div>
        </div>
    );
}

/**
 * Fanned stack of real template screenshots. The hero used to be a wall of
 * centred text; the catalogue is the product, so it leads with the work.
 */
export default function TemplatesHeroCollage({ templates }: TemplatesHeroCollageProps) {
    const [front, second, third] = templates;
    if (!front) return null;

    return (
        <div className="relative mx-auto w-full max-w-xl pb-12 lg:pb-16">
            {/* Back cards, hidden on the smallest screens where they only add noise */}
            {third && (
                <div className="hidden sm:block absolute -top-6 right-0 w-[52%] rotate-[4deg] opacity-90">
                    <MiniFrame template={third} />
                </div>
            )}

            <div className="relative z-10 w-[88%] sm:w-[82%] -rotate-[2deg]">
                <MiniFrame template={front} priority />
            </div>

            {second && (
                <div className="hidden sm:block absolute -bottom-2 right-2 z-20 w-[56%] rotate-[3deg]">
                    <MiniFrame template={second} />
                </div>
            )}
        </div>
    );
}
