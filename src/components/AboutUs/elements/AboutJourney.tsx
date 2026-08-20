const milestones = [
    { year: "2020", event: "Founded with a vision to transform training company operations" },
    { year: "2021", event: "Launched our first LMS product for training institutes" },
    { year: "2022", event: "Expanded with marketing automation and CRM solutions" },
    { year: "2023", event: "Reached training institutes across multiple geographies" },
    { year: "2024", event: "Launched AI-powered features for enhanced automation" },
    { year: "2025", event: "Building towards our 10,000 training institutes goal" },
];

export default function AboutJourney() {
    return (
        <section className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="heading-section mb-4">Our Journey</h2>
                    <p className="body-large">Key milestones in our growth story</p>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 inline-block max-w-sm">
                                        <div className="text-xl lg:text-2xl font-black bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent mb-2">{milestone.year}</div>
                                        <p className="body-medium text-gray-600">{milestone.event}</p>
                                    </div>
                                </div>
                                <div className="w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-md relative z-10 flex-shrink-0" />
                                <div className="flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
