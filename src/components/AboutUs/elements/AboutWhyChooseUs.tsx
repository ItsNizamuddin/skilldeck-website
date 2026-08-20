import { Heart, Lightbulb, Zap } from "lucide-react";

export default function AboutWhyChooseUs() {
    return (
        <section className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="heading-section mb-4">Why Training Institutes Choose Us</h2>
                    <p className="body-large">The most affordable high-performing solution in the market</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="heading-card mb-3">Built for Trainers</h3>
                        <p className="body-medium">Designed specifically for training institutes and trainers who conduct live classes.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lightbulb className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="heading-card mb-3">Less Expensive</h3>
                        <p className="body-medium">The most affordable tech solution that doesn&apos;t compromise on features or performance.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="heading-card mb-3">High ROI</h3>
                        <p className="body-medium">Focus on your core operations while we handle all tech and marketing automation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
