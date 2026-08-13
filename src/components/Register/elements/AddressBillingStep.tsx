import { ICountry } from '@/types/interface-lib';
import { Check, CreditCard, Gift } from 'lucide-react';
import React, { ChangeEvent } from 'react';
import { FormInput } from '../../Forms/FormElements';
import TurnstileWidget from '../../Forms/TurnstileWidget';
import { AddressData, FieldErrors } from '../hooks/useRegisterForm';
import { AddressForm } from './AddressForm';

interface AddressBillingStepProps {
    formData: {
        address: AddressData;
        billingAddress: AddressData;
        timezone: string;
    };
    sameAsAddress: boolean;
    fieldErrors: FieldErrors;

    countries: ICountry[];
    loadingCountries: boolean;

    onAddressInputChange: (e: ChangeEvent<HTMLInputElement>, field: keyof AddressData) => void;
    onBillingInputChange: (e: ChangeEvent<HTMLInputElement>, field: keyof AddressData) => void;
    updateAddressField: (field: keyof AddressData, value: string) => void;
    updateBillingField: (field: keyof AddressData, value: string) => void;
    onCountrySearch: (query: string) => void;

    onToggleSameAsAddress: (checked: boolean) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

    onTurnstileVerify: (token: string) => void;
    onTurnstileError: () => void;
    onTurnstileExpire: () => void;

    referralCode: string;
    setReferralCode: (code: string) => void;
}

export const AddressBillingStep: React.FC<AddressBillingStepProps> = ({
    formData,
    sameAsAddress,
    fieldErrors,
    countries,
    loadingCountries,
    onAddressInputChange,
    onBillingInputChange,
    updateAddressField,
    updateBillingField,
    onCountrySearch,
    onToggleSameAsAddress,
    onTurnstileVerify,
    onTurnstileError,
    onTurnstileExpire,
    referralCode,
    setReferralCode
}) => {
    return (
        <div className="space-y-6">
            {/* Headquarters Address */}
            <AddressForm
                title="Headquarters Address"
                data={formData.address}
                countries={countries}
                loadingCountries={loadingCountries}
                fieldErrors={fieldErrors}
                errorPrefix="address"
                onInputChange={onAddressInputChange}
                onFieldChange={updateAddressField}
                onCountrySearch={onCountrySearch}
            />

            {/* Billing Address Section */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Billing Address</h2>
                            <p className="text-sm text-gray-500">Where should we send invoices?</p>
                        </div>
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                        <input
                            type="checkbox"
                            checked={sameAsAddress}
                            onChange={(e) => onToggleSameAsAddress(e.target.checked)}
                            className="w-4.5 h-4.5 text-blue-600 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                            Same as Headquarters
                        </span>
                    </label>
                </div>

                {sameAsAddress && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 rounded-lg px-4 py-2.5">
                        <Check className="w-4 h-4 text-green-500" />
                        Billing address will match your headquarters address.
                    </div>
                )}

                {!sameAsAddress && (
                    <div className="pt-4 border-t border-gray-100">
                        <AddressForm
                            title=""
                            data={formData.billingAddress}
                            countries={countries}
                            loadingCountries={loadingCountries}
                            iconBgColor="from-emerald-500 to-green-600"
                            fieldErrors={fieldErrors}
                            errorPrefix="billingAddress"
                            onInputChange={onBillingInputChange}
                            onFieldChange={updateBillingField}
                            onCountrySearch={onCountrySearch}
                        />
                    </div>
                )}
            </div>

            {/* Referral Code (Optional) */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Referral Program</h2>
                        <p className="text-sm text-gray-500">Do you have a referral code or signup link? (Optional)</p>
                    </div>
                </div>
                <FormInput
                    label="Referral Code"
                    name="referralCode"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="e.g. REFER-CODE"
                />
            </div>

            {/* Turnstile Captcha */}
            <TurnstileWidget
                onVerify={onTurnstileVerify}
                onError={onTurnstileError}
                onExpire={onTurnstileExpire}
            />
        </div>
    );
};
