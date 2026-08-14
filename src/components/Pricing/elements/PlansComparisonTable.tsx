 import React from 'react';
// import { IPlan } from './types';
import { BillingInterval } from './utils';
import PlansComparisonTableMobile from './PlansComparisonTableMobile';
import PlansComparisonTableDesktop from './PlansComparisonTableDesktop';
import { PricingPlan } from '@/lib/plans';

type Props = {
    plans: PricingPlan[];
    loading?: boolean;
    billingInterval?: BillingInterval;
    onOpenPurchase?: (planId: string) => void;
};

const PlansComparisonTable: React.FC<Props> = ({
    plans,
    loading,
    billingInterval = 'MONTHLY',
    onOpenPurchase,
}) => {


    if (!plans || plans.length === 0) {
        return (
            <div className="py-12 px-6 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 text-base">
                No plans available.
            </div>
        );
    }

    return (
        <div className="w-full mx-auto max-w-[1536px]">
            <PlansComparisonTableMobile
                plans={plans}
                billingInterval={billingInterval}
                onOpenPurchase={onOpenPurchase}
                loading={loading}
            />
            <PlansComparisonTableDesktop
                plans={plans}
                billingInterval={billingInterval}
                onOpenPurchase={onOpenPurchase}
                loading={loading}
            />
        </div>
    );
};

export default PlansComparisonTable;