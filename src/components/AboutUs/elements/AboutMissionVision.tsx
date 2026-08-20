import { Globe, Target } from "lucide-react";

export default function AboutMissionVision() {
    return (
        <section className="py-12 px-4 lg:px-0">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white rounded-2xl p-5 2xl:p-8 shadow-xl border border-gray-100">
                        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-2xl flex items-center justify-center mb-4">
                            <Globe className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                        </div>
                        <h2 className="heading-section2 mb-4">Our Vision</h2>
                        <p className="body-medium text-gray-600">
                            To provide the platform to as many training institutes as possible and support with
                            tech and marketing automation, handling all kinds of customization while making their
                            marketing, tech, and operations investment less expensive, with the highest return on investment.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 2xl:p-8 text-white shadow-xl">
                        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                            <Target className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                        </div>
                        <h2 className="heading-section2 text-white mb-4">Our Mission</h2>
                        <p className="body-medium text-gray-300">
                            Help at least 10,000 institutes in the next 3 years with the most affordable solution
                            in the market and to be recognized as the most affordable tech solution ever and forever.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
