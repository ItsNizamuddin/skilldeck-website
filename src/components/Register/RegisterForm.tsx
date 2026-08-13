"use client";
import { ICountry } from '@/types/interface-lib';
import { AnimatePresence, motion } from 'framer-motion';
import { Building, MapPin, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AddressBillingStep } from './elements/AddressBillingStep';
import { FormNavigation } from './elements/FormNavigation';
import { FormStepper } from './elements/FormStepper';
import { OrganizationDetails } from './elements/OrganizationDetails';
import { PlatformProfileStep } from './elements/PlatformProfileStep';
import { RegistrationSuccess } from './elements/RegistrationSuccess';
import { useFormValidation } from './hooks/useFormValidation';
import { useLocationData } from './hooks/useLocationData';
import { AddressData, useRegisterForm } from './hooks/useRegisterForm';

interface RegisterFormProps {
    countries: ICountry[];
}

const STEPS = [
    { number: 1, title: "Organization & Contact", icon: Building },
    { number: 2, title: "Platform Profile", icon: Users },
    { number: 3, title: "Address & Billing", icon: MapPin },
];

const STEP_ANIMATION = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 40 : -40, opacity: 0 }),
};

const RegisterForm: React.FC<RegisterFormProps> = ({ countries: initialCountries }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [serverError, setServerError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const searchParams = useSearchParams();
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        if (searchParams) {
            const ref = searchParams.get('ref');
            if (ref) {
                setReferralCode(ref);
            }
        }
    }, [searchParams]);

    const {
        formData, sameAsAddress, useRegistrationContact, isSubmitting, setIsSubmitting,
        fieldErrors, setFieldError, clearAllErrors,
        handleInputChange, handleAddressInputChange, handlePlatformProfileChange,
        toggleSameAsAddress, toggleUseRegistrationContact, updateAddressField, updateBillingField, setTimezone,
    } = useRegisterForm();

    const {
        countries,
        loadingCountries,
        searchCountries,
    } = useLocationData(initialCountries);

    const { validateStep, stepErrorCount } = useFormValidation({
        formData, sameAsAddress, turnstileToken, useRegistrationContact,
        setFieldError, setServerError, clearAllErrors,
    });

    const handleAddressFieldUpdate = (field: keyof AddressData, value: string) => {
        updateAddressField(field, value);
        if (field === 'country') {
            const country = countries.find(c => c.iso2 === value || c.name === value);
            if (country?.timezones?.[0]?.zone) {
                setTimezone(country.timezones[0].zone);
            }
        }
    };

    // ── Navigation ──

    const syncContactData = () => {
        if (useRegistrationContact) {
            handlePlatformProfileChange('email', formData.ownerEmail);
            handlePlatformProfileChange('phoneNumber', formData.phoneNumber);
        }
    };

    const nextStep = () => {
        syncContactData();
        if (validateStep(currentStep)) {
            setDirection(1);
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Submit ──

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        syncContactData();

        if (!validateStep(STEPS.length)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);
        setServerError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    turnstileToken,
                    referralCode: referralCode || undefined
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || 'Registration failed');
            }

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Registration Error:', error);
            setServerError(error instanceof Error ? error.message : 'Something went wrong');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Render ──

    if (isSuccess) {
        return <RegistrationSuccess email={formData.ownerEmail} />;
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <FormStepper
                steps={STEPS}
                currentStep={currentStep}
                fieldErrors={fieldErrors}
                stepErrorCount={stepErrorCount}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Server Error Banner */}
                {serverError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2.5"
                    >
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        {serverError}
                    </motion.div>
                )}

                <AnimatePresence mode="wait" custom={direction}>
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={STEP_ANIMATION}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <OrganizationDetails
                                formData={formData}
                                handleInputChange={handleInputChange}
                                fieldErrors={fieldErrors}
                            />
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={STEP_ANIMATION}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <PlatformProfileStep
                                platformProfile={formData.platformProfile}
                                useRegistrationContact={useRegistrationContact}
                                fieldErrors={fieldErrors}
                                onChange={handlePlatformProfileChange}
                                onToggleUseRegistrationContact={toggleUseRegistrationContact}
                            />
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            custom={direction}
                            variants={STEP_ANIMATION}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <AddressBillingStep
                                formData={formData}
                                sameAsAddress={sameAsAddress}
                                fieldErrors={fieldErrors}
                                countries={countries}
                                loadingCountries={loadingCountries}
                                onAddressInputChange={(e, field) => handleAddressInputChange(e, field, false)}
                                onBillingInputChange={(e, field) => handleAddressInputChange(e, field, true)}
                                updateAddressField={handleAddressFieldUpdate}
                                updateBillingField={updateBillingField}
                                onCountrySearch={searchCountries}
                                onToggleSameAsAddress={toggleSameAsAddress}
                                handleInputChange={handleInputChange}
                                onTurnstileVerify={(token) => setTurnstileToken(token)}
                                onTurnstileError={() => setTurnstileToken(null)}
                                onTurnstileExpire={() => setTurnstileToken(null)}
                                referralCode={referralCode}
                                setReferralCode={setReferralCode}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={STEPS.length}
                    isSubmitting={isSubmitting}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            </form>
        </div>
    );
};

export default RegisterForm;
