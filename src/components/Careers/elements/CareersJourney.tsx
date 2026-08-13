import { Calendar } from 'lucide-react';

const milestones = [
    { year: '2019', title: 'Company Founded', description: 'Started with a vision to simplify training business operations' },
    { year: '2020', title: 'First 100 Clients', description: 'Achieved our first milestone of serving 100 training companies' },
    { year: '2021', title: 'Platform Expansion', description: 'Launched LMS, CRM, and marketing automation modules' },
    { year: '2022', title: '10,000+ Users', description: 'Reached 10,000 active users across our platform' },
    { year: '2023', title: 'Global Reach', description: 'Expanded to serve clients in 50+ countries' },
    { year: '2024', title: 'AI Integration', description: 'Introduced AI-powered automation and chatbot features' },
];

export default function CareersJourney() {
    return (
        <section className="py-20 px-4 lg:px-0 bg-slate-900">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="heading-section text-white mb-4">Our Journey</h2>
                    <p className="body-large text-slate-400">
                        From a small startup to a global platform
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-700" />
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            <div className="hidden md:block flex-1" />
                            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center z-10 flex-shrink-0">
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div className={`flex-1 bg-slate-800 rounded-xl p-4 md:p-6 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <span className="text-brand-primary font-bold">{milestone.year}</span>
                                <h3 className="heading-card text-white mt-1">{milestone.title}</h3>
                                <p className="body-small text-slate-400 mt-2">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
