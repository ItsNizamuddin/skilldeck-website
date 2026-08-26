import DemoSectionHeader from "./DemoSectionHeader";
import DemoStatGrid from "./DemoStatGrid";
import { DemoIconValue } from "./types";

interface DemoStatsSectionProps {
    stats?: DemoIconValue[];
}

export default function DemoStatsSection({ stats }: DemoStatsSectionProps) {
    if (!stats || stats.filter((s) => s?.value).length === 0) return null;

    return (
        <section id="stats" className="py-8 md:py-12 bg-white border-b border-slate-100 scroll-mt-24">
            <div className="container mx-auto px-2 lg:px-0 space-y-6">
                <DemoSectionHeader
                    tagline="Proven Track Record"
                    title="Results at a Glance"
                    align="left"
                />
                <DemoStatGrid stats={stats} columns={4} variant="card" />
            </div>
        </section>
    );
}
