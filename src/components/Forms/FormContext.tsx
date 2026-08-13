"use client";

import React, { createContext, useContext, useState } from 'react';

interface SubmitFormData {
    firstname: string;
    designation: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    mainBranchAddress: string;
    otherBranches: string;
    trainingsOffered: string;
    country: string;
    message: string;
    about_company: string;
    demo: boolean;
    page: string;
    requirements: string[];
    formtype: string;
    curriculum: boolean;
    slug: string;
    ip?: string;
    turnstileToken?: string | null;
}

interface FormContextType {
    isSubmitting: boolean;
    showThankyou: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    submitLeadForm: (data: SubmitFormData) => Promise<boolean>;
    resetFormState: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankyou, setShowThankyou] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitLeadForm = async (data: SubmitFormData): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData?.message || 'Failed to submit form. Please try again.');
            }

            setShowThankyou(true);
            return true;
        } catch (err: any) {
            setError(err.message || 'An error occurred during submission.');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetFormState = () => {
        setShowThankyou(false);
        setError(null);
        setIsSubmitting(false);
    };

    return (
        <FormContext.Provider value={{ isSubmitting, showThankyou, error, setError, submitLeadForm, resetFormState }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
