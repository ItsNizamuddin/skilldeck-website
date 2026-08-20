import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Sparkles } from 'lucide-react';

const BlogBanner = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Blog' }
    ];
    return (
        <div className='relative bg-[linear-gradient(135deg,#f5f3ff_0%,#eef2ff_50%,#e0e7ff_100%)] border-b border-slate-100 overflow-hidden'>
            {/* Decorative mesh vector details */}
            <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-purple-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-2 py-12 md:py-10 pt-20 md:pt-32 relative z-10">
                {/* Central content */}
                <div className="flex flex-col justify-center items-center gap-5 text-center">
                    {/* Floating pill badge */}
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 rounded-full px-4.5 py-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                        <span className="text-[10px] font-black tracking-wider uppercase text-indigo-700">Insights & Resources</span>
                    </div>

                    {/* Gradient title */}
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-black max-w-4xl text-slate-800 tracking-tight leading-tight">
                        Explore Everything About <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">Ed-tech & Training</span>
                    </h1>

                    {/* Summary text */}
                    <p className='text-slate-500 text-xs md:text-sm 2xl:text-base max-w-3xl leading-relaxed font-medium'>
                        Skilldeck is a leading marketing automation and plug-and-play platform for training institutes, offering zero tech headache and a global presence.
                    </p>

                    {/* Breadcrumbs */}
                    <div className="flex justify-center mt-2">
                        <Breadcrumb items={breadcrumbItems} className='text-slate-500 font-semibold' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogBanner;