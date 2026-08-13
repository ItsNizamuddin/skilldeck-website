import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RegistrationSuccessProps {
    email: string;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ email }) => {
    const router = useRouter();

    return (
        <div className="w-full text-center py-12 animate-fade-in-up bg-white p-8 md:p-12 rounded-lg border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">You&apos;re All Set!</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Your organization has been registered successfully. We&apos;ve sent your dashboard credentials to:
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 max-w-sm mx-auto mb-8">
                <p className="font-bold text-blue-700 text-lg break-all">{email}</p>
            </div>
            <p className="text-sm text-gray-400 mb-6">Please check your inbox (and spam folder) to get started.</p>

            <button
                onClick={() => router.push('/')}
                className="text-sm text-gray-400 hover:text-blue-600 transition-colors underline underline-offset-4"
            >
                Return to Home
            </button>
        </div>
    );
};
