"use client";

import dynamic from "next/dynamic";

// Eagerly loaded (above-fold / critical path)
import CourseSyllabus from "../CourseSyllabus";
import KeyFeatures from "./KeyFeatures";
import { OverviewHeader } from "./OverviewHeader";
import { SkillsFocused } from "./SkillsFocused";
import { TargetAudience } from "./TargetAudience";

// Lazy-loaded (below-fold) — split into separate chunks to reduce initial JS bundle
const ToolsAndSkills = dynamic(() => import("./ToolsAndSkills"));
const CourseTrainers = dynamic(() => import("./CourseTrainers"));
const CourseCareer = dynamic(() => import("./CourseCareer"));
const CoursePlacements = dynamic(() => import("./CoursePlacements"));
const CourseSalaries = dynamic(() => import("./CourseSalaries"));
const CourseBenefits = dynamic(() => import("./CourseBenefits"));
const CourseTestimonials = dynamic(() => import("./CourseTestimonials"));
const CourseFAQ = dynamic(() => import("./CourseFAQ"));

interface CourseOverviewSectionsProps {
    data: any;
    courseSlug: string;
}

/**
 * The left-hand detail column of the course overview — every section a visitor
 * reads about the course.
 *
 * Lifted out of CourseOverview so the canonical course page and the gated
 * variant used by city and pattern pages render one implementation rather than
 * two copies that drift apart. The grid wrapper, the floating section nav and
 * the checkout column all live with the consumer.
 */
export default function CourseOverviewSections({ data, courseSlug }: CourseOverviewSectionsProps) {
    if (!data) return null;

    const overview = data?.overview_content || data;

    return (
        <div className="lg:col-span-2 space-y-10">
            <div id="overview" className="scroll-mt-24">
                <OverviewHeader
                    title={overview.overview_title || ""}
                    description={overview.overview_description || ""}
                    stats={overview.stats || []}
                />
            </div>

            {overview.skillfocused && (
                <SkillsFocused skills={overview.skillfocused} />
            )}

            {(overview.overview_who_can_attend?.roles || overview.prerequisites) && (
                <TargetAudience
                    whoCanAttend={overview.overview_who_can_attend}
                    prerequisites={overview.prerequisites}
                />
            )}

            {overview.overview_key_features && (
                <KeyFeatures features={overview.overview_key_features} />
            )}

            {data.syllabus_content && (
                <div id="syllabus" className="scroll-mt-24">
                    <CourseSyllabus data={data.syllabus_content} />
                </div>
            )}

            {(data.tools || data.skills) && (
                <div id="tools-skills" className="scroll-mt-24">
                    <ToolsAndSkills tools={data.tools} skills={data.skills} />
                </div>
            )}

            {data.trainers && data.trainers.length > 0 && (
                <div id="trainers" className="scroll-mt-24">
                    <CourseTrainers trainers={data.trainers} />
                </div>
            )}

            {data.career && (
                <div id="career" className="scroll-mt-24">
                    <CourseCareer data={data.career} />
                </div>
            )}

            {data.placements && (
                <div id="placements" className="scroll-mt-24">
                    <CoursePlacements placements={data.placements} />
                </div>
            )}

            {data.salaries && data.salaries.length > 0 && (
                <div id="salaries" className="scroll-mt-24">
                    <CourseSalaries salaries={data.salaries} />
                </div>
            )}

            {(overview.benefits || data.benefits) && (
                <div id="benefits" className="scroll-mt-24">
                    <CourseBenefits benefits={overview.benefits || data.benefits} />
                </div>
            )}

            <div id="reviews" className="scroll-mt-24">
                <CourseTestimonials courseSlug={courseSlug} />
            </div>

            {data.faqs && data.faqs.length > 0 && (
                <div id="faqs" className="scroll-mt-24">
                    <CourseFAQ items={data.faqs} />
                </div>
            )}
        </div>
    );
}
