import { Award, Monitor, Settings, Sparkles, TrendingUp, Users } from "lucide-react";

const features = [
    { icon: Settings, title: "Tech Automation", description: "Automate tech tasks across departments" },
    { icon: TrendingUp, title: "Marketing Automation", description: "Streamline your marketing efforts" },
    { icon: Users, title: "Operations Support", description: "Support for operations teams" },
    { icon: Monitor, title: "Sales Enablement", description: "Tools to boost your sales team" },
];

export default function AboutContent() {
    return (
        <section className=" py-12 lg:py-24 px-4 lg:px-0 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl" />

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="badge-brand text-xs font-semibold mb-6">
                            <Sparkles className="w-4 h-4 mr-2" />
                            World-Class Platform
                        </div>

                        <h2 className="heading-section mb-4 leading-tight">
                            Built Exclusively for
                            <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent"> Training Companies</span>
                        </h2>

                        <p className="body-medium mb-6">
                            Skilldeck is a world-class, mature platform with multiple built-in features to support
                            your <span className="font-semibold text-brand-dark">tech, marketing, operations, and sales</span> teams.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/30 rounded-2xl p-6 border border-blue-100/50 lg:mb-8">
                            <p className="body-medium text-gray-700">
                                <span className="font-bold text-brand-primary">The only less expensive, high-performing solution</span> for
                                training companies with hundreds of features to automate tech needs across departments.
                                Focus on your <span className="italic">core operations and delivery</span> while we handle the rest.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - First in Training Space */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl p-6 2xl:p-8 shadow-xl border border-gray-100 relative z-10">
                            <div className="absolute top-0 left-8 right-8 h-1 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-b-full" />

                            <div className="flex items-center gap-4 mb-4 lg:pt-4">
                                <div className="w-12 h-12 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-2xl flex items-center justify-center shadow-md">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="heading-card">First in Training Space</h3>
                                    <p className="body-small text-brand-primary font-semibold">Pioneer in the Industry</p>
                                </div>
                            </div>

                            <p className="body-medium text-gray-600 leading-relaxed mb-4">
                                We are proud to build such an amazing platform for the <span className="font-semibold text-brand-dark">first time
                                    in the training space</span> that suits the needs of trainers who conduct live offline/virtual
                                classes across multiple geographies and numerous courses.
                            </p>

                            {/* Feature highlights */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-green-50/50 rounded-xl">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-small font-semibold text-gray-700">Live Classes</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-xl">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-small font-semibold text-gray-700">Virtual Training</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-purple-50/50 rounded-xl">
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-small font-semibold text-gray-700">Multi-Geography</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-xl">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-small font-semibold text-gray-700">Multiple Courses</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-2xl opacity-20 blur-xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl" />
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group flex items-center gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-brand-primary/20"
                        >
                            <div className="w-12 h-12 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="body-medium font-bold text-brand-dark block">{feature.title}</span>
                                <span className="body-extrasmall">{feature.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
