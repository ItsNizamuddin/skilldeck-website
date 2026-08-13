interface Props { services: string[] }

// Server Component
export default function CompanyServicesCard({ services }: Props) {
    if (!services || services.length === 0) return null;

    return (
        <div id="training-areas" className="pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Training Areas</p>
            <div className="flex flex-wrap gap-2">
                {services.map((s, i) => (
                    <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors cursor-default"
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}
