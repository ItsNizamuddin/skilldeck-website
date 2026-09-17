"use client";

import { OverviewProps } from "@/types";
import { useMemo } from "react";
import CourseSectionsNav from "./CourseSectionsNav";
import CourseOverviewSections from "./CourseOverviewSections";
import CourseOverviewCheckout from "./CourseOverviewCheckout";
import { buildCourseNavSections } from "./courseNavSections";

/**
 * The canonical course page's overview block.
 *
 * The detail sections and the checkout column now live in their own components
 * so the gated variant used by city and pattern pages can reuse them without a
 * second copy of the body drifting out of sync. The markup rendered here is
 * unchanged: section > nav + container > grid > [sections, checkout].
 */
export default function CourseOverview({ data, courseSlug }: OverviewProps) {
    const overview = data?.overview_content || data;
    const navSections = useMemo(() => buildCourseNavSections(data, overview), [data, overview]);

    if (!data) return null;

    return (
        <section id="course-overview" className="relative py-10">
            {/* Floating Left Sections Navigation */}
            <CourseSectionsNav sections={navSections} />

            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <CourseOverviewSections data={data} courseSlug={courseSlug} />
                    <CourseOverviewCheckout courseSlug={courseSlug} />
                </div>
            </div>
        </section>
    );
}
