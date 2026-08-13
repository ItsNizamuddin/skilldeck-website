import { Institute, Company, Schedule } from "@/types/schedules";

// Helper to generate dynamic highlights based on actual tenant details
const getDynamicHighlights = (tenant: any): string[] => {
    const areas = tenant.platformProfile?.trainingAreas;
    if (areas && Array.isArray(areas) && areas.length > 0) {
        return areas.filter((a: any) => typeof a === "string" && a.trim() !== "");
    }

    const list: string[] = [];

    // 1. Specialization/Industry Program
    if (tenant.industry) {
        list.push(`${tenant.industry} Training`);
    }

    // 2. Rating or verification badge
    if (tenant.rating && tenant.rating > 0) {
        list.push(`Top Rated (${tenant.rating} ★)`);
    } else if (tenant.isVerified) {
        list.push("Verified Academy");
    }

    // 3. Address city/Location
    const city = tenant.address?.city || tenant.platformProfile?.location;
    if (city) {
        list.push(`Based in ${city}`);
    }

    // 4. Established Year
    if (tenant.foundedYear) {
        list.push(`Established ${tenant.foundedYear}`);
    }

    return list;
};

// Map API Tenant data to Institute format used in CompanyAndSchedule
export const mapToInstitute = (tenant: any, index: number): Institute => {
    return {
        rank: index + 1,
        id: tenant.id,
        name: tenant.legalName || tenant.name,
        website: tenant.platformProfile?.website || "#",
        logo: tenant.logo,
        established: tenant.foundedYear ? tenant.foundedYear.toString() : "",
        address: tenant.address ? `${tenant.address.city}, ${tenant.address.state}` : (tenant.platformProfile?.location || ""),
        description: tenant.platformProfile?.shortDescription || tenant.platformProfile?.description || "",
        bestFor: tenant.industry || "",
        highlights: getDynamicHighlights(tenant),
        isVerified: tenant.isVerified,
        rating: tenant.rating,
        slug: tenant.slug,
        companySize: tenant.companySize ? (typeof tenant.companySize === 'number' ? `${tenant.companySize}+ Team` : tenant.companySize) : undefined,
        industry: tenant.industry || undefined
    };
};

export const mapToSchedule = (
    schedule: any,
    companyData: Pick<Company, 'id' | 'name' | 'logo' | 'isVerified' | 'rating' | 'slug'>,
    locationData: any
): Schedule => {
    return {
        id: schedule.id || schedule._id,
        course: {
            title: schedule.marketplaceProduct?.name || schedule.product?.name || schedule.title || "Unknown Course",
            slug: schedule.marketplaceProduct?.slug || schedule.product?.slug,
            category: schedule.product?.categorySlug || 'Training'
        },
        company: companyData,
        startsAt: schedule.startsAt,
        endsAt: schedule.endsAt,
        deliveryType: schedule.deliveryType,
        batchType: schedule.batchType,
        totalSessions: schedule.totalSessions,
        timezone: locationData?.timezone || schedule.country?.timeZone,
        location: schedule.venu,
        trainers: schedule.trainers || (schedule.trainer ? [{
            id: schedule.trainer.code || 'unknown',
            name: schedule.trainer.name,
            role: "Trainer",
            rating: schedule.trainer.rating,
            experience: schedule.trainer.experience
        }] : []),
        description: schedule.description,
        pricing: schedule.pricing || [],
        isFeatured: schedule.isFeatured || false,
        enableFastfilling: schedule.enableFastfilling,
        enableRecommend: schedule.enableRecommend,
        seatsAvailable: schedule.seatsAvailable,
        totalSeats: schedule.totalSeats,
        code: schedule.code || schedule.scheduleCode,
        image: schedule.image || schedule.marketplaceProduct?.image || schedule.product?.image
    };
};
