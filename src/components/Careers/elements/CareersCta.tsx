import Link from 'next/link';

export default function CareersCta() {
    return (
        <section className="py-20 px-4 lg:px-0">
            <div className="container mx-auto text-center max-w-3xl">
                <h2 className="heading-section mb-4">
                    Ready to Join Us?
                </h2>
                <p className="body-large mb-8">
                    We&apos;re always looking for talented individuals who share our passion for innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="mailto:hello@skilldeck.net"
                        className="inline-flex items-center justify-center bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-95 transition-opacity shadow-md shadow-brand-primary/25"
                    >
                        Send Your Resume
                    </Link>
                    <Link
                        href="/about-us"
                        className="inline-flex items-center justify-center bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Learn About Us
                    </Link>
                </div>
            </div>
        </section>
    );
}
