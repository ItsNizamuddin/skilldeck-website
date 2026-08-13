"use client";

import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 lg:px-0">
            <div className="container mx-auto max-w-2xl text-center">
                {/* 500 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[180px] md:text-[240px] font-bold text-slate-100 leading-none select-none">
                        500
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30">
                            <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="heading-section mb-4">Server Error</h1>
                <p className="body-large text-slate-600 mb-8 max-w-md mx-auto">
                    Something went wrong on our end. We&apos;re working on fixing it. Please try again in a few moments.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button
                        type="button"
                        data-no-loader="true"
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md shadow-brand-primary/25"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </Link>
                </div>

                {/* Support Section */}
                <div className="border-t border-slate-200 pt-8">
                    <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Mail className="w-5 h-5 text-slate-500" />
                            <span className="body-small text-slate-600">If the problem persists, contact us</span>
                        </div>
                        <Link
                            href="/contact-us"
                            className="text-brand-primary hover:underline font-semibold body-small"
                        >
                            Get Support →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
