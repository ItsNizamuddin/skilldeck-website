import { AlertCircle, Building2, User } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { FormInput } from '../../Forms/FormElements';
import { FieldErrors, FormData } from '../hooks/useRegisterForm';

interface OrganizationDetailsProps {
    formData: FormData;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    fieldErrors: FieldErrors;
}

export const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({
    formData,
    handleInputChange,
    fieldErrors,
}) => {
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleLegalNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e);
        const name = e.target.value;

        // User-provided logic to generate baseSlug
        const baseSlug = name
            .trim()
            .toLowerCase()
            .replace(/\b(pvt|private|ltd|limited|inc|corp|co|company|solutions|technology|technologies|group)\b/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        // Build synthetic event to update 'name' (Subdomain field)
        const syntheticEvent = {
            target: {
                name: 'name',
                value: baseSlug
            }
        } as unknown as ChangeEvent<HTMLInputElement>;

        handleInputChange(syntheticEvent);
    };

    return (
        <div className="space-y-6">
            {/* Company Information Section */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Company Information</h2>
                        <p className="text-sm text-gray-500">Basic details about your organization</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <FormInput
                            label="Registered Company Name"
                            name="legalName"
                            value={formData.legalName}
                            onChange={handleLegalNameChange}
                            placeholder="e.g. Acme Technologies Pvt Ltd"
                            required
                            className={fieldErrors.legalName ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.legalName && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.legalName}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Dashboard Subdomain"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.name ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {formData.name && !fieldErrors.name && (
                            <div className="mt-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100/80">
                                <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5">
                                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                    Your dashboard: <span className="font-bold">{generateSlug(formData.name)}.skilldeck.net</span>
                                </p>
                            </div>
                        )}
                        {fieldErrors.name && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            placeholder="e.g. Education, IT Services, Healthcare"
                            required
                            className={fieldErrors.industry ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.industry && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.industry}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Team Size"
                            name="companySize"
                            type="text"
                            value={formData.companySize.toString()}
                            onChange={(e) => {
                                const cleanValue = e.target.value.replace(/\D/g, '');
                                const numValue = cleanValue ? parseInt(cleanValue, 10) : '';
                                handleInputChange({
                                    target: { name: 'companySize', value: numValue }
                                } as unknown as React.ChangeEvent<HTMLInputElement>);
                            }}
                            required
                            className={fieldErrors.companySize ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.companySize && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.companySize}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Primary Contact Section */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Account Owner</h2>
                        <p className="text-sm text-gray-500">Who will manage this account?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <FormInput
                            label="Full Name"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.ownerName ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.ownerName && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.ownerName}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Work Email"
                            name="ownerEmail"
                            type="email"
                            value={formData.ownerEmail}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.ownerEmail ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.ownerEmail && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.ownerEmail}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            required
                            className={fieldErrors.phoneNumber ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.phoneNumber && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.phoneNumber}
                            </p>
                        )}
                    </div>

                    <div>
                        <FormInput
                            label="Billing Email"
                            name="billingEmail"
                            type="email"
                            value={formData.billingEmail}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.billingEmail ? '!border-red-400 !ring-red-500/20 focus:!border-red-500' : ''}
                        />
                        {fieldErrors.billingEmail && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.billingEmail}
                            </p>
                        )}
                    </div>

                    
                </div>
            </div>
        </div>
    );
};