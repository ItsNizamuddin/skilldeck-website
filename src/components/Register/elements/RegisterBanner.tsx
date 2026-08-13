"use client";
import { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Zap, TrendingUp } from 'lucide-react';
import logo from '../../../../public/logos/mainlogo.svg';
import Image from 'next/image';


export const RegisterBanner = () => {
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        { icon: Sparkles, text: 'AI-Powered Learning Paths', color: 'text-violet-500' },
        { icon: Zap, text: 'Instant Skill Assessments', color: 'text-amber-500' },
        { icon: TrendingUp, text: 'Real-Time Analytics', color: 'text-emerald-500' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFeature((p) => (p + 1) % features.length);
        }, 2800);
        return () => clearInterval(timer);
    }, []);

    const ActiveIcon = features[currentFeature].icon;

    return (
        <div className="relative text-center mb-2 py-6 lg:py-10 px-4 overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/60 to-pink-50/40 opacity-70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),transparent_60%)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Brand */}
                <div className="inline-flex items-center gap-3 mb-4 lg:mb-6">
                    <Image src={logo} alt="Logo" width={150} height={150} className="w-28 md:w-32 h-auto" style={{ height: 'auto' }} />
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 tracking-tight">
                    Create Your Free Account
                </h1>
                <p className="text-sm lg:text-base text-gray-500 mb-4">
                    No credit card required · Get started in minutes
                </p>

                <div className="relative h-9 mb-3 flex justify-center">
                    <div className="absolute transition-all duration-500 ease-out opacity-100">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100/80 text-sm font-medium text-gray-700">
                            <ActiveIcon className={`w-4 h-4 ${features[currentFeature].color}`} />
                            {features[currentFeature].text}
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        256-bit SSL Encrypted
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-blue-400" />
                        2-Minute Setup
                    </div>
                </div>
            </div>
        </div>
    );
};
