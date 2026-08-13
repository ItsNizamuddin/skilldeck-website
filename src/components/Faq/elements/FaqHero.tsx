import { HelpCircle, Search } from 'lucide-react';

interface FaqHeroProps {
    searchQuery: string;
    onSearch: (query: string) => void;
}

export default function FaqHero({ searchQuery, onSearch }: FaqHeroProps) {
    return (
        <section className="pt-24 lg:pt-40 pb-10 px-4 lg:px-0 relative overflow-hidden">
            <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl" />

            <div className="container mx-auto text-center relative z-10">
                <div className="badge-brand mb-6">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                </div>
                <h1 className="heading-hero mb-4">
                    Frequently Asked{' '}
                    <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                        Questions
                    </span>
                </h1>
                <p className="body-large mb-8">
                    Find quick answers to common questions about Skilldeck
                </p>

                {/* Search Box */}
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-slate-900 placeholder-slate-400 shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
