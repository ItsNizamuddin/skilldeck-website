"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GatedSectionsButton from "@/components/shared/GatedSectionsButton";
import { useGestureGate } from "@/hooks/useGestureGate";

/**
 * The service-derived half of a pattern page, mounted only after a user gesture.
 *
 * A service pattern is built from two sources: the pattern's own editorial
 * content, unique to that URL, and a block lifted straight from
 * /services/{slug} — benefits, approach, pricing, strategy, why-opt, business,
 * add-ons and the other-services cards. Every pattern under the same service
 * repeats that second half verbatim, and it is already indexed on the service
 * page itself.
 *
 *  - Nothing is server-rendered and no content arrives as props. Props to a
 *    client component are serialised into the RSC flight payload, so passing the
 *    service body would put it back in the HTML as JSON; this fetches instead.
 *    (A slug and a name are identifiers, not content.)
 *  - The gate is a real input event, never scroll or IntersectionObserver —
 *    see useGestureGate.
 *
 * Same HTML and same JS for every requester. No user-agent sniffing here, and
 * adding any would make it cloaking.
 */

// `ssr: false` is deliberate: this is the duplicate being kept out of the
// response. The service page itself must keep rendering these server-side.
const ServiceBenefits = dynamic(() => import("@/components/services/ServiceBenefits"), { ssr: false });
const ServiceApproach = dynamic(() => import("@/components/services/ServiceApproach"), { ssr: false });
const ServiceStrategyComponent = dynamic(() => import("@/components/services/ServiceStrategy"), { ssr: false });
const ServiceWhyOpt = dynamic(() => import("@/components/services/ServiceWhyOpt"), { ssr: false });
const ServiceBusiness = dynamic(() => import("@/components/services/ServiceBusiness"), { ssr: false });
const ServiceAddons = dynamic(() => import("@/components/services/ServiceAddons"), { ssr: false });
const ServiceMoreServicesCards = dynamic(() => import("@/components/services/ServiceMoreServicesCards"), { ssr: false });
const PricingSection = dynamic(() => import("@/components/Pricing/PricingSection"), { ssr: false });

interface PatternServiceSectionsProps {
    serviceSlug: string;
    serviceName?: string;
}

interface LoadedService {
    service: any;
    services: any[];
    plans: any[];
}

export default function PatternServiceSections({
    serviceSlug,
    serviceName,
}: PatternServiceSectionsProps) {
    const { open, openGate } = useGestureGate();
    const [data, setData] = useState<LoadedService | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!open || data || failed) return;

        const controller = new AbortController();
        const { signal } = controller;

        (async () => {
            try {
                // Only the service payload is fatal. Plans degrade to empty, which
                // renders PricingSection with nothing rather than failing the body.
                const [serviceRes, plansRes] = await Promise.all([
                    fetch(`/api/services/${serviceSlug}`, { signal }),
                    fetch(`/api/plans`, { signal }),
                ]);

                if (!serviceRes.ok) throw new Error(`Service request failed: ${serviceRes.status}`);

                const [payload, plans] = await Promise.all([
                    serviceRes.json(),
                    plansRes.ok ? plansRes.json() : [],
                ]);

                setData({
                    service: payload?.service || null,
                    services: payload?.services || [],
                    plans: Array.isArray(plans) ? plans : [],
                });
            } catch (error) {
                if (signal.aborted) return;
                console.error("Error loading pattern service sections:", error);
                setFailed(true);
            }
        })();

        return () => controller.abort();
    }, [open, data, failed, serviceSlug]);

    if (!data?.service) {
        return (
            <GatedSectionsButton
                state={failed ? "failed" : open ? "loading" : "idle"}
                // Retrying clears the failure, which lets the effect run again.
                onActivate={failed ? () => setFailed(false) : openGate}
                noun="service"
                label={serviceName}
            />
        );
    }

    const { service, services, plans } = data;

    return (
        <>
            <ServiceBenefits benefits={service.benefits} />

            <ServiceApproach
                approach={service.approach}
                strategy={service.strategy}
                media={service.strategy?.video || service.strategy?.media}
            />

            <PricingSection plans={plans} />

            <ServiceStrategyComponent strategy={service.strategy} />

            <ServiceWhyOpt whyopt={service.whyopt} />

            <ServiceBusiness business={service.business} />

            <ServiceAddons addons={service.addons} />

            <ServiceMoreServicesCards
                services={services}
                currentSlug={service.slug || serviceSlug}
                currentName={service.name}
            />
        </>
    );
}
