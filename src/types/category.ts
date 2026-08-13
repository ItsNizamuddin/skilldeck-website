export interface SalaryGraphData {
    label: string;
    value: number;
}

export interface Salary {
    id: number;
    title: string;
    graphData: SalaryGraphData[];
    description: string;
}

export interface CategoryData {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image?: {
        url: string;
        alt: string;
        thumbnail?: string;
    };
    stats?: Record<string, any>[];
    key_points?: string;
    salaries?: Salary[];
    faqs?: { title: string; value: string }[];
    internalSection?: {
        title: string;
        value: string;
    };
    bottomSection?: {
        title: string;
        value: string;
    };
}

export interface StatItem {
    [key: string]: string | number;
}

export interface AccordionItem {
    title: string;
    value: string;
}

export interface CourseCardData {
    courseDuration: string;
    courseTag: string;
    courseType: string;
    courseMode: string;
    totalEnrolled: string;
    tagline: string;
    courseThumbnail: {
        url: string;
        alt: string;
        thumbnail?: string;
    };
}

export interface Course {
    slug: string;
    course_title: string;
    course_name?: string;
    category?: {
        slug: string;
    };
    courseCard: CourseCardData;
    order?: number;
}
