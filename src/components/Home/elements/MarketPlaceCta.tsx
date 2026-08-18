import Image from "next/image";
import Link from "next/link";
import ctaImage from "../../../../public/ui-elemants/cta.png";

const MarketPlaceCta = () => {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-2 xl:px-0">
                <div className="relative bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none" />

                    <div className="absolute bottom-0 right-52 xl:right-40 w-28 md:w-36 lg:w-60 pointer-events-none hidden md:block">
                        <Image
                            src={ctaImage}
                            alt="Woman indicating free signup"
                            width={240}
                            height={320}
                            className="w-full h-auto object-contain object-bottom drop-shadow-xl"
                            style={{ height: 'auto' }}
                        />
                    </div>

                    <div className="relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 gap-6 z-10">
                        {/* Text Content */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="heading-section2 text-white mb-2">
                                Marketplace Signup is <span
                                    className="bg-clip-text text-transparent font-extrabold inline-block"
                                    style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                >Completely Free Forever!</span>
                            </h3>
                            <p className="body-small text-slate-300 max-w-lg">
                                Join our marketplace platform at no cost. Simply register to start using all marketplace features today.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="shrink-0">
                            <Link
                                href="/register"
                                className="relative z-20 inline-flex items-center justify-center px-6 py-3 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] hover:brightness-110 body-small font-semibold text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 lg:mr-14"
                            >
                                Register Now Free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketPlaceCta;
