"use client";

import { useCallback, useState } from "react";
import { useSchedules } from "@/context/SchedulesContext";
import CourseCheckoutCard from "../CourseCheckoutCard";

interface CourseOverviewCheckoutProps {
    courseSlug: string;
}

/**
 * The right-hand checkout column.
 *
 * Kept separate from the detail sections so city and pattern pages can
 * server-render the pricing and enrolment card while the duplicate course body
 * stays behind the gesture gate. The card is short and mostly numeric, so it is
 * not what search sees as duplicated prose.
 */
export default function CourseOverviewCheckout({ courseSlug }: CourseOverviewCheckoutProps) {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const { schedules, tenants, loading } = useSchedules(courseSlug);

    const handleCompanySelect = useCallback((id: string) => {
        setSelectedCompanyId(id);
    }, []);

    return (
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
    );
}
