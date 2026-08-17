import BackButton from '@/components/shared/BackButton';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center px-4 lg:px-0">
            <div className="container mx-auto max-w-2xl text-center">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[100px] md:text-[240px] font-bold text-slate-100 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-full flex items-center justify-center shadow-2xl shadow-brand-primary/30">
                            <Search className="w-16 h-16 md:w-20 md:h-20 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="heading-section mb-4">Page Not Found</h1>
                <p className="body-large text-slate-600 mb-4 lg:mb-8 max-w-md mx-auto">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved to another location.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5 lg:mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md shadow-brand-primary/25"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </Link>
                    <BackButton />
                </div>

                {/* Help Links */}
                <div className="border-t border-slate-200 pt-8">
                    <p className="body-small text-slate-500 mb-4">Need help? Try these:</p>
                    <div className="flex flex-wrap justify-center gap-4 body-small">
                        {/* <Link href="/services" className="text-brand-primary hover:underline font-medium">
                            Browse Services
                        </Link> */}
                        <span className="text-slate-300">•</span>
                        <Link href="/contact-us" className="text-brand-primary hover:underline font-medium">
                            Contact Support
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/about-us" className="text-brand-primary hover:underline font-medium">
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
