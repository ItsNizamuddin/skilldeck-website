import { Globe, Instagram, Link as LinkIcon, Linkedin, Twitter, Users, Youtube } from 'lucide-react';
import React from 'react';
import { FormInput, FormTextArea } from '../../Forms/FormElements';
import { FieldErrors } from '../hooks/useRegisterForm';

interface PlatformProfileStepProps {
    platformProfile: {
        description: string;
        shortDescription: string;
        website: string;
        email: string;
        phoneNumber: string;
        linkedin: string;
        twitter: string;
        instagram: string;
        youtube: string;
        trainingAreas: string[];
    };
    useRegistrationContact: boolean;
    fieldErrors: FieldErrors;
    onChange: (field: string, value: any) => void;
    onToggleUseRegistrationContact: (checked: boolean) => void;
}

export const PlatformProfileStep: React.FC<PlatformProfileStepProps> = ({
    platformProfile,
    useRegistrationContact,
    fieldErrors,
    onChange,
    onToggleUseRegistrationContact
}) => {
    return (
        <div className="space-y-6">
            {/* General Info */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Platform Profile</h2>
                        <p className="text-sm text-gray-500">How you'll appear on the marketplace</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <FormTextArea
                        label="Company Description"
                        name="description"
                        value={platformProfile.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        placeholder="Tell us about your organization..."
                        error={fieldErrors['platformProfile.description']}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormInput
                            label="Short Description"
                            name="shortDescription"
                            value={platformProfile.shortDescription}
                            onChange={(e) => onChange('shortDescription', e.target.value)}
                            placeholder="A quick one-liner"
                            error={fieldErrors['platformProfile.shortDescription']}
                        />
                        <FormInput
                            label="Website"
                            name="website"
                            icon={Globe}
                            value={platformProfile.website}
                            onChange={(e) => onChange('website', e.target.value)}
                            placeholder="https://example.com"
                            error={fieldErrors['platformProfile.website']}
                        />
                    </div>
                </div>
            </div>

            {/* Public Contact Details */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Public Contact Details</h2>
                            <p className="text-sm text-gray-500">Contact information shown to users</p>
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group select-none bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={useRegistrationContact}
                                onChange={(e) => onToggleUseRegistrationContact(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                            Same as Registration Contact
                        </span>
                    </label>
                </div>

                {!useRegistrationContact && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <FormInput
                            label="Public Email"
                            name="email"
                            type="email"
                            value={platformProfile.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            placeholder="support@example.com"
                            error={fieldErrors['platformProfile.email']}
                            required
                        />
                        <FormInput
                            label="Public Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={platformProfile.phoneNumber}
                            onChange={(e) => onChange('phoneNumber', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            error={fieldErrors['platformProfile.phoneNumber']}
                            required
                        />
                    </div>
                )}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <LinkIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Social Links</h2>
                        <p className="text-sm text-gray-500">Connect your community</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput
                        label="LinkedIn"
                        name="linkedin"
                        icon={Linkedin}
                        value={platformProfile.linkedin}
                        onChange={(e) => onChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/company/..."
                        error={fieldErrors['platformProfile.linkedin']}
                    />
                    <FormInput
                        label="Twitter"
                        name="twitter"
                        icon={Twitter}
                        value={platformProfile.twitter}
                        onChange={(e) => onChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                        error={fieldErrors['platformProfile.twitter']}
                    />
                    <FormInput
                        label="Instagram"
                        name="instagram"
                        icon={Instagram}
                        value={platformProfile.instagram}
                        onChange={(e) => onChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/..."
                        error={fieldErrors['platformProfile.instagram']}
                    />
                    <FormInput
                        label="YouTube"
                        name="youtube"
                        icon={Youtube}
                        value={platformProfile.youtube}
                        onChange={(e) => onChange('youtube', e.target.value)}
                        placeholder="https://youtube.com/c/..."
                        error={fieldErrors['platformProfile.youtube']}
                    />
                </div>
            </div>
        </div>
    );
};
