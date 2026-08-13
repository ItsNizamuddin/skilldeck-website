export interface Company {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    shortDescription?: string;
    description?: string;
    industry?: string;
    location?: string;
    isVerified?: boolean;
    isSponsored?: boolean;
    companySize?: string;
    foundedYear?: number;
}
