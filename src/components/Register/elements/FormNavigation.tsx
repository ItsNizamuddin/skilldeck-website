import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    isSubmitting: boolean;
    onNext: () => void;
    onPrev: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
    currentStep,
    totalSteps,
    isSubmitting,
    onNext,
    onPrev
}) => {
    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {currentStep > 1 ? (
                <button
                    type="button"
                    onClick={onPrev}
                    className="bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Back
                </button>
            ) : (
                <div /> // Spacer
            )}

            {currentStep < totalSteps ? (
                <button
                    type="button"
                    onClick={onNext}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-7 py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 group transform active:scale-[0.97]"
                >
                    Continue
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white px-8 py-3 rounded-lg font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2.5 transition-all transform active:scale-[0.97]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4.5 h-4.5 animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Complete Registration
                            <CheckCircle2 className="w-4.5 h-4.5" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};
