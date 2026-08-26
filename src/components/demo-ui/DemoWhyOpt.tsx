import DemoSectionHeader from "./DemoSectionHeader";
import DemoPointGrid from "./DemoPointGrid";
import DemoStatGrid from "./DemoStatGrid";
import { DemoWhyOpt as DemoWhyOptData } from "./types";

interface DemoWhyOptProps {
    data?: DemoWhyOptData;
}

export default function DemoWhyOpt({ data }: DemoWhyOptProps) {
    if (!data || (!data.title && !(data.points || []).length)) return null;

    return (
        <div id="why-opt" className="scroll-mt-24 space-y-6">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />
            <DemoPointGrid points={data.points} columns={2} variant="row" />
            {(data.stats || []).length > 0 && (
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                    <DemoStatGrid stats={data.stats} columns={4} variant="inline" />
                </div>
            )}
        </div>
    );
}
