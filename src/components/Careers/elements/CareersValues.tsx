import { Heart, Target, Users, Award } from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: 'Customer First',
        description: 'Every decision we make starts with how it will benefit our customers.',
        color: 'from-rose-400 to-pink-600'
    },
    {
        icon: Target,
        title: 'Innovation',
        description: 'We continuously push boundaries to deliver cutting-edge solutions.',
        color: 'from-blue-400 to-indigo-600'
    },
    {
        icon: Users,
        title: 'Collaboration',
        description: 'We believe great things happen when we work together.',
        color: 'from-emerald-400 to-teal-600'
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'We strive for excellence in everything we create and deliver.',
        color: 'from-amber-400 to-orange-600'
    },
];

export default function CareersValues() {
    return (
        <section className="py-12 lg:py-20 px-4 lg:px-0">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="heading-section mb-4">Our Values</h2>
                    <p className="body-large">
                        The principles that guide everything we do
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                                <value.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="heading-card mb-2">{value.title}</h3>
                            <p className="body-small text-slate-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
