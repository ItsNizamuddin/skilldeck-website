import React, { useState, useMemo } from 'react';
import { groupFeatures, formatPrice, BillingInterval, computePlanAmount, getPlanFeatureValue, formatOveragePrice, groupDisplayFeatures, displayFeatureStatus } from './utils';
import { IPlanLimits } from './types';
import { RenderValue } from './TableCommon';
import { IPlan } from '@/types/interface-lib';

type Props = {
    plans: IPlan[];
    billingInterval?: BillingInterval;
    onOpenPurchase?: (planId: string) => void;
    loading?: boolean;
};

const PlansComparisonTableMobile: React.FC<Props> = ({
    plans,
    billingInterval = 'MONTHLY',
    onOpenPurchase,
    loading,
}) => {
    const displayGroups = useMemo(() => groupDisplayFeatures(plans || []), [plans]);

    // Safely initialize with available indices
    const initialIndexes = [];
    if (plans && plans.length > 0) initialIndexes.push(0);
    if (plans && plans.length > 1) initialIndexes.push(1);

    const [activePlanIndexes, setActivePlanIndexes] = useState<number[]>(initialIndexes);

    const togglePlan = (index: number) => {
        if (activePlanIndexes.includes(index)) {
            if (activePlanIndexes.length > 1) {
                setActivePlanIndexes(activePlanIndexes.filter(i => i !== index));
            }
        } else {
            if (activePlanIndexes.length < 2) {
                setActivePlanIndexes([...activePlanIndexes, index]);
            } else {
                setActivePlanIndexes([activePlanIndexes[1], index]);
            }
        }
    };

    const activePlans = activePlanIndexes.map(idx => plans[idx]);

    return (
        <div className="xl:hidden">
            <div className="mb-4">
                <div className="text-xs font-semibold text-gray-600 mb-2 md:pl-2 uppercase tracking-wider">
                    Compare Plans (Select up to 2)
                </div>
                <div className="flex flex-wrap gap-2 ">
                    {plans.map((plan, index) => (
                        <button
                            key={plan.id}
                            onClick={() => togglePlan(index)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activePlanIndexes.includes(index)
                                ? 'bg-[linear-gradient(135deg,#3730a3_0%,#4f46e5_50%,#6d28d9_100%)] text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {plan.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50 sticky top-12 z-20 shadow-sm">
                            <tr>
                                <th scope="col" className="w-1/3 px-3 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-r border-gray-200 align-center pb-4">
                                    Features
                                </th>
                                {activePlans.map(plan => {
                                    const price = computePlanAmount(plan, billingInterval) || 0;

                                    return (
                                        <th key={plan.id} scope="col" className="w-1/3 px-3 py-3 text-center bg-white relative align-top pb-10">
                                            <div className="text-xs font-bold text-indigo-600 mb-1">{plan.name}</div>
                                            {loading ? (
                                                <div className="animate-pulse bg-slate-200 rounded h-5 w-16 mx-auto mb-2" />
                                            ) : (
                                                <>
                                                    <div className="text-sm md:text-base font-bold text-gray-900 mb-0.5">
                                                        {formatPrice(price, plan.currency || 'USD')}
                                                    </div>
                                                    {!plan.name.toLowerCase().includes('lifetime') && (
                                                        <div className="text-xs text-gray-500 mb-2">
                                                            /{billingInterval === 'YEARLY' ? 'yr' : 'mo'}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            <button
                                                onClick={() => onOpenPurchase?.(plan.id)}
                                                className="absolute bottom-2 left-2 right-2 py-1.5 rounded-md text-xs font-bold bg-[linear-gradient(135deg,#3730a3_0%,#4f46e5_50%,#6d28d9_100%)] hover:brightness-110 text-white transition-colors hover:-translate-y-[1px]"
                                            >
                                                Get Started
                                            </button>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <React.Fragment key="platform-limits-section-mobile">
                                <tr className="bg-gray-50 sticky top-[118px] z-10 ">
                                    <td colSpan={3} className="px-3 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50 flex items-center gap-2">
                                        Platform Resources
                                    </td>
                                </tr>
                                {[
                                    { key: 'seats', label: 'Seats', unit: 'seat', priceKey: 'seatUnitPrice', yearlyPriceKey: 'yearlySeatUnitPrice' },
                                    { key: 'storageGB', label: 'Storage', unit: 'GB', priceKey: 'storageUnitPrice', yearlyPriceKey: 'yearlyStorageUnitPrice' },
                                    { key: 'locations', label: 'Locations', unit: 'location', priceKey: 'locationUnitPrice', yearlyPriceKey: 'yearlyLocationUnitPrice' },
                                    { key: 'courses', label: 'CMS/Website Courses', unit: 'course', priceKey: 'courseUnitPrice', yearlyPriceKey: 'yearlyCourseUnitPrice' }
                                ].map((limit, idx) => (
                                    <tr key={limit.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-3 py-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                                            {limit.label}
                                        </td>
                                        {activePlans.map((plan, planIdx) => {
                                            const limitValue = (plan.limits as unknown as IPlanLimits)?.[limit.key as keyof IPlanLimits];
                                            const isUnlimited = limitValue === undefined || limitValue === null || Number(limitValue) === -1;
                                            const uniqueKey = `${plan.id || plan._id || planIdx}-${limit.key}`;

                                            let overageText = '';
                                            if (!isUnlimited) {
                                                overageText = formatOveragePrice(plan, limit, billingInterval);
                                            }

                                            return (
                                                <td key={uniqueKey} className="px-3 py-3 text-center text-xs">
                                                    <div className="font-bold text-gray-900">
                                                        {isUnlimited ? 'Unlimited' : (limit.key === 'storageGB' ? `${limitValue} GB` : limitValue)}
                                                    </div>
                                                    {overageText && (
                                                        <div className="text-[10px] text-gray-500 mt-0.5">
                                                            {overageText}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </React.Fragment>

                            {/* LMS Resources */}
                            {['lmsCourses', 'students', 'instructors', 'certificates'].some(key =>
                                activePlans.some(plan => {
                                    const val = (plan.limits as any)?.[key];
                                    return plan.isLmsEnabled !== false && (val === null || val === -1 || Number(val || 0) > 0);
                                })
                            ) && (
                                    <React.Fragment key="lms-limits-section-mobile">
                                        <tr className="bg-indigo-50/20 sticky top-[118px] z-10 ">
                                            <td colSpan={3} className="px-3 py-2 text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50/40 flex items-center gap-2">
                                                LMS / Training Resources
                                            </td>
                                        </tr>
                                        {[
                                            { key: 'lmsCourses', label: 'LMS Courses', unit: 'course', priceKey: 'lmsCourseUnitPrice', yearlyPriceKey: 'yearlyLmsCourseUnitPrice' },
                                            { key: 'students', label: 'Active Students', unit: 'student', priceKey: 'studentUnitPrice', yearlyPriceKey: 'yearlyStudentUnitPrice' },
                                            { key: 'instructors', label: 'Instructors', unit: 'instructor', priceKey: 'instructorUnitPrice', yearlyPriceKey: 'yearlyInstructorUnitPrice' },
                                            { key: 'certificates', label: 'Certificates', unit: 'certificate', priceKey: 'certificateUnitPrice', yearlyPriceKey: 'yearlyCertificateUnitPrice' }
                                        ].filter(limit => activePlans.some(plan => {
                                            const val = (plan.limits as any)?.[limit.key];
                                            return plan.isLmsEnabled !== false && (val === null || val === -1 || Number(val || 0) > 0);
                                        })).map((limit, idx) => (
                                            <tr key={limit.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50/10'}>
                                                <td className="px-3 py-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                                                    {limit.label}
                                                </td>
                                                {activePlans.map((plan, planIdx) => {
                                                    const limitValue = plan.isLmsEnabled !== false ? (plan.limits as unknown as IPlanLimits)?.[limit.key as keyof IPlanLimits] : undefined;
                                                    const uniqueKey = `${plan.id || plan._id || planIdx}-${limit.key}`;

                                                    if (limitValue === undefined) {
                                                        return <td key={uniqueKey} className="px-3 py-3 text-center text-xs font-bold text-gray-400 dark:text-gray-500">Not Included</td>;
                                                    }

                                                    const isUnlimited = limitValue === null || Number(limitValue) === -1;

                                                    let overageText = '';
                                                    if (!isUnlimited) {
                                                        overageText = formatOveragePrice(plan, limit, billingInterval);
                                                    }

                                                    return (
                                                        <td key={uniqueKey} className="px-3 py-3 text-center text-xs">
                                                            <div className="font-bold text-gray-900">
                                                                {isUnlimited ? 'Unlimited' : limitValue}
                                                            </div>
                                                            {overageText && (
                                                                <div className="text-[10px] text-gray-500 mt-0.5">
                                                                    {overageText}
                                                                </div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                )}

                            {Object.entries(displayGroups)
                                .map(([category, items]) => (
                                    <React.Fragment key={category}>
                                        <tr className="bg-gray-50 sticky top-[118px] z-10 ">
                                            <td colSpan={3} className="px-3 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                                                {category}
                                            </td>
                                        </tr>
                                        {items.map((item, idx) => (
                                            <tr key={item} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-3 py-3 text-xs font-medium text-gray-700 border-r border-gray-200">
                                                    {item}
                                                </td>
                                                {activePlans.map((plan, planIdx) => {
                                                    const status = displayFeatureStatus(plan, category, item);
                                                    const uniqueKey = (plan.id || plan._id || planIdx) + '-' + item;

                                                    return (
                                                        <td key={uniqueKey} className="px-3 py-3 text-center">
                                                            <RenderValue value={status} />
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlansComparisonTableMobile;
