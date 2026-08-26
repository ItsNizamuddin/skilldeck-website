import DemoSectionHeader from "./DemoSectionHeader";
import DemoPointGrid from "./DemoPointGrid";
import { DemoBenefits as DemoBenefitsData } from "./types";

interface DemoBenefitsProps {
    data?: DemoBenefitsData;
}

export default function DemoBenefits({ data }: DemoBenefitsProps) {
    if (!data || (!data.title && !(data.points || []).length)) return null;

    return (
        <div id="benefits" className="scroll-mt-24 space-y-6">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />
            <DemoPointGrid points={data.points} columns={3} variant="tile" />
        </div>
    );
}
