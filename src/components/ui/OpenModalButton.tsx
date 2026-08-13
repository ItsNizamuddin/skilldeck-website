"use client";

import { ReactNode } from 'react';
import { useLeadModal } from '@/components/Forms/LeadModalContext';
import { Button, ButtonProps } from '@/components/ui/Button';

interface OpenModalButtonProps extends ButtonProps {
    children: ReactNode;
    config?: {
        source?: string;
        formTitle?: string;
        formDescription?: string;
        courseSlug?: string;
    };
}

export default function OpenModalButton({ children, config, onClick, ...props }: OpenModalButtonProps) {
    const { openModal } = useLeadModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        openModal(config);
        if (onClick) onClick(e);
    };

    return (
        <Button onClick={handleClick} {...props}>
            {children}
        </Button>
    );
}
