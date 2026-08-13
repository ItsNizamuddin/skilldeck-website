import Link from "next/link";

export default function AboutCta() {
    return (
        <section className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-3xl p-8 lg:p-12 text-center text-white shadow-xl shadow-brand-primary/10">
                    <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-4">Ready to Transform Your Training Business?</h2>
                    <p className="text-sm lg:text-base text-white/80 mb-8 max-w-xl mx-auto">
                        Join thousands of training companies already using Skilldeck to automate their operations.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center bg-white text-brand-primary px-8 py-3 lg:py-4 rounded-lg text-base font-semibold transition hover:bg-gray-50 shadow-md"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-3 lg:py-4 rounded-lg text-base font-semibold transition hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
