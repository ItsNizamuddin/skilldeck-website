import RegisterForm from '@/components/Register/RegisterForm';
import { RegisterBanner } from '@/components/Register/elements/RegisterBanner';
import { fetchCountries } from '@/lib/location';
import { Metadata } from 'next';

import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Create your Free SkillDeck Account | Get Started In Minutes",
    description: "Plug & play platform to automate your training business operations across departments. One Operating system- Worldclass website, LMS, CMS, CRM, Events management, Class management, & 100+ Other features. Alll at the price of your hosting. Register now!",
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RegisterPage() {
    // Fetch countries server-side
    const countries = await fetchCountries();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 font-inter">
            <RegisterBanner />

            <main className="container mx-auto px-2 pb-8 max-w-8xl">
                <Suspense fallback={
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                    </div>
                }>
                    <RegisterForm countries={countries} />
                </Suspense>
            </main>
        </div>
    );
}
