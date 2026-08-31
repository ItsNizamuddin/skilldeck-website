import { CheckCircle, Mail, MessageSquare, Phone, UserCheck } from 'lucide-react';
import OpenModalButton from '../ui/OpenModalButton';

export default function CategoryContact() {
    return (
        <section className="container mx-auto max-w-7xl px-2 lg:px-0 my-12 md:my-20">
            <div className="bg-slate-950 border border-slate-800/80 rounded-[2rem] p-8 lg:p-12 shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative overflow-hidden">
                {/* Glowing Accent Orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Left Side: Advisor Details */}
                <div className="lg:col-span-7 space-y-8 relative z-10 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-3.5 py-1 border border-purple-500/20 text-purple-300 shadow-sm">
                            <UserCheck className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Connect with Advising Team</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 bg-purple-600/10 flex items-center justify-center font-black text-xl text-purple-300 shadow-lg shadow-purple-500/5">
                                R
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black leading-tight text-white">Speak with Regina</h3>
                                <p className="text-slate-400 text-xs md:text-sm font-semibold">Our Dedicated Learning Advisor</p>
                            </div>
                        </div>
                    </div>

                    <ul className="space-y-3.5">
                        {[
                            "Global reach across 30+ countries",
                            "Trusted by Fortune 500 institutes",
                            "Addressed 25k+ Queries",
                            "99.9% responds immediately"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                                <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full p-1 flex items-center justify-center w-6 h-6 text-emerald-400">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <span className="text-slate-300">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4">
                        <OpenModalButton
                            config={{ source: 'category_contact', formTitle: 'Connect Now' }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg shadow-purple-600/20"
                        >
                            Connect Now
                        </OpenModalButton>
                    </div>
                </div>

                {/* Right Side: Quick Action Contact Grids */}
                <div className="lg:col-span-5 bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white/5 space-y-4 relative z-10 flex flex-col justify-center">
                    <h4 className="text-base md:text-lg font-bold text-white mb-2">Get in Touch</h4>

                    <a href="tel:+918296494941" className="block group">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Call Us</p>
                                <p className="font-bold text-xs md:text-sm text-white">+91 8296494941</p>
                            </div>
                        </div>
                    </a>

                    <a href="mailto:hello@skilldeck.net" className="block group">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Email Us</p>
                                <p className="font-bold text-xs md:text-sm text-white">hello@skilldeck.net</p>
                            </div>
                        </div>
                    </a>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all duration-300">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-300">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Live Chat</p>
                            <p className="font-bold text-xs md:text-sm text-white">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
