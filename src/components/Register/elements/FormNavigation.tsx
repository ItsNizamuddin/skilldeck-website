import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={onPrev}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 gap-2 group cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>Back</span>
                </Button>
            ) : (
                <div /> // Spacer
            )}

            {currentStep < totalSteps ? (
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={onNext}
                    className="px-7 gap-2 group cursor-pointer"
                >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
            ) : (
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="px-8 gap-2.5 cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating Account...</span>
                        </>
                    ) : (
                        <>
                            <span>Complete Registration</span>
                            <CheckCircle2 className="w-4 h-4" />
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};
