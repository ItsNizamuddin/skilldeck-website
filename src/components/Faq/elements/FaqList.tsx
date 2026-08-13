import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
    category: string;
}

interface FaqListProps {
    faqs: FaqItem[];
    openIndex: number | null;
    onToggle: (index: number) => void;
}

export default function FaqList({ faqs, openIndex, onToggle }: FaqListProps) {
    if (faqs.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="heading-card text-slate-900 mb-2">No results found</h3>
                <p className="body-small text-slate-600">Try searching with different keywords</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-primary/30 hover:shadow-sm transition-all duration-200"
                >
                    <button
                        type="button"
                        data-no-loader="true"
                        onClick={() => onToggle(index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className="heading-card text-slate-900 pr-4 font-semibold">
                            {faq.question}
                        </span>
                        <ChevronDown
                            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                                openIndex === index ? 'rotate-180 text-brand-primary' : ''
                            }`}
                        />
                    </button>
                    {openIndex === index && (
                        <div className="px-6 pb-6">
                            <p className="body-medium text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
