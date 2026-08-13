"use client";

import { Grid, List } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import PlansComparison from './elements/PlansComparison';
import PlansComparisonTable from './elements/PlansComparisonTable';
// import { IPlan } from '@saas-platform/interface-lib';
import MarketPlaceCta from '@/components/Home/elements/MarketPlaceCta';
import { useIpLocation } from '@/hooks/useIpLocation';
import { PricingPlan } from '@/lib/plans';
import { BillingInterval } from './elements/utils';

interface Props {
    onToggleNavbar?: (hidden: boolean) => void;
    plans: PricingPlan[];
    showHeading?: boolean;
}

export default function PricingSection({ onToggleNavbar, plans: initialPlans, showHeading = true }: Props) {
    const [loading, setLoading] = useState(true);
    const [billingInterval, setBillingInterval] = useState<BillingInterval>('MONTHLY');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { data: locationData, loading: ipLoading } = useIpLocation();



    // Client-side pricing localization
    useEffect(() => {
        const localizePlans = async () => {
            if (ipLoading) return;

            try {
                const detectedCurrency = locationData?.currency;

                if (detectedCurrency && detectedCurrency !== initialPlans[0]?.currency) {
                    const plansRes = await fetch(`/api/plans?currency=${detectedCurrency}`);
                    if (plansRes.ok) {
                        const localizedPlans = await plansRes.json();
                        setPlans(localizedPlans);
                    }
                } else if (detectedCurrency === initialPlans[0]?.currency) {
                    setPlans(initialPlans);
                }
            } catch (error) {
                console.error("Error localizing plans in PricingSection:", error);
            } finally {
                setLoading(false);
            }
        };

        localizePlans();
    }, [locationData, ipLoading, initialPlans]);

    // Calculate max savings percentage across all plans
    const maxSavingsPercentage = useMemo(() => {
        if (!plans?.length) return 0;
        const percentages = plans
            .filter(plan => plan.id !== 'lifetime-plan' && plan.code !== 'LIFETIME')
            .map(plan => {
                const monthly = plan.discountedPrice ?? plan.price ?? 0;
                const yearly = plan.yearlyDiscountedPrice ?? plan.yearlyPrice ?? (monthly * 12);
                if (monthly === 0) return 0;
                const totalMonthly = monthly * 12;
                const diff = totalMonthly - yearly;
                return diff > 0 ? Math.round((diff / totalMonthly) * 100) : 0;
            });
        return percentages.length > 0 ? Math.max(...percentages, 0) : 0;
    }, [plans]);

    // Navbar Hiding Logic for Table View
    useEffect(() => {
        if (viewMode !== 'table' || !onToggleNavbar) {
            onToggleNavbar?.(false);
            return;
        }

        const handleScroll = () => {
            if (tableContainerRef.current) {
                const rect = tableContainerRef.current.getBoundingClientRect();
                const shouldHide = rect.top <= 100 && rect.bottom > 100;
                onToggleNavbar(shouldHide);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            onToggleNavbar(false); // Reset on unmount/change
        };
    }, [viewMode, onToggleNavbar]);


    const handlePurchase = (planId: string) => {
        // Find the plan to get its details if needed
        const plan = plans.find(p => p.id === planId);


        // Redirect to registration page with selection
        // window.location.href = `/register?plan=${planId}&interval=${billingInterval}`;
        window.location.href = `/register`;

    };

    return (
        <section className="py-10 bg-white" id="plans">
            <div className="container mx-auto px-2 lg:px-0">
                {showHeading && (
                    <>
                        <div className="text-center max-w-3xl mx-auto mb-8 2xl:mb-12">
                            <h2 className="text-xl md:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-3">
                                Flexible Pricing for Every Business
                            </h2>
                            <p className="text-sm 2xl:text-lg text-gray-500 max-w-2xl mx-auto">
                                Skilldeck is made affordable for everyone. No matter the size or stage of your business, Skilldeck fits.
                            </p>
                        </div>

                        {/* Free Marketplace Signup CTA Banner */}
                        <MarketPlaceCta />
                    </>
                )}

                {/* Controls Row - Centered Billing, Right View Mode */}
                <div className="relative flex flex-col md:flex-row justify-center items-center mb-6 2xl:mb-10 gap-3 md:gap-6">
                    {/* Billing Interval Toggle */}
                    <div className="bg-gray-100 p-1.5 rounded-full inline-flex items-center relative">
                        <button
                            onClick={() => setBillingInterval('MONTHLY')}
                            className={`
                                relative z-10 px-8 py-2.5 2xl:px-10 2xl:py-3.5 text-sm 2xl:text-base font-semibold rounded-full transition-all duration-300
                                ${billingInterval === 'MONTHLY'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                }
                            `}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingInterval('YEARLY')}
                            className={`
                                relative z-10 px-8 py-2.5 2xl:px-10 2xl:py-3.5 text-sm 2xl:text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-2
                                ${billingInterval === 'YEARLY'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                }
                            `}
                        >
                            Annual
                            {maxSavingsPercentage > 0 && (
                                <span className={`
                                    ml-1 text-[10px] 2xl:text-xs font-bold px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full uppercase tracking-wide
                                    ${billingInterval === 'YEARLY'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-green-50 text-green-600'
                                    }
                                `}>
                                    Save ~{maxSavingsPercentage}%
                                </span>
                            )}
                        </button>
                    </div>

                    {/* View Mode Toggle - Absolute Right on Desktop */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 md:absolute md:right-0">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            title="Cards View"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            title="Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {viewMode === 'cards' ? (
                    <PlansComparison
                        loading={loading}
                        plans={plans}
                        billingInterval={billingInterval}
                        onOpenPurchase={handlePurchase}
                    />
                ) : (
                    <div ref={tableContainerRef}>
                        <PlansComparisonTable
                            loading={loading}
                            plans={plans}
                            billingInterval={billingInterval}
                            onOpenPurchase={handlePurchase}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
