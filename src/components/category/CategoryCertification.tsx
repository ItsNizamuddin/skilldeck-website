import { Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import OpenModalButton from '../ui/OpenModalButton';

export default function CategoryCertification() {
    return (
        <section className="bg-slate-950 text-white py-16 lg:py-24 relative overflow-hidden">
            {/* Soft glowing details */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto  px-2 lg:px-0 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-16 max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-1.5 border border-purple-500/20 text-purple-300 mb-2 shadow-sm">
                        <Award className="w-3.5 h-3.5" />
                        <span className="text-xs font-black tracking-widest uppercase">Verified Certification</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
                        Global Agile Certifications
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
                        Boost your career with in-demand Agile Management credentials. Stand out with globally recognized certifications validated by leading industry bodies.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Benefits & CTA */}
                    <div className="lg:col-span-6 space-y-5">
                        <ul className="space-y-4">
                            {[
                                "Get certified by top global bodies",
                                "Train with industry-leading experts",
                                "Flexible learning schedule",
                                "Affordable EMI options available"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full p-1 flex items-center justify-center w-6 h-6 text-emerald-400">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs md:text-sm text-slate-300 font-semibold">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-4">
                            <OpenModalButton
                                config={{ source: 'category_cert_connect', formTitle: 'Connect With Us' }}
                                className="bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-2 px-8 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md shadow-white/5"
                            >
                                Connect With Us
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </OpenModalButton>
                            <p className="text-xs text-slate-500 ml-2 font-medium">Have queries? Speak to our advisors directly</p>
                        </div>
                    </div>

                    {/* Right Column: Certificate Image */}
                    <div className="lg:col-span-6 w-full flex justify-center">
                        <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md p-4 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                                <Image
                                    src="/category/cat-cert.png"
                                    alt="Certificate of Achievement"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
