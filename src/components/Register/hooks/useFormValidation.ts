import { useCallback } from 'react';
import { FormData, FieldErrors } from './useRegisterForm';

type SetFieldErrorFn = (field: string, message: string) => void;
type SetServerErrorFn = (msg: string | null) => void;
type ClearAllErrorsFn = () => void;

interface ValidationDeps {
    formData: FormData;
    sameAsAddress: boolean;
    turnstileToken: string | null;
    setFieldError: SetFieldErrorFn;
    setServerError: SetServerErrorFn;
    clearAllErrors: ClearAllErrorsFn;
    useRegistrationContact: boolean;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useFormValidation = (deps: ValidationDeps) => {
    const { formData, sameAsAddress, turnstileToken, setFieldError, setServerError, clearAllErrors, useRegistrationContact } = deps;

    const validateStep = useCallback((step: number): boolean => {
        setServerError(null);
        clearAllErrors();
        let hasErrors = false;

        if (step === 1) {
            if (!formData.legalName.trim()) {
                setFieldError('legalName', 'Company name is required');
                hasErrors = true;
            }
            if (!formData.name.trim()) {
                setFieldError('name', 'Dashboard subdomain is required');
                hasErrors = true;
            }
            if (!formData.industry.trim()) {
                setFieldError('industry', 'Please specify your industry');
                hasErrors = true;
            }
            if (!formData.companySize || Number(formData.companySize) <= 0) {
                setFieldError('companySize', 'Enter a valid team size');
                hasErrors = true;
            }
            if (!formData.ownerName.trim()) {
                setFieldError('ownerName', 'Full name is required');
                hasErrors = true;
            }
            if (!formData.ownerEmail.trim()) {
                setFieldError('ownerEmail', 'Email address is required');
                hasErrors = true;
            } else if (!isValidEmail(formData.ownerEmail)) {
                setFieldError('ownerEmail', 'Please enter a valid email address');
                hasErrors = true;
            }
            if (!formData.phoneNumber.trim()) {
                setFieldError('phoneNumber', 'Phone number is required');
                hasErrors = true;
            }
            if (!formData.billingEmail.trim()) {
                setFieldError('billingEmail', 'Billing email is required');
                hasErrors = true;
            } else if (!isValidEmail(formData.billingEmail)) {
                setFieldError('billingEmail', 'Please enter a valid email address');
                hasErrors = true;
            }
            return !hasErrors;
        }

        if (step === 2) {
            if (!formData.platformProfile.description.trim()) {
                setFieldError('platformProfile.description', 'Company description is required');
                hasErrors = true;
            }

            // Optional website validation
            if (formData.platformProfile.website && !/^https?:\/\/.*/.test(formData.platformProfile.website)) {
                setFieldError('platformProfile.website', 'Please enter a valid URL starting with http:// or https://');
                hasErrors = true;
            }

            if (!useRegistrationContact) {
                if (!formData.platformProfile.email.trim()) {
                    setFieldError('platformProfile.email', 'Public email is required');
                    hasErrors = true;
                } else if (!isValidEmail(formData.platformProfile.email)) {
                    setFieldError('platformProfile.email', 'Please enter a valid email address');
                    hasErrors = true;
                }
                
                if (!formData.platformProfile.phoneNumber.trim()) {
                    setFieldError('platformProfile.phoneNumber', 'Public phone number is required');
                    hasErrors = true;
                }
            }

            return !hasErrors;
        }

        if (step === 3) {
            if (!formData.address.street.trim()) {
                setFieldError('address.street', 'Street address is required');
                hasErrors = true;
            }
            if (!formData.address.country) {
                setFieldError('address.country', 'Please select a country');
                hasErrors = true;
            }
            if (!formData.address.state) {
                setFieldError('address.state', 'Please select a state');
                hasErrors = true;
            }
            if (!formData.address.postalCode.trim()) {
                setFieldError('address.postalCode', 'Postal code is required');
                hasErrors = true;
            }

            if (!sameAsAddress) {
                if (!formData.billingAddress.street.trim()) {
                    setFieldError('billingAddress.street', 'Street address is required');
                    hasErrors = true;
                }
                if (!formData.billingAddress.country) {
                    setFieldError('billingAddress.country', 'Please select a country');
                    hasErrors = true;
                }
                if (!formData.billingAddress.state) {
                    setFieldError('billingAddress.state', 'Please select a state');
                    hasErrors = true;
                }
                if (!formData.billingAddress.postalCode.trim()) {
                    setFieldError('billingAddress.postalCode', 'Postal code is required');
                    hasErrors = true;
                }
            }

            if (!turnstileToken) {
                setServerError("Please complete the security verification below.");
                hasErrors = true;
            }

            return !hasErrors;
        }

        return true;
    }, [formData, sameAsAddress, turnstileToken, useRegistrationContact, setFieldError, setServerError, clearAllErrors]);

    // Count field errors for a given step
    const stepErrorCount = useCallback((step: number, fieldErrors: FieldErrors): number => {
        if (step === 1) {
            const step1Fields = ['legalName', 'name', 'industry', 'companySize', 'ownerName', 'ownerEmail', 'phoneNumber', 'billingEmail'];
            return step1Fields.filter(f => fieldErrors[f]).length;
        }
        if (step === 2) {
            return Object.keys(fieldErrors).filter(k => k.startsWith('platformProfile.')).length;
        }
        if (step === 3) {
            return Object.keys(fieldErrors).filter(k => k.startsWith('address.') || k.startsWith('billingAddress.')).length;
        }
        return 0;
    }, []);

    return { validateStep, stepErrorCount };
};
