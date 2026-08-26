import { PricingPlan } from "@/lib/plans";
import dynamic from 'next/dynamic';
import FAQ from "../shared/FAQ";
import BuiltForTrainers from "./elements/BuiltForTrainers";
import GameChanger from "./elements/GameChanger";
import HeroSection from "./elements/HeroSection";
import ProvenExperience from "./elements/ProvenExperience";
import SkilldSolution from "./elements/SkilldSolution";
import TheProblem from "./elements/TheProblem";

// Lazy-load heavy components below the fold for mobile performance (maintains SSR for SEO)
const WhatYouGet = dynamic(() => import('./elements/WhatYouGet'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-50" />,
    ssr: true
});

const DemoSection = dynamic(() => import('./elements/DemoSection'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-900" />,
    ssr: true
});

const RecentProjects = dynamic(() => import('./elements/RecentProjects'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-50" />,
    ssr: true
});

const BookADemo = dynamic(() => import('./elements/BookADemo'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-white" />,
    ssr: true
});

interface HomeProps {
    plans?: PricingPlan[];
    faqs?: { title: string; value: string }[];
}

const Home = ({ plans = [], faqs = [] }: HomeProps) => {
    return (
        <div className="flex flex-col gap-0 overflow-hidden w-full">
            <HeroSection />

            <WhatYouGet plans={plans} />

            <DemoSection />

            <TheProblem />

            <SkilldSolution />

            <ProvenExperience />

            <GameChanger />

            <BuiltForTrainers />

            <RecentProjects />

            <BookADemo />

            {faqs && faqs.length > 0 && (
                <div className="pt-10" id="faqs">
                    <FAQ items={faqs} />
                </div>
            )}

        </div>
    );
};

export default Home;
