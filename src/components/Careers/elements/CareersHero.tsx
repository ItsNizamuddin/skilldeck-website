import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CareersHero() {
    return (
        <section className="pt-16 lg:pt-32 pb-12 lg:pb-0 px-4 lg:px-0 relative overflow-hidden">
            <div className="absolute top-20 left-0 w-125 h-125 bg-linear-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-150 h-150 bg-linear-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl" />

            <div className="container mx-auto text-center relative z-10">
                <div className="badge-brand mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Our Team
                </div>

                <h1 className=" text-3xl lg:text-5xl font-bold mb-1">
                    Build the Future of{' '}
                    <span className="block mt-2 pb-1 md:pb-3 bg-linear-to-r from-brand-primary via-purple-600 to-brand-secondary bg-clip-text text-transparent">
                        Ed-Tech
                    </span>
                </h1>
                <p className="body-medium max-w-2xl mx-auto mb-4">
                    Join a passionate team dedicated to transforming how training businesses operate.
                    We&apos;re always looking for talented individuals to join our mission.
                </p>

                <Link
                    href="mailto:hello@skilldeck.net"
                    className="inline-flex items-center justify-center gap-2 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-8 py-3 text-sm rounded-xl font-semibold hover:opacity-95 transition-opacity shadow-md shadow-brand-primary/25"
                >
                    View Open Positions
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
