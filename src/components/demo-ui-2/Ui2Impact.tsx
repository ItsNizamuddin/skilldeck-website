import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { DemoIconValue } from "@/components/demo-ui/types";

interface Ui2ImpactProps {
    stats?: DemoIconValue[];
}

/** "At a glance" number band — sits between hero and the first narrative chapter, unnumbered by design. */
export default function Ui2Impact({ stats }: Ui2ImpactProps) {
    const items = (stats || []).filter((s) => s?.value);
    if (items.length === 0) return null;

    return (
        <section className="py-14 md:py-16 border-b border-slate-100">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
                    {items.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-2 px-4 py-6">
                            <ServiceItemIcon iconString={stat.icon} className="w-5 h-5 text-brand-secondary" defaultIcon="Sparkles" />
                            <p className="text-3xl lg:text-4xl font-black text-brand-dark leading-none">{stat.value}</p>
                            <p className="text-xs font-bold text-brand-muted">{stat.description}</p>
                            {stat.tagline && <p className="text-[11px] text-brand-muted/70 leading-snug max-w-[160px]">{stat.tagline}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
