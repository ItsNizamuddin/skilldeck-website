"use client";

import { useState } from "react";
import {
    ServiceBanner,
    ServiceBannerStat,
    ServiceCard,
    ServiceCategoryRef,
    ServiceReview,
    ServiceStatItem,
    ServiceWhyPoint,
} from "./types";
import { isVideoUrl, normalizeRichText, resolveMediaAlt, resolveMediaUrl } from "./richText";

/**
 * Shared contract and derived content for the service hero variants.
 *
 * Three layouts are in review with the client; keeping the prop shape and the
 * field-resolution rules here means a CMS change lands in all of them at once,
 * and only the layout differs between files.
 */
export interface ServiceHeroProps {
    banner?: ServiceBanner;
    servicestats?: ServiceStatItem[];
    serviceName: string;
    servicecard?: ServiceCard;
    serviceCategory?: ServiceCategoryRef;
    /** Icon + title + blurb tiles under the headline — sourced from `whyservice.points`. */
    highlights?: ServiceWhyPoint[];
    fallbackTagline?: string;
    description?: string;
    brochureUrl?: string;
    clientsCount?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
}

/** How many feature tiles a hero carries before it crowds the media. */
export const MAX_HIGHLIGHTS = 4;

/** Frame ratio before the asset reports its own, plus the bounds it may take. */
export const DEFAULT_ASPECT = 16 / 10;
const MIN_ASPECT = 0.7;
const MAX_ASPECT = 2.4;

export function clampAspect(width: number, height: number): number | null {
    if (!width || !height) return null;
    return Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, width / height));
}

/**
 * The CMS ships dashboards, portraits and 16:9 clips alike, so every variant
 * measures the asset and matches it rather than cropping to a fixed ratio.
 */
export function useMediaAspect() {
    const [aspect, setAspect] = useState<number | null>(null);
    return {
        aspectRatio: aspect ?? DEFAULT_ASPECT,
        onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) =>
            setAspect(clampAspect(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)),
        onVideoLoad: (e: React.SyntheticEvent<HTMLVideoElement>) =>
            setAspect(clampAspect(e.currentTarget.videoWidth, e.currentTarget.videoHeight)),
    };
}

export interface HeroContent {
    heading: string;
    body: string;
    tagline: string;
    rating?: string;
    clients?: string;
    review?: ServiceReview;
    media?: string;
    mediaAlt: string;
    mediaIsVideo: boolean;
    features: ServiceWhyPoint[];
    floatingStat?: ServiceBannerStat;
    stats: ServiceStatItem[];
    breadcrumbItems: { label: string; href?: string }[];
}

/** Resolves every CMS fallback chain the heroes share. */
export function useHeroContent({
    banner = {},
    servicestats = [],
    serviceName,
    servicecard = {},
    serviceCategory,
    highlights = [],
    fallbackTagline = "Professional Service",
    description = "",
    clientsCount,
}: ServiceHeroProps): HeroContent {
    const heading = banner.h1 || servicecard.title || serviceName;
    const review = banner.reviews?.[0];

    // Feature tiles prefer the richer `whyservice` points; the flat card points
    // are the fallback so the row is never empty.
    const featurePoints = highlights.filter((p) => p?.title).slice(0, MAX_HIGHLIGHTS);
    const fallbackPoints = (servicecard.points || [])
        .filter(Boolean)
        .slice(0, MAX_HIGHLIGHTS)
        .map((point) => ({ title: point }) as ServiceWhyPoint);

    return {
        heading,
        body: banner.description || servicecard.content || description,
        tagline: servicecard.tagline || banner.tagline || fallbackTagline,
        rating: servicecard.ratings || review?.ratings,
        clients: clientsCount || servicecard.clients,
        review,
        // Banner asset first, service-card thumbnail as the fallback; either may be a clip.
        media: resolveMediaUrl(banner.media) || servicecard.thumbnail?.trim() || undefined,
        mediaAlt: resolveMediaAlt(banner.media) || heading,
        mediaIsVideo: isVideoUrl(resolveMediaUrl(banner.media) || servicecard.thumbnail),
        features: featurePoints.length > 0 ? featurePoints : fallbackPoints,
        floatingStat: (banner.stats || []).find((s) => s?.value),
        stats: servicestats.filter((s) => s?.value),
        // No /services index or per-category route exists yet, so the ancestors
        // render as plain text rather than links to 404s.
        breadcrumbItems: [
            { label: "Home", href: "/" },
            { label: "Services" },
            ...(serviceCategory?.name ? [{ label: serviceCategory.name }] : []),
            { label: serviceName },
        ],
    };
}

/**
 * Editors mark accent words with `<strong>`/`<em>`/`<mark>`; when the CMS ships
 * plain text the trailing two words take the gradient so the headline still
 * carries the brand ramp.
 */
export function renderHeading(heading: string) {
    if (/<[a-z][\s\S]*>/i.test(heading)) {
        return (
            <span
                className="[&_strong]:text-brand-gradient [&_em]:text-brand-gradient [&_em]:not-italic [&_mark]:bg-transparent [&_mark]:text-brand-gradient"
                dangerouslySetInnerHTML={{ __html: normalizeRichText(heading) }}
            />
        );
    }

    const words = heading.trim().split(/\s+/);
    if (words.length < 4) return <>{heading}</>;

    return (
        <>
            {words.slice(0, -2).join(" ")}{" "}
            <span className="text-brand-gradient">{words.slice(-2).join(" ")}</span>
        </>
    );
}
