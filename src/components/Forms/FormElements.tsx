import { ChevronDown } from 'lucide-react';
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClassName?: string;
    error?: string;
    icon?: React.ElementType;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    containerClassName = "",
    className = "",
    error,
    icon: Icon,
    ...props
}) => (
    <div className={containerClassName}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                className={`w-full ${Icon ? 'pl-11' : 'px-4'} py-3 rounded-lg border focus:ring-2 transition-all outline-none text-gray-900 text-sm bg-white hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                    ${error
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    } ${className}`}
                {...props}
            />
        </div>
        {error && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        )}
    </div>
);

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    containerClassName?: string;
    error?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    containerClassName = "",
    className = "",
    error,
    ...props
}) => (
    <div className={containerClassName}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all outline-none text-gray-900 text-sm bg-white hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                ${error
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                } ${className}`}
            rows={4}
            {...props}
        />
        {error && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        )}
    </div>
);

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    containerClassName?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    children,
    containerClassName = "",
    className = "",
    ...props
}) => (
    <div className={containerClassName}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 
                    focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none 
                    text-gray-900 text-sm appearance-none bg-white hover:border-gray-300 
                    disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
    </div>
);