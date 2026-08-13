"use client";

import { useState } from "react";
import CompanyContactModal from "./CompanyContactModal";

interface CompanyContactButtonProps {
    tenantId?: string;
    companyName?: string;
    scheduleId?: string;
    courseId?: string;
    courseTitle?: string;
    children?: React.ReactNode;
    renderButton?: (onClick: () => void) => React.ReactNode;
    className?: string; // Add className prop
    showPreferredDateTime?: boolean;
}

export default function CompanyContactButton({
    tenantId,
    companyName,
    scheduleId,
    courseId,
    courseTitle,
    children,
    renderButton,
    className,
    showPreferredDateTime = false
}: CompanyContactButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {renderButton ? (
                renderButton(openModal)
            ) : (
                <button onClick={openModal} className={className}>
                    {children || "Contact"}
                </button>
            )}

            <CompanyContactModal
                isOpen={isModalOpen}
                onClose={closeModal}
                tenantId={tenantId}
                companyName={companyName}
                scheduleId={scheduleId}
                courseId={courseId}
                courseTitle={courseTitle}
                showPreferredDateTime={showPreferredDateTime}
            />
        </>
    );
}
