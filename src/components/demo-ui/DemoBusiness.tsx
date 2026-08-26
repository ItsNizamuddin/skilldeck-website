import DemoSectionHeader from "./DemoSectionHeader";
import DemoPointGrid from "./DemoPointGrid";
import DemoStatGrid from "./DemoStatGrid";
import { DemoBusiness as DemoBusinessData } from "./types";

interface DemoBusinessProps {
    data?: DemoBusinessData;
}

export default function DemoBusiness({ data }: DemoBusinessProps) {
    if (!data || (!data.title && !(data.points || []).length)) return null;

    return (
        <div id="expertise" className="scroll-mt-24 space-y-6">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                    <DemoPointGrid points={data.points} columns={2} variant="card" />
                </div>
                {(data.stats || []).length > 0 && (
                    <div className="lg:col-span-4 space-y-3">
                        <DemoStatGrid stats={data.stats} variant="list" />
                    </div>
                )}
            </div>
        </div>
    );
}
