import { Check, LucideIcon } from 'lucide-react';
import React from 'react';
import { FieldErrors } from '../hooks/useRegisterForm';

interface Step {
    number: number;
    title: string;
    icon: LucideIcon;
}

interface FormStepperProps {
    steps: Step[];
    currentStep: number;
    fieldErrors: FieldErrors;
    stepErrorCount: (step: number, fieldErrors: FieldErrors) => number;
}

export const FormStepper: React.FC<FormStepperProps> = ({
    steps,
    currentStep,
    fieldErrors,
    stepErrorCount
}) => {
    return (
        <div className="mb-6 bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-center gap-0">
                {steps.map((step, idx) => {
                    const isActive = step.number === currentStep;
                    const isCompleted = step.number < currentStep;

                    return (
                        <React.Fragment key={step.number}>
                            <div className="flex items-center gap-2.5">
                                <div className={`
                                    w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-bold
                                    ${isActive
                                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110'
                                        : isCompleted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 text-gray-400'
                                    }
                                `}>
                                    {isCompleted ? <Check className="w-4.5 h-4.5" /> : step.number}
                                </div>
                                <span className={`text-sm font-semibold hidden sm:inline transition-colors duration-300 ${isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="flex-1 max-w-[80px] mx-4">
                                    <div className="h-[2px] rounded-full bg-gray-100 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500 w-full' : 'bg-gray-100 w-0'
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
