"use client";

import dynamic from "next/dynamic";
import { PartnerCardsSkeleton } from "./PartnerSkeletons";

const TopPartnersSection = dynamic(
    () => import("./TopPartnersSection"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full space-y-8 py-6">
                <PartnerCardsSkeleton />
            </div>
        ),
    }
);

interface TopPartnersClientWrapperProps {
    courseSlug: string;
    courseTitle?: string;
    locationSlug?: string;
}

export default function TopPartnersClientWrapper(props: TopPartnersClientWrapperProps) {
    return <TopPartnersSection {...props} />;
}
