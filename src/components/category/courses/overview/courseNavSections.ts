import type { SectionLink } from "./CourseSectionsNav";

/**
 * The floating section nav's links, derived from whatever the course actually
 * carries. Pulled out of CourseOverview so the gated variant on city and pattern
 * pages can build the same list without duplicating the rules.
 */
export function buildCourseNavSections(data: any, overview: any): SectionLink[] {
    if (!data) return [];

    const items: SectionLink[] = [{ id: "overview", label: "Overview" }];

    if (data.syllabus_content) items.push({ id: "syllabus", label: "Syllabus" });
    if (data.tools || data.skills) items.push({ id: "tools-skills", label: "Tools & Skills" });
    if (data.trainers && data.trainers.length > 0) items.push({ id: "trainers", label: "Trainers" });
    if (data.career) items.push({ id: "career", label: "Career Path" });
    if (data.placements) items.push({ id: "placements", label: "Placements" });
    if (data.salaries && data.salaries.length > 0) items.push({ id: "salaries", label: "Salaries" });
    if (overview?.benefits || data.benefits) items.push({ id: "benefits", label: "Benefits" });

    items.push({ id: "reviews", label: "Reviews" });

    if (data.faqs && data.faqs.length > 0) items.push({ id: "faqs", label: "FAQs" });

    return items;
}
