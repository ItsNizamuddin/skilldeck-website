"use client";

import { useSchedules } from "@/context/SchedulesContext";
import { OverviewProps } from "@/types";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import CourseCheckoutCard from "../CourseCheckoutCard";
import { OverviewHeader } from "./OverviewHeader";

// Eagerly loaded (above-fold / critical path)
import CourseSyllabus from "../CourseSyllabus";
import KeyFeatures from "./KeyFeatures";
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


export default function CourseOverview({ data, courseSlug, courseName }: OverviewProps) {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    const { schedules, tenants, loading } = useSchedules(courseSlug);

    const handleCompanySelect = useCallback((id: string) => {
        setSelectedCompanyId(id);
    }, []);

    if (!data) return null;

    const overview = data.overview_content || data;
    // console.log("Data", data)
    return (
        <section id="course-overview" className="py-10">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Left details column */}
                    <div className="lg:col-span-2 space-y-10">
                        <div id="overview">
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
                            <CourseSyllabus data={data.syllabus_content} />
                        )}

                        {(data.tools || data.skills) && (
                            <ToolsAndSkills tools={data.tools} skills={data.skills} />
                        )}

                        {data.trainers && data.trainers.length > 0 && (
                            <CourseTrainers trainers={data.trainers} />
                        )}

                        {data.career && (
                            <CourseCareer data={data.career} />
                        )}

                        {data.placements && (
                            <CoursePlacements placements={data.placements} />
                        )}

                        {data.salaries && data.salaries.length > 0 && (
                            <CourseSalaries salaries={data.salaries} />
                        )}

                        {(overview.benefits || data.benefits) && (
                            <CourseBenefits benefits={overview.benefits || data.benefits} />
                        )}

                        <CourseTestimonials courseSlug={courseSlug} />

                        {data.faqs && data.faqs.length > 0 && (
                            <CourseFAQ items={data.faqs} />
                        )}

                    </div>




                    {/* Right checkout column */}
                    <div className="lg:col-span-1 hidden md:flex justify-center lg:justify-end lg:sticky lg:top-24 h-fit">
                        <CourseCheckoutCard
                            schedules={schedules || []}
                            tenants={tenants || []}
                            courseSlug={courseSlug}
                            selectedCompanyId={selectedCompanyId}
                            onCompanySelect={handleCompanySelect}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
