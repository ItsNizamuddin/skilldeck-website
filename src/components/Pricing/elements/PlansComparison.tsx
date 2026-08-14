import React, { useMemo } from 'react';
import PricingCard from './PricingCard';
import { BillingInterval, groupDisplayFeatures, groupFeatures } from './utils';
import { PricingPlan } from '@/lib/plans';

type Props = {
    plans: PricingPlan[];
    loading?: boolean;
    billingInterval?: BillingInterval;
    onOpenPurchase?: (planId: string) => void;
};

const PlansComparison: React.FC<Props> = ({
    plans,
    loading,
    billingInterval = 'MONTHLY',
    onOpenPurchase,
}) => {
    const groups = useMemo(() => groupFeatures(plans || []), [plans]);
    const displayGroups = useMemo(() => groupDisplayFeatures(plans || []), [plans]);



    if (!plans || plans.length === 0) {
        return (
            <div className="py-12 px-6 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-base">
                No plans available.
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 p-4 lg:pt-5 items-stretch max-w-[1600px] mx-auto">
            {plans.map((plan: any, index: number) => (
                <div
                    key={plan.id || plan._id || `plan-${index}`}
                    className="w-full md:w-[calc(50%-12px)] xl:w-[calc(25%-18px)] flex flex-col"
                >
                    <PricingCard
                        plan={plan}
                        groups={groups}
                        displayGroups={displayGroups}
                        billingInterval={billingInterval}
                        onPurchase={onOpenPurchase}
                        loading={loading}
                    />
                </div>
            ))}
        </div>
    );
};

export default PlansComparison;
