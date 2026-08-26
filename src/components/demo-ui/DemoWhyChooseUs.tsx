import DemoSectionHeader from "./DemoSectionHeader";
import DemoPointGrid from "./DemoPointGrid";
import { DemoWhyService } from "./types";

interface DemoWhyChooseUsProps {
    data?: DemoWhyService;
}

export default function DemoWhyChooseUs({ data }: DemoWhyChooseUsProps) {
    if (!data || (!data.title && !(data.points || []).length)) return null;

    return (
        <div id="why" className="scroll-mt-24 space-y-6">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />
            <DemoPointGrid points={data.points} columns={3} variant="card" />
        </div>
    );
}
