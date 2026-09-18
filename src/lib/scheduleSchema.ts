import type { Schedule } from "@/types/schedules";

/**
 * Event structured data for training schedules.
 *
 * The schedules listing is the only place a schedule is server-rendered — the
 * course and company pages load theirs from a client island — so this is the
 * one page whose markup can describe them.
 *
 * Dates arrive from the backend as naive local datetimes ("2026-10-05T10:00").
 * They are emitted unchanged: schema.org accepts a local ISO 8601 datetime, and
 * Google reads one with no offset as local to the event, which is what a batch
 * time is. Inventing an offset here would move the times.
 */

const ATTENDANCE_MODE: Record<string, string> = {
    online: "OnlineEventAttendanceMode",
    offline: "OfflineEventAttendanceMode",
    classroom: "OfflineEventAttendanceMode",
    blended: "MixedEventAttendanceMode",
    hybrid: "MixedEventAttendanceMode",
};

/** ISO 8601 date, with or without a time and offset. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function cleanDate(value?: string): string | null {
    const raw = (value || "").trim();
    if (!raw || !ISO_DATE.test(raw)) return null;
    // A value that passes the shape test but is not a real instant (month 13,
    // say) would emit an invalid startDate, which Google reports as an error.
    return Number.isNaN(new Date(raw).getTime()) ? null : raw.replace(" ", "T");
}

function sellingPrice(schedule: Schedule): { price: number; currency: string } | null {
    const p = schedule.pricing?.[0];
    if (!p) return null;
    // Matches ScheduleCard: comparedPrice is the live price, price the fallback.
    const value = Number(p.comparedPrice ?? p.price);
    if (!Number.isFinite(value) || value <= 0) return null;
    return { price: value, currency: p.currency?.code || "USD" };
}

interface BuildOptions {
    /** Origin, no trailing slash. */
    siteUrl: string;
}

/**
 * One EducationEvent per schedule that has a usable start date.
 *
 * A schedule with no date is skipped rather than guessed at — startDate is
 * required, and an Event without one is an error in Search Console. The undated
 * rows are the flexible schedules, which have no fixed start by design rather
 * than by omission, so the list is normally shorter than the page.
 */
export function buildScheduleEventsSchema(
    schedules: Schedule[],
    { siteUrl }: BuildOptions
): object[] {
    const origin = siteUrl.replace(/\/+$/, "");
    const listingUrl = `${origin}/companies/schedules`;

    const events: object[] = [];

    for (const schedule of schedules) {
        const startDate = cleanDate(schedule.startsAt) || cleanDate(schedule.commencementDate);
        if (!startDate) continue;

        const name = (schedule.course?.title || "").trim();
        if (!name) continue;

        const companyName = schedule.company?.name?.trim();
        const companySlug = schedule.company?.slug;
        // Every event needs somewhere real to point. The company page carries the
        // schedule list, so it beats a filtered listing URL.
        const url = companySlug ? `${origin}/companies/${companySlug}#schedules` : listingUrl;

        const delivery = (schedule.deliveryType || "").toLowerCase();
        const mode = ATTENDANCE_MODE[delivery] || "OfflineEventAttendanceMode";
        const venue = schedule.location?.trim();

        const virtual = { "@type": "VirtualLocation", "url": url };
        const place = venue
            ? { "@type": "Place", "name": companyName || "Training venue", "address": venue }
            : null;

        let location: object | object[];
        if (mode === "OnlineEventAttendanceMode") {
            location = virtual;
        } else if (mode === "MixedEventAttendanceMode") {
            // Google wants both halves described for a mixed-mode event.
            location = place ? [virtual, place] : virtual;
        } else {
            location = place || { "@type": "Place", "name": companyName || "Training venue", "address": "On site" };
        }

        const endDate = cleanDate(schedule.endsAt);
        const offer = sellingPrice(schedule);
        const trainers = (schedule.trainers || []).filter((t) => t?.name);

        const descriptionParts = [
            `${name} training`,
            companyName ? `by ${companyName}` : null,
            schedule.batchType ? `${schedule.batchType} batch` : null,
            schedule.deliveryType ? `${schedule.deliveryType} delivery` : null,
        ].filter(Boolean);

        events.push({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            "name": name,
            "description": schedule.description?.trim() || `${descriptionParts.join(", ")}.`,
            "startDate": startDate,
            ...(endDate && { "endDate": endDate }),
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": `https://schema.org/${mode}`,
            "location": location,
            "url": url,
            ...(schedule.image && { "image": schedule.image }),
            ...(companyName && {
                "organizer": {
                    "@type": "Organization",
                    "name": companyName,
                    ...(companySlug && { "url": `${origin}/companies/${companySlug}` }),
                },
            }),
            ...(trainers.length > 0 && {
                "performer": trainers.map((t) => ({ "@type": "Person", "name": t.name })),
            }),
            ...(offer && {
                "offers": {
                    "@type": "Offer",
                    "price": offer.price,
                    "priceCurrency": offer.currency,
                    "availability": "https://schema.org/InStock",
                    "url": url,
                },
            }),
        });
    }

    return events;
}
