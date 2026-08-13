export interface ArticleMeta {
    title: string;
    author: string;
    views: string;
    readTime: string;
    publishedAt: string;
    category: string;
}

export interface Institute {
    rank: number;
    id: string;
    platformProfile?: any;
    slug?: string;
    name: string;
    website: string;
    established?: string;
    address: string;
    description: string;
    highlights: string[];
    logo?: string;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    bestFor?: string;
    features?: string[];
    isFeatured?: boolean;
    companySize?: string;
    industry?: string;
}

export interface Company {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    industry?: string;
    isVerified?: boolean;
    isSponsored?: boolean;
    rating?: number;
    reviewCount?: number;
    activeSchedules?: number;
    totalTrainees?: number;
    coursesOffered?: number;
    yearsExperience?: number;
    platformProfile?: CompanyProfile;
}

export interface CompanyProfile {
    shortDescription?: string;
    description?: string;
    industry?: string;
    location?: string;
    services?: string[];
    website?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    foundedYear?: number;
    employeeCount?: string;
}

export interface Course {
    title: string;
    slug?: string;
    category?: string;
}

export interface Pricing {
    currency: {
        code: string;
        symbol: string;
    };
    price: number;
    actualPrice?: number;
    comparedPrice?: number;
}

export interface Trainer {
    id: string;
    name: string;
    role?: string;
    image?: string;
    bio?: string;
    rating?: number;
    experience?: string;
    linkedin?: string;
}

export interface Schedule {
    id: string;
    _id?: string;
    course: Course;
    company: Pick<Company, 'id' | 'name' | 'logo' | 'isVerified' | 'rating' | 'slug'>;
    startsAt: string;
    endsAt: string;
    deliveryType: 'online' | 'offline' | 'hybrid' | string;
    batchType?: 'weekday' | 'weekend' | string;
    totalSessions?: number;
    timezone?: string;
    location?: string;
    description?: string;
    pricing?: Pricing[];
    price?: number;
    tenantId?: string;
    isFeatured?: boolean;
    isFlexibleSchedule?: boolean;
    commencementDate?: string;
    rank?: number;
    enableFastfilling?: boolean;
    enableRecommend?: boolean;
    seatsAvailable?: number;
    totalSeats?: number;
    trainers?: Trainer[];
    code?: string;
    image?: string;
}
