"use client";

import { cn } from '@/lib/utils';
import { AlertCircle, Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Country, allCountries } from '@/lib/countryData';

const FlagImage: React.FC<{
    src: string;
    alt: string;
    code: string;
    className?: string;
    width?: number;
    height?: number;
}> = ({ src, alt, code, className, width = 20, height = 15 }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className={cn(
                "flex items-center justify-center bg-gray-100 text-[9px] font-bold text-gray-500 rounded border border-gray-200 uppercase flex-shrink-0 select-none shadow-sm",
                width === 20 ? "w-5 h-4" : "w-5 h-3.5"
            )}>
                {code}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={() => setHasError(true)}
            className={className}
        />
    );
};

export interface PhoneInputProps {
    value?: string;
    countryCode?: string;
    label?: string;
    error?: string;
    isRequired?: boolean;
    disabled?: boolean;
    countries?: Country[];
    onChange?: (value: string, countryCode: string, dialCode: string) => void;
    className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
    value = '',
    countryCode = 'IN',
    label,
    error,
    isRequired,
    disabled,
    countries = allCountries,
    onChange,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
        return countries.find((c) => c.code.toUpperCase() === countryCode.toUpperCase()) || countries[0];
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hasError = !!error;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const country = countries.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
        if (country) {
            setSelectedCountry(country);
        }
    }, [countryCode, countries]);

    // Load country from localStorage if available
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cachedLocation = localStorage.getItem('geoLocation');
            if (cachedLocation) {
                try {
                    const parsed = JSON.parse(cachedLocation);
                    if (parsed.countryCode) {
                        const matched = countries.find(c => c.code.toUpperCase() === parsed.countryCode.toUpperCase());
                        if (matched) {
                            setSelectedCountry(matched);
                            onChange?.(value, matched.code, matched.dialCode);
                        }
                    }
                } catch (e) {
                    console.warn('Failed to parse geoLocation cache', e);
                }
            }
        }
    }, []);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        onChange?.(value, country.code, country.dialCode);
        setIsOpen(false);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        onChange?.(newValue, selectedCountry.code, selectedCountry.dialCode);
    };

    return (
        <div className={cn('w-full', className)}>
            {label && (
                <label className="label text-brand-neutral-7 mb-2 block">
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="flex gap-2">
                {/* Country Selector */}
                <div className="relative flex-shrink-0" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        className={cn(
                            'flex items-center gap-2 px-3 py-2 bg-white border rounded-xl transition-colors h-[38px] md:h-[42px]',
                            'focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary',
                            hasError && 'border-red-500',
                            !hasError && 'border-gray-200 hover:border-gray-300',
                            isOpen && 'ring-2 ring-brand-primary/20 border-brand-primary',
                            disabled && 'bg-gray-100 cursor-not-allowed'
                        )}
                    >
                        {selectedCountry.flag && (
                            <FlagImage
                                src={selectedCountry.flag}
                                alt={selectedCountry.name}
                                code={selectedCountry.code}
                                width={20}
                                height={15}
                                className="w-5 h-4 object-cover shadow-sm rounded-sm"
                            />
                        )}
                        <span className="text-xs md:text-sm text-gray-700 font-medium">{selectedCountry.dialCode}</span>
                        <ChevronDown
                            className={cn(
                                'w-3.5 h-3.5 text-gray-500 transition-transform',
                                isOpen && 'rotate-180'
                            )}
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[220px] max-h-60 overflow-y-auto scroll-bar animate-fade-in">
                            {countries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className={cn(
                                        'w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors',
                                        country.code === selectedCountry.code && 'bg-brand-50'
                                    )}
                                >
                                    {country.flag && (
                                        <FlagImage
                                            src={country.flag}
                                            alt={country.name}
                                            code={country.code}
                                            width={20}
                                            height={15}
                                            className="w-5 h-3.5 object-cover shadow-sm rounded-sm flex-shrink-0"
                                        />
                                    )}
                                    <span className="text-xs font-medium text-gray-700 truncate flex-1">{country.name}</span>
                                    <span className="text-xs text-gray-400">({country.dialCode})</span>
                                    {country.code === selectedCountry.code && (
                                        <Check className="w-3.5 h-3.5 text-brand-600 ml-auto flex-shrink-0" strokeWidth={3} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Phone Number Input */}
                <div className="flex-1 relative">
                    <input
                        type="tel"
                        value={value}
                        onChange={handlePhoneChange}
                        disabled={disabled}
                        placeholder="Phone number"
                        className={cn(
                            'w-full px-4 py-2 md:py-2.5 text-xs md:text-sm  bg-red border rounded-xl text-gray-900 placeholder:text-gray-400 placeholder:text-sm transition-colors h-[38px] md:h-[42px]',
                            'focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary',
                            hasError && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                            !hasError && 'border-gray-200 hover:border-gray-300',
                            disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        )}
                    />
                    {hasError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default PhoneInput;
