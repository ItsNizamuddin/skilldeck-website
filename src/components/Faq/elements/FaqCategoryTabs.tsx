interface FaqCategoryTabsProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export default function FaqCategoryTabs({ categories, activeCategory, onSelect }: FaqCategoryTabsProps) {
    return (
        <section className="px-4 lg:px-0 pb-8">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            data-no-loader="true"
                            onClick={() => onSelect(category)}
                            className={`px-4 py-2 rounded-full body-small font-medium transition-all ${activeCategory === category
                                    ? 'bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
