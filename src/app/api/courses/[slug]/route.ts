import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/lib/apiProxy";

/**
 * The course body, for client-side consumers only.
 *
 * City pages (/{category}/{course}/{city}) and course patterns (/info/{slug})
 * repeat the canonical course page's sections verbatim, which is what gets them
 * collapsed as duplicates in search. Those pages now load the shared body from
 * here, after a user gesture, instead of server-rendering it into every URL.
 *
 * The payload is pruned to what CourseOverviewSections actually renders — the
 * checkout card, schedules and tenants come from SchedulesContext, and the
 * location-specific course variant is never needed here, because the point is
 * to serve the one canonical copy.
 *
 * Add `Disallow: /api/` to the Robots.txt script in the CMS: it stops a
 * compliant crawler fetching this even if it somehow trips the gate.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug || slug.includes(".") || slug.includes("/")) {
            return NextResponse.json({ error: "Invalid course slug" }, { status: 400 });
        }

        const response = await fetchFromBackend(`/courses/${slug}`, {
            next: { tags: [`course-${slug}`, "courses"] },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend API responded with ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // CourseOverview reads `data.overview_content || data`, so the overview
        // fields are carried at both levels rather than guessing which shape the
        // backend returned for this course.
        const pruned = {
            course_title: data.course_title,
            course_name: data.course_name,

            overview_content: data.overview_content,
            overview_title: data.overview_title,
            overview_description: data.overview_description,
            overview_key_features: data.overview_key_features,
            overview_who_can_attend: data.overview_who_can_attend,
            prerequisites: data.prerequisites,
            skillfocused: data.skillfocused,
            stats: data.stats,

            syllabus_content: data.syllabus_content,
            tools: data.tools,
            skills: data.skills,
            trainers: data.trainers,
            career: data.career,
            placements: data.placements,
            salaries: data.salaries,
            benefits: data.benefits,
            faqs: data.faqs,
        };

        return NextResponse.json(pruned, {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error: any) {
        console.error("API Proxy Error (Course body):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
