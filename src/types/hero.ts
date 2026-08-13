/**
 * Shared types for the Course Hero banner and schedule card.
 * Imported by CourseHeroParts, CourseHeroCard, and CourseHero.
 */

export interface HeroTenant {
    id?: string;
    name?: string;
    logo?: string;
}

export interface HeroPricing {
    comparedPrice?: number;
    actualPrice?: number;
    currency?: {
        symbol?: string;
        code?: string;
    };
}

export interface PlatformSchedule {
    _id?: string | { $oid: string };
    id?: string;
    code?: string;
    tenantId?: string;
    tenant?: HeroTenant;
    country?: {
        name?: string;
        timeZone?: string;
        code?: string;
    };
    startsAt?: string;
    endsAt?: string;
    deliveryType?: string;
    batchType?: string;
    totalSessions?: number;
    isFeatured?: boolean;
    rank?: number;
    pricing?: HeroPricing[];
    seatsAvailable?: number;
    totalSeats?: number;
    enableFastfilling?: boolean;
    enableRecommend?: boolean;
    image?: string;
    
    // New platform fields
    bulkUploadId?: string;
    courseId?: string;
    createdAt?: string | { $date: string };
    updatedAt?: string | { $date: string };
    currency?: string;
    duration?: string | number;
    expiredAt?: string | null;
    isActive?: boolean;
    isExpired?: boolean;
    isFlexibleSchedule?: boolean;
    markedForDeletion?: boolean;
    marketplaceProduct?: {
        _id?: string;
        name?: string;
        slug?: string;
    };
    platform?: {
        showOnPlatform?: boolean;
        isActive?: boolean;
    };
    price?: number;
    pricingTemplateId?: string;
    product?: {
        _id?: string;
        name?: string;
        slug?: string;
        categorySlug?: string;
    };
    scheduleType?: string | null;
    searchTags?: string[];
    sessionsDatesUtc?: string[] | any[];
    status?: string;
    title?: string;
    venu?: string;
    commencementDateUtc?: string | { $date: string } | any;
    jobAssistance?: boolean;
    jobGuaranteed?: boolean;
    modules?: Array<{
        title: string;
        value: string;
    }>;
    projects?: string[];
}

export type HeroSchedule = PlatformSchedule;


export interface CourseThumbnail {
    url: string;
    alt: string;
}

export interface CourseCardData {
    courseDuration?: string;
    courseMode?: string;
    courseType?: string;
    totalEnrolled?: string;
    courseIcon?: Array<{ alt: string; url: string }>;
    courseThumbnail?: CourseThumbnail;
    isTrending?: boolean;
    isEditorsPick?: boolean;
}

export interface CourseHeroData {
    course_title: string;
    course_name?: string;
    category?: { name?: string; slug?: string };
    tagline?: string;
    courseCard?: CourseCardData;
    banner_content?: {
        description?: string;
        keypoints?: string;
        stats?: Array<{
            title: string;
            value: string;
            icon?: string;
        }>;
    };
    trainers?: Array<{ rating?: number }>;
    aggregateRating?: { ratingValue?: number; reviewCount?: number };
}
