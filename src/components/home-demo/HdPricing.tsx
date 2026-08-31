import PricingSection from "@/components/Pricing/PricingSection";
import type { PricingPlan } from "@/lib/plans";

interface HdPricingProps {
    plans: PricingPlan[];
}

export default function HdPricing({ plans }: HdPricingProps) {
    return (
        // PricingSection already carries `section-y`; adding it here too doubled the
        // vertical padding at both ends.
        <section id="pricing" className="scroll-mt-24 bg-white">
            <PricingSection plans={plans} />
        </section>
    );
}
