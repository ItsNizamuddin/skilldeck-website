import { Building2, Users, Globe, TrendingUp } from 'lucide-react';

const stats = [
    { value: '500+', label: 'Happy Clients', icon: Building2 },
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '50+', label: 'Countries', icon: Globe },
    { value: '99.9%', label: 'Uptime', icon: TrendingUp },
];

export default function CareersStats() {
    return (
        <section className="py-12 lg:py-16 px-4 lg:px-0 bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat: any, index: number) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-blue-50 rounded-xl mb-4">
                                <stat.icon className="w-6 h-6 text-brand-primary" />
                            </div>
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="body-small text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
