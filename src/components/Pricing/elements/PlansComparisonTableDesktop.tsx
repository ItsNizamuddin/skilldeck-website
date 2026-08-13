import React, { useMemo } from 'react';
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

const PlansComparisonTableDesktop: React.FC<Props> = ({
    plans,
    billingInterval = 'MONTHLY',
    onOpenPurchase,
    loading,
}) => {
    const displayGroups = useMemo(() => groupDisplayFeatures(plans || []), [plans]);

    return (
        <div className="hidden xl:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto xl:overflow-visible">
            <table className="w-full border-collapse relative">
                <thead className="sticky top-0 z-20 bg-white shadow-sm">
                    <tr>
                        <th scope="col" className="p-4 text-left bg-gray-50 border-b border-gray-200 min-w-[200px] align-middle pb-5">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Features</span>
                        </th>
                        {plans.map(plan => {
                            const price = computePlanAmount(plan, billingInterval) || 0;
                            return (
                                <th key={plan.id} scope="col" className="p-4 text-center border-b border-gray-200 min-w-[200px] relative align-top bg-white pb-10">
                                    <h3 className="text-sm font-bold text-blue-600 mb-1">{plan.name}</h3>
                                    <div className="mb-4">
                                        <div className="flex items-center justify-center gap-1">
                                            {loading ? (
                                                <div className="animate-pulse bg-slate-200 rounded h-6 w-20" />
                                            ) : (
                                                <>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {formatPrice(price, plan.currency || 'USD')}
                                                    </span>
                                                    {!plan.name.toLowerCase().includes('lifetime') && (
                                                        <span className="text-sm text-gray-500">/{billingInterval === 'YEARLY' ? 'yr' : 'mo'}</span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* Action Button */}
                                    {
                                        (plan as any).uiMetadata?.isLifetime ? (
                                            <button
                                                onClick={() => window.location.href = '/contact-us'}
                                                className="absolute bottom-4 left-4 right-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                                            >
                                                Contact Sales
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onOpenPurchase?.(plan.id)}
                                                className="absolute bottom-4 left-4 right-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                                            >
                                                Start Free Trial
                                            </button>
                                        )
                                    }
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <React.Fragment key="platform-limits-section">
                        <tr className="bg-gray-50 sticky top-[120px] z-10 ">
                            <td colSpan={plans.length + 1} className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50 flex items-center gap-2">
                                Platform Resources
                            </td>
                        </tr>
                        {[
                            { key: 'seats', label: 'Seats', unit: 'seat', priceKey: 'seatUnitPrice', yearlyPriceKey: 'yearlySeatUnitPrice' },
                            { key: 'storageGB', label: 'Storage', unit: 'GB', priceKey: 'storageUnitPrice', yearlyPriceKey: 'yearlyStorageUnitPrice' },
                            { key: 'locations', label: 'Locations', unit: 'location', priceKey: 'locationUnitPrice', yearlyPriceKey: 'yearlyLocationUnitPrice' },
                            { key: 'courses', label: 'CMS/Website Courses', unit: 'course', priceKey: 'courseUnitPrice', yearlyPriceKey: 'yearlyCourseUnitPrice' }
                        ].map((limit) => (
                            <tr key={limit.key} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm font-medium text-gray-700">{limit.label}</td>
                                {plans.map(plan => {
                                    const limitValue = (plan.limits as unknown as IPlanLimits)?.[limit.key as keyof IPlanLimits];
                                    const isUnlimited = limitValue === undefined || limitValue === null || Number(limitValue) === -1 || (limit.key === 'storageGB' && Number(limitValue) === 0);

                                    let overageText = '';
                                    if (!isUnlimited) {
                                        overageText = formatOveragePrice(plan, limit, billingInterval);
                                    }

                                    return (
                                        <td key={`${plan.id}-${limit.key}`} className="px-4 py-3 text-center text-sm text-gray-900 font-medium">
                                            <div>{isUnlimited ? 'Unlimited' : (limit.key === 'storageGB' ? `${limitValue} GB` : limitValue)}</div>
                                            {overageText && (
                                                <div className="text-xs text-gray-500 font-normal mt-0.5">
                                                    {overageText}/extra
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
                        plans.some(plan => {
                            const val = (plan.limits as any)?.[key];
                            return plan.isLmsEnabled !== false && (val === null || val === -1 || Number(val || 0) > 0);
                        })
                    ) && (
                            <React.Fragment key="lms-limits-section">
                                <tr className="bg-blue-50/30 sticky top-[120px] z-10 ">
                                    <td colSpan={plans.length + 1} className="px-4 py-2 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50/50 flex items-center gap-2">
                                        LMS / Training Resources
                                    </td>
                                </tr>
                                {[
                                    { key: 'lmsCourses', label: 'LMS Courses', unit: 'course', priceKey: 'lmsCourseUnitPrice', yearlyPriceKey: 'yearlyLmsCourseUnitPrice' },
                                    { key: 'students', label: 'Active Students', unit: 'student', priceKey: 'studentUnitPrice', yearlyPriceKey: 'yearlyStudentUnitPrice' },
                                    { key: 'instructors', label: 'Instructors', unit: 'instructor', priceKey: 'instructorUnitPrice', yearlyPriceKey: 'yearlyInstructorUnitPrice' },
                                    { key: 'certificates', label: 'Certificates', unit: 'certificate', priceKey: 'certificateUnitPrice', yearlyPriceKey: 'yearlyCertificateUnitPrice' }
                                ].filter(limit => plans.some(plan => {
                                    const val = (plan.limits as any)?.[limit.key];
                                    return plan.isLmsEnabled !== false && (val === null || val === -1 || Number(val || 0) > 0);
                                })).map((limit) => (
                                    <tr key={limit.key} className="hover:bg-blue-50/10 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-700">{limit.label}</td>
                                        {plans.map(plan => {
                                            const limitValue = plan.isLmsEnabled !== false ? (plan.limits as unknown as IPlanLimits)?.[limit.key as keyof IPlanLimits] : undefined;

                                            if (limitValue === undefined) {
                                                return <td key={`${plan.id}-${limit.key}`} className="px-4 py-3 text-center text-sm font-bold text-gray-400 dark:text-gray-500">Not Included</td>;
                                            }

                                            const isUnlimited = limitValue === null || Number(limitValue) === -1;

                                            let overageText = '';
                                            if (!isUnlimited) {
                                                overageText = formatOveragePrice(plan, limit, billingInterval);
                                            }

                                            return (
                                                <td key={`${plan.id}-${limit.key}`} className="px-4 py-3 text-center text-sm text-gray-900 font-medium">
                                                    <div>{isUnlimited ? 'Unlimited' : limitValue}</div>
                                                    {overageText && (
                                                        <div className="text-xs text-gray-500 font-normal mt-0.5">
                                                            {overageText}/extra
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
                                <tr className="bg-gray-50 sticky top-[120px] z-10 shadow-sm">
                                    <td colSpan={plans.length + 1} className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                                        {category}
                                    </td>
                                </tr>
                                {items.map(item => (
                                    <tr key={item} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                            {item}
                                        </td>
                                        {plans.map(plan => {
                                            const status = displayFeatureStatus(plan, category, item);

                                            return (
                                                <td key={`${plan.id}-${item}`} className="px-4 py-3 text-center text-sm">
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
        </div >
    );
};

export default PlansComparisonTableDesktop;
