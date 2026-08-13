const stats = [
    { value: "10K+", label: "Target Companies" },
    { value: "100+", label: "Built-in Features" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
];

export default function AboutStats() {
    return (
        <section className="container mx-auto py-12 px-4 lg:px-0 bg-gray-50/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="heading-section font-black bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent mb-2">
                            {stat.value}
                        </div>
                        <div className="body-medium font-medium text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
