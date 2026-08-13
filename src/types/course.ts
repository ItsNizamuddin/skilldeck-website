export interface CourseOverviewContent {
    overview_title?: string;
    overview_description?: string;
    overview_who_can_attend?: {
        description?: string;
        roles?: string;
    };
    prerequisites?: string;
    skillfocused?: string;
    stats?: Array<{ title: string; value: string }>;
    overview_key_features?: string[];
    overview_video_link?: {
        url: string;
        alt: string;
        thumbnail?: string;
    };
    benefits?: {
        description?: string;
        individual?: string;
        organization?: string;
    };
}

export interface CourseOverviewData extends CourseOverviewContent {
    overview_content?: CourseOverviewContent;
    course_title?: string;
    course_name?: string;
    metaDescription?: string;
    syllabus_content?: Array<{ title: string; value: string }>;
    tools?: Array<{ name: string; description: string; icon?: { url: string; alt: string } }>;
    skills?: Array<{ name: string; description: string }>;
    trainers?: any[];
    career?: {
        path?: Array<{ title: string; description: string }>;
        certification_process?: Array<{ title: string; description?: string }>;
    };
    placements?: {
        title?: string;
        description?: string;
        personData?: any[];
    };
    salaries?: any[];
    faqs?: Array<{ title: string; value: string }>;
    bottomSection?: { title: string; value: string };
    internalSection?: { title: string; value: string };
}

export interface OverviewProps {
    data: CourseOverviewData;
    courseSlug: string;
    courseName?: string;
}
