import { IPlan, PlanStatus, PlanInterval } from "@/types/interface-lib";

export interface PricingPlan extends IPlan {
    uiMetadata: {
        isHighlighted: boolean;
        isLifetime: boolean;
        colorTheme: "blue" | "purple" | "slate" | "default";
        icon: "rocket" | "crown" | "infinity" | "building";
        badge?: string;
        savingsBadge?: boolean;
    };
}

export const STATIC_LIFETIME_PLAN: PricingPlan = {
    id: "lifetime-plan",
    _id: "lifetime-plan",
    code: "LIFETIME",
    status: PlanStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: "Lifetime Access",
    description: "Pay once, own it forever. Best value for long-term power users.",
    price: 19999,
    discountedPrice: 14999,
    yearlyPrice: 14999,
    yearlyDiscountedPrice: 14999,
    currency: "USD",
    interval: PlanInterval.YEARLY,
    features: [],
    limits: {
        seats: 0,
        storageGB: 0,
        locations: 0,
        courses: 0
    },
    uiMetadata: {
        isHighlighted: false,
        isLifetime: true,
        colorTheme: "slate",
        icon: "infinity",
    }
};

const enrichPlan = (plan: IPlan, index?: number): PricingPlan => {
    const name = plan.name.toLowerCase();
    const isEnterprise = name.includes("enterprise");
    const isStarter = name.includes("starter") || name.includes("business");
    let isLifetime = name.includes("lifetime");

    let colorTheme: PricingPlan["uiMetadata"]["colorTheme"] = "default";
    let icon: PricingPlan["uiMetadata"]["icon"] = "crown";
    let isHighlighted = false;
    let badge: string | undefined = undefined;

    if (index === 1) {
        isHighlighted = true;
        badge = "Most Popular";
        colorTheme = "blue";
        icon = "building";
    }

    if (isEnterprise) {
        icon = "building";
        if (!isHighlighted) {
            colorTheme = "blue";
        }
    } else if (isLifetime) {
        colorTheme = "slate";
        icon = "infinity";
        isLifetime = true;
    } else if (isStarter) {
        if (!isHighlighted) {
            colorTheme = "default";
            icon = "rocket";
        }
    }

    return {
        ...plan,
        uiMetadata: {
            isHighlighted,
            isLifetime,
            colorTheme,
            icon,
            badge,
            savingsBadge: true
        }
    };
};

export const fetchPlans = async (currency?: string): Promise<PricingPlan[]> => {
    try {
        const apiUrl = process.env.SERVER_URL || "https://api.skilldeck.net";
        const queryParams = new URLSearchParams();
        if (currency) {
            queryParams.append("currency", currency);
        }
        const queryString = queryParams.toString();
        const url = `${apiUrl}/api/v1/admin/plans${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            console.error(`Failed to fetch plans: ${response.statusText}`);
            return [STATIC_LIFETIME_PLAN];
        }
        const data = await response.json();
        const plansData = Array.isArray(data) ? data : (data.data || []);

        const sanitizedPlans = plansData.map((p: any, index: number) => ({
            ...p,
            id: p.id || p._id || `plan-${index}`
        }));

        const uniquePlans = sanitizedPlans.filter((p: any) =>
            p.code !== STATIC_LIFETIME_PLAN.code && p.id !== STATIC_LIFETIME_PLAN.id
        );

        const enrichedPlans = uniquePlans.map((p: any, i: number) => enrichPlan(p, i));

        return [...enrichedPlans, STATIC_LIFETIME_PLAN];
    } catch (error: any) {
        console.error("Error fetching plans:", error);
        return [STATIC_LIFETIME_PLAN];
    }
};
