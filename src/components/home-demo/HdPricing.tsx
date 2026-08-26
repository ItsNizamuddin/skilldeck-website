import PricingSection from "@/components/Pricing/PricingSection";
import type { PricingPlan } from "@/lib/plans";

interface HdPricingProps {
    plans: PricingPlan[];
}

export default function HdPricing({ plans }: HdPricingProps) {
    return (
        <section id="pricing" className="scroll-mt-24 py-16 md:py-24 bg-white">
            <PricingSection plans={plans} />
        </section>
    );
}
