import React, { useEffect, useRef, useState } from 'react';
// import { IPlan, GroupedFeatures } from './types';
import { Award, BookOpen, Building2, Check, Crown, HardDrive, Infinity, MapPin, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { BillingInterval, computePlanAmount, formatOveragePrice, formatPrice, GroupedDisplayFeatures } from './utils';
// import { IPlan } from '@saas-platform/interface-lib';
import { PricingPlan } from '@/lib/plans';
import DOMPurify from "isomorphic-dompurify";
import { GroupedFeatures } from './types';

type Props = {
    plan: PricingPlan;
    groups: GroupedFeatures;
    displayGroups?: GroupedDisplayFeatures;
    billingInterval?: BillingInterval;
    onPurchase?: (planId: string) => void;
    loading?: boolean;
};

const PricingCard: React.FC<Props> = ({
    plan,
    groups,
    billingInterval = 'MONTHLY',
    onPurchase,
    loading,
}) => {
    // Calculate price based on selected billing interval
    const displayPrice = computePlanAmount(plan, billingInterval) || 0;



    const { isHighlighted, isLifetime, icon, colorTheme } = plan.uiMetadata || { isHighlighted: false, isLifetime: false, icon: 'crown', colorTheme: 'default' };

    // Calculate yearly breakdown info
    const monthlyPrice = (plan.discountedPrice ?? plan.price) as number;
    const yearlyPrice = plan.yearlyDiscountedPrice ?? plan.yearlyPrice ?? (monthlyPrice * 12);
    const monthlyIfPaidYearly = monthlyPrice * 12;
    const monthlyEquivalent = billingInterval === 'YEARLY' ? yearlyPrice / 12 : null;
    const yearlySavings = billingInterval === 'YEARLY' && monthlyIfPaidYearly > yearlyPrice
        ? monthlyIfPaidYearly - yearlyPrice
        : 0;
    const savingsPercentage = yearlySavings > 0 ? Math.round((yearlySavings / monthlyIfPaidYearly) * 100) : 0;

    // Card Styles Logic since we are using colorTheme from metadata now

    let cardBgClass = 'bg-white text-gray-900 border border-gray-200 shadow-sm';
    let textColorClass = 'text-gray-900';
    let subTextColorClass = 'text-gray-500';
    let buttonClass = 'bg-[#0d5af0] text-white hover:brightness-110 hover:-translate-y-[1px] shadow-lg shadow-[#5c3ffa]/20 transition-all duration-300';
    let checkIconClass = 'text-green-500';
    let iconBgClass = 'bg-brand-50 text-brand-600';

    if (colorTheme === 'blue') {
        cardBgClass = 'bg-[#0d5af0] text-white';
        textColorClass = 'text-white';
        subTextColorClass = 'text-blue-100';
        buttonClass = 'bg-white text-[#0d5af0] hover:bg-slate-50 hover:-translate-y-[1px] transition-all duration-300';
        checkIconClass = 'text-white';
        iconBgClass = 'bg-white/20 text-white';
    } else if (colorTheme === 'slate') {
        cardBgClass = 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0';
        textColorClass = 'text-white';
        subTextColorClass = 'text-gray-400';
        buttonClass = 'bg-white text-slate-950 hover:bg-slate-50 hover:-translate-y-[1px] transition-all duration-300';
        checkIconClass = 'text-emerald-400';
        iconBgClass = 'bg-white/10 text-white';
    } else if (colorTheme === 'purple') {
        iconBgClass = 'bg-purple-50 text-purple-600';
    }


    // Icon Selection - "More Realistic" via specific choices
    const renderIcon = () => {
        if (icon === 'rocket') return <Rocket className={`w-6 h-6 ${isHighlighted ? 'text-white' : 'text-brand-600'}`} />;
        if (icon === 'building') return <Building2 className={`w-6 h-6 ${isHighlighted ? 'text-white' : 'text-purple-600'}`} />;
        if (icon === 'infinity') return <Infinity className="w-6 h-6 text-white" />;
        return <Crown className={`w-6 h-6 ${isHighlighted ? 'text-white' : 'text-brand-600'}`} />;
    };

    // Customize Icon BG per plan if not highlighted
    if (!isHighlighted && !isLifetime) {
        if (icon === 'building') iconBgClass = 'bg-purple-50 text-purple-600';
        if (icon === 'rocket') iconBgClass = 'bg-blue-50 text-blue-600';
    }


    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // Show indicator if we are not at the bottom
            setCanScrollDown(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        // Also check on mount
        setTimeout(checkScroll, 100);
        return () => window.removeEventListener('resize', checkScroll);
    }, [groups]);

    return (
        <div className="relative h-full flex flex-col group/card-container">
            {/* Stacked Effect for Lifetime */}
            {isLifetime && (
                <>
                    <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-slate-200 dark:bg-slate-700 rounded-[2rem] -z-10 transform translate-y-2 translate-x-2 transition-transform duration-300 group-hover/card-container:translate-x-3 group-hover/card-container:translate-y-3" />
                    <div className="absolute top-2 left-2 right-[-16px] bottom-[-16px] bg-slate-100 dark:bg-slate-800 rounded-[2rem] -z-20 transform translate-y-4 translate-x-4 transition-transform duration-300 group-hover/card-container:translate-x-6 group-hover/card-container:translate-y-6" />
                </>
            )}

            <div
                className={`
                    relative flex flex-col p-4 rounded-2xl h-full transition-all duration-300
                    ${cardBgClass}
                    ${!isHighlighted && !isLifetime ? 'hover:shadow-xl hover:-translate-y-1' : 'transform group-hover/card-container:-translate-y-1 shadow-2xl z-10'}
                `}
            >
                {isHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFCB27] text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap uppercase tracking-wide z-20">
                        Most Popular
                    </div>
                )}

                {!isLifetime && savingsPercentage > 0 && billingInterval === 'YEARLY' && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-2 py-1 md:py-1.5 rounded-bl-xl z-20">
                        Save {savingsPercentage}%
                    </div>
                )}

                {/* STICKY HEADER SECTION */}
                <div className="flex-none z-10">
                    {/* Header Info */}
                    <div className="space-y-2 mb-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
                            {renderIcon()}
                        </div>

                        <h3 className={`text-xl font-bold h-7 truncate ${textColorClass}`}>
                            {plan.name}
                        </h3>

                        <div
                            className={`text-[11px] 2xl:text-xs leading-relaxed h-32 overflow-hidden ${subTextColorClass}`}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(plan.description || "For growing teams")
                            }}
                        />

                        <div className="h-fit flex items-center">
                            <div
                                className={`inline-block px-2.5 py-1 rounded-lg text-[11px] 2xl:text-xs font-semibold leading-normal ${isHighlighted || colorTheme !== 'default'
                                    ? 'bg-white/15 text-white shadow-sm'
                                    : 'bg-brand-50 text-brand-700 border border-brand-100/50'
                                    }`}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(plan.themeDescription || `${plan.name} Features`)
                                }}
                            />
                        </div>

                        <div className="h-10 flex items-baseline justify-start">
                            {loading ? (
                                <div className={`animate-pulse rounded-lg h-8 w-32 ${colorTheme !== 'default' ? 'bg-white/20' : 'bg-slate-200'}`} />
                            ) : !isLifetime ? (
                                <>
                                    <span className={`text-3xl font-bold ${textColorClass}`}>
                                        {formatPrice(displayPrice, plan.currency || 'USD')}
                                    </span>
                                    <span className={`text-xs md:text-sm ml-2 ${subTextColorClass}`}>
                                        /{billingInterval === 'YEARLY' ? 'year' : 'mo'}
                                    </span>
                                </>
                            ) : (
                                <span className={`text-3xl font-bold ${textColorClass}`}>
                                    Custom
                                </span>
                            )}
                        </div>

                        <div className="h-5">
                            {loading ? (
                                <div className={`animate-pulse rounded-md h-4 w-40 mt-1 ${colorTheme !== 'default' ? 'bg-white/10' : 'bg-slate-100'}`} />
                            ) : billingInterval === 'YEARLY' && monthlyEquivalent && !isLifetime ? (
                                <p className={`text-xs 2xl:text-sm ${subTextColorClass}`}>
                                    {formatPrice(monthlyEquivalent, plan.currency || 'USD')}/mo billed annually
                                </p>
                            ) : null}
                        </div>
                    </div>

                    {/* Action Button */}
                    {isLifetime ? (
                        <button
                            // onClick={() => triggerForm('lifetime_plan_enquiry')}
                            className={`w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm mb-6 transition-colors shadow-sm ${buttonClass}`}
                        >
                            Contact Sales
                        </button>
                    ) : (
                        <button
                            onClick={() => onPurchase?.(plan.id)}
                            className={`w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm mb-6 transition-colors shadow-sm ${buttonClass}`}
                        >
                            Start Free Trial
                        </button>
                    )}

                    {/* Divider */}
                    <div className={`w-full h-px mb-4 ${isHighlighted || isLifetime ? 'bg-white/20' : 'bg-gray-100'}`} />
                </div>

                {/* SCROLLABLE FEATURES SECTION */}
                {!isLifetime && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="md:hidden w-full py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm mb-4"
                    >
                        {isExpanded ? 'Hide features' : 'Show features'}
                    </button>
                )}

                <div className={`flex-1 min-h-0 relative group/list ${(isExpanded || isLifetime) ? 'block' : 'hidden'} md:block`}>
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="h-full overflow-y-auto pr-2 pricing-scrollbar"
                    >
                        {/* Limits with Overage Pricing */}
                        <div className="space-y-4 pb-2 ">
                            {plan.limits && Object.keys(plan.limits).length > 0 && (
                                <div className="mb-6">
                                    <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isHighlighted || isLifetime ? 'text-white/80' : 'text-gray-500'}`}>
                                        Platform Resources
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 mb-6">
                                        {['seats', 'storage', 'locations', 'courses'].map(key => {
                                            const val = (plan.limits as any)[key] ?? (plan.limits as any)[key === 'storage' ? 'storageGB' : ''];
                                            const config = getResourceConfig(key);
                                            const isUnlimited = isLifetime || val === undefined || val === null || Number(val) === -1 || (key === 'storage' && Number(val) === 0);

                                            let priceKey = `${key.replace(/s$/, '')}UnitPrice`;
                                            let yearlyPriceKey = `yearly${key.replace(/s$/, '').charAt(0).toUpperCase() + key.replace(/s$/, '').slice(1)}UnitPrice`;

                                            if (key === 'seats') { priceKey = 'seatUnitPrice'; yearlyPriceKey = 'yearlySeatUnitPrice'; }
                                            else if (key === 'storage') { priceKey = 'storageUnitPrice'; yearlyPriceKey = 'yearlyStorageUnitPrice'; }
                                            else if (key === 'locations') { priceKey = 'locationUnitPrice'; yearlyPriceKey = 'yearlyLocationUnitPrice'; }
                                            else if (key === 'courses') { priceKey = 'courseUnitPrice'; yearlyPriceKey = 'yearlyCourseUnitPrice'; }

                                            let overageText = '';
                                            if (!isLifetime && !isUnlimited) {
                                                const priceText = formatOveragePrice(plan, { priceKey, yearlyPriceKey }, billingInterval);
                                                if (priceText) overageText = priceText;
                                            }

                                            const displayValue = isUnlimited ? 'Unlimited' : (key === 'storage' ? `${val} GB` : val);

                                            return (
                                                <div key={key} className={`h-[52px] w-full flex items-center justify-between rounded-xl px-3 border ${isHighlighted || isLifetime ? 'bg-white/10 border-white/20' : 'bg-gray-50/80 border-gray-100/80'}`}>
                                                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                        <div className={`shrink-0 p-1.5 rounded-lg shadow-sm ${isHighlighted || isLifetime ? 'bg-white/20 text-white' : 'bg-white text-gray-500'}`}>
                                                            {config.icon}
                                                        </div>
                                                        <span className={`text-sm font-semibold truncate ${isHighlighted || isLifetime ? 'text-white' : 'text-gray-700'}`}>
                                                            {displayValue} <span className={`font-medium ${isHighlighted || isLifetime ? 'text-white/70' : 'text-gray-500'}`}>{config.label}</span>
                                                        </span>
                                                    </div>
                                                    {overageText && (
                                                        <div className={`shrink-0 text-[10px] font-bold tracking-tight ${isHighlighted || isLifetime ? 'text-white/90' : 'text-blue-600'}`}>
                                                            {overageText}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${!isLifetime && plan.isLmsEnabled === false
                                    ? 'text-gray-400 opacity-60'
                                    : (isHighlighted || isLifetime ? 'text-white/80' : 'text-blue-500')
                                    }`}>
                                    LMS / Training Resources
                                </h4>
                                <div className="mb-6 grid grid-cols-1 gap-2">
                                    {['lmsCourses', 'students', 'instructors', 'certificates'].map(key => {
                                        const config = getResourceConfig(key);
                                        const val = plan.isLmsEnabled !== false ? (plan.limits as any)[key] : undefined;
                                        const isLmsDisabled = !isLifetime && plan.isLmsEnabled === false;

                                        let priceKey = `${key.replace(/s$/, '')}UnitPrice`;
                                        let yearlyPriceKey = `yearly${key.replace(/s$/, '').charAt(0).toUpperCase() + key.replace(/s$/, '').slice(1)}UnitPrice`;

                                        if (key === 'lmsCourses') { priceKey = 'lmsCourseUnitPrice'; yearlyPriceKey = 'yearlyLmsCourseUnitPrice'; }
                                        else if (key === 'students') { priceKey = 'studentUnitPrice'; yearlyPriceKey = 'yearlyStudentUnitPrice'; }
                                        else if (key === 'instructors') { priceKey = 'instructorUnitPrice'; yearlyPriceKey = 'yearlyInstructorUnitPrice'; }
                                        else if (key === 'certificates') { priceKey = 'certificateUnitPrice'; yearlyPriceKey = 'yearlyCertificateUnitPrice'; }

                                        const isUnlimited = isLifetime || val === null || Number(val) === -1;
                                        let overageText = '';
                                        if (!isLmsDisabled && !isUnlimited) {
                                            const priceText = formatOveragePrice(plan, { priceKey, yearlyPriceKey }, billingInterval);
                                            if (priceText) overageText = priceText;
                                        }

                                        const displayValue = isLmsDisabled ? 'Not Included' : (isUnlimited ? 'Unlimited' : val);

                                        return (
                                            <div key={key} className={`h-[52px] w-full flex items-center justify-between rounded-xl px-3 border ${isLmsDisabled
                                                ? (isHighlighted || isLifetime ? 'bg-white/5 border-white/10 opacity-60' : 'bg-gray-50/40 border-gray-100/50 opacity-60')
                                                : (isHighlighted || isLifetime ? 'bg-white/10 border-white/20' : 'bg-blue-50/30 border-blue-100/50')
                                                }`}>
                                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                    <div className={`shrink-0 p-1.5 rounded-lg shadow-sm ${isLmsDisabled
                                                        ? (isHighlighted || isLifetime ? 'bg-white/10 text-white/50' : 'bg-white text-gray-400')
                                                        : (isHighlighted || isLifetime ? 'bg-white/20 text-white' : 'bg-white text-blue-500')
                                                        }`}>
                                                        {config.icon}
                                                    </div>
                                                    <span className={`text-sm font-semibold truncate ${isHighlighted || isLifetime ? 'text-white' : 'text-gray-700'}`}>
                                                        {isLmsDisabled ? (
                                                            <span className={isHighlighted || isLifetime ? 'text-white/50' : 'text-gray-400 font-medium'}>Not Included</span>
                                                        ) : (
                                                            <>{displayValue}</>
                                                        )} <span className={`font-medium ${isHighlighted || isLifetime ? 'text-white/70' : 'text-gray-500'}`}>{config.label}</span>
                                                    </span>
                                                </div>
                                                {overageText && (
                                                    <div className={`shrink-0 text-[10px] font-bold tracking-tight ${isHighlighted || isLifetime ? 'text-white/90' : 'text-blue-600'}`}>
                                                        {overageText}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {isLifetime ? (
                                <div className="mt-6">
                                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 text-white/80`}>
                                        Included Features
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <Check className={`w-4 h-4 text-emerald-400`} strokeWidth={3} />
                                        <span className={`text-sm font-medium text-white`}>
                                            Everything Included
                                        </span>
                                    </div>
                                </div>
                            ) : plan.displayFeatures && plan.displayFeatures.length > 0 ? (
                                plan.displayFeatures.map((group: any, idx: number) => {
                                    const category = group.category;
                                    return (
                                        <div key={idx} className="mt-6 first:mt-4">
                                            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isHighlighted || isLifetime ? 'text-white/80' : 'text-gray-600'}`}>
                                                {category}
                                            </h4>
                                            <div className="mb-4 last:mb-0 space-y-2.5">
                                                {group.items && group.items.map((item: string, itemIdx: number) => (
                                                    <div key={itemIdx} className="flex items-start gap-3">
                                                        <div className="mt-0.5 shrink-0">
                                                            <Check className={`w-4 h-4 ${checkIconClass}`} strokeWidth={3} />
                                                        </div>
                                                        <span className={`text-sm font-medium leading-tight pt-0.5 ${isHighlighted || isLifetime ? 'text-white' : 'text-gray-600'}`}>
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-sm italic py-6">
                                    All basic features included
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block mt-auto pt-4 flex-none z-10">
                    {isLifetime ? (
                        <></>
                    ) : (
                        <button
                            onClick={() => onPurchase?.(plan.id)}
                            className={`w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm mb-6 transition-colors shadow-sm ${buttonClass}`}
                        >
                            Start Free Trial
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};

const getResourceConfig = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'seats') return { label: 'Seats', icon: <Users size={14} />, colorClass: 'text-blue-500', resourceKey: 'seat' as const };
    if (lowerKey === 'storagegb' || lowerKey === 'storage') return { label: 'Storage', icon: <HardDrive size={14} />, colorClass: 'text-purple-500', resourceKey: 'storage' as const };
    if (lowerKey === 'locations') return { label: 'Locations', icon: <MapPin size={14} />, colorClass: 'text-indigo-500', resourceKey: 'location' as const };
    if (lowerKey === 'courses') return { label: 'CMS/Website Courses', icon: <BookOpen size={14} />, colorClass: 'text-emerald-500', resourceKey: 'course' as const };
    if (lowerKey === 'lmscourses') return { label: 'LMS Courses', icon: <BookOpen size={14} />, colorClass: 'text-blue-500', resourceKey: 'lmsCourse' as const };
    if (lowerKey === 'students') return { label: 'Active Students', icon: <Users size={14} />, colorClass: 'text-orange-500', resourceKey: 'student' as const };
    if (lowerKey === 'instructors') return { label: 'Instructors', icon: <ShieldCheck size={14} />, colorClass: 'text-brand-500', resourceKey: 'instructor' as const };
    if (lowerKey === 'certificates') return { label: 'Certificates', icon: <Award size={14} />, colorClass: 'text-purple-600', resourceKey: 'certificate' as const };
    return { label: key, icon: <Sparkles size={14} />, colorClass: 'text-gray-500', resourceKey: 'seat' as const };
};

export default PricingCard;
