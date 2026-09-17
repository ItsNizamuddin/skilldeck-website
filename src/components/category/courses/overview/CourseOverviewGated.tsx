"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GatedSectionsButton from "@/components/shared/GatedSectionsButton";
import { useGestureGate } from "@/hooks/useGestureGate";
import CourseSectionsNav from "./CourseSectionsNav";
import CourseOverviewCheckout from "./CourseOverviewCheckout";
import { buildCourseNavSections } from "./courseNavSections";

/**
 * The course overview block for pages that are not the canonical course page.
 *
 * City URLs (/{category}/{course}/{city}) and course patterns (/info/{slug})
 * rendered the canonical course page's body verbatim, which is what gets them
 * collapsed as duplicates in search. Here the body loads only after a real user
 * gesture:
 *
 *  - The detail sections carry `ssr: false` and no content arrives as props.
 *    Props to a client component are serialised into the RSC flight payload, so
 *    passing the course body would put it straight back into the HTML as JSON;
 *    this fetches from /api/courses/* instead.
 *  - The gate is a genuine input event, never scroll or IntersectionObserver.
 *    Googlebot renders at a very tall viewport, so scroll-based gates often do
 *    fire for it; input events do not. See useGestureGate.
 *  - The checkout column stays server-rendered. It is short and mostly numeric,
 *    and hiding the enrolment path behind an interaction would cost conversions.
 *
 * Same HTML and same JS go to every requester. There is no user-agent sniffing
 * here, and adding any would make it cloaking.
 */

// `ssr: false` is load-bearing. On the canonical course page this same content
// must reach crawlers; here it is the duplicate being kept out of the response.
const CourseOverviewSections = dynamic(() => import("./CourseOverviewSections"), { ssr: false });

interface CourseOverviewGatedProps {
    courseSlug: string;
    /** Names the course for the button's screen-reader label. */
    courseTitle?: string;
}

export default function CourseOverviewGated({ courseSlug, courseTitle }: CourseOverviewGatedProps) {
    const { open, openGate } = useGestureGate();
    const [data, setData] = useState<any>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!open || data || failed) return;

        const controller = new AbortController();

        (async () => {
            try {
                const response = await fetch(`/api/courses/${courseSlug}`, {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(`Course request failed: ${response.status}`);

                setData(await response.json());
            } catch (error) {
                if (controller.signal.aborted) return;
                console.error("Error loading course sections:", error);
                setFailed(true);
            }
        })();

        return () => controller.abort();
    }, [open, data, failed, courseSlug]);

    const overview = data?.overview_content || data;
    const navSections = data ? buildCourseNavSections(data, overview) : [];

    return (
        <section id="course-overview" className="relative py-10">
            {/* The nav's anchors only exist once the sections mount. */}
            {data && <CourseSectionsNav sections={navSections} />}

            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {data ? (
                        <CourseOverviewSections data={data} courseSlug={courseSlug} />
                    ) : (
                        <div className="lg:col-span-2">
                            <GatedSectionsButton
                                state={failed ? "failed" : open ? "loading" : "idle"}
                                // Retrying clears the failure, which lets the effect run again.
                                onActivate={failed ? () => setFailed(false) : openGate}
                                noun="course"
                                label={courseTitle}
                            />
                        </div>
                    )}

                    <CourseOverviewCheckout courseSlug={courseSlug} />
                </div>
            </div>
        </section>
    );
}
