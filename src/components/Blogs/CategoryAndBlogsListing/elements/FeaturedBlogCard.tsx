import React from 'react';
import { Clock, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import defaultImg from '../../../../../public/blogs/defaultProfile.png';
import defaultCardImg from '../../../../../public/blogs/default.svg';

const getAuthorInfo = (author: any) => {
    if (!author || typeof author === 'string') {
        return { name: 'Unknown Author', photo: defaultImg };
    }
    return {
        name: author.name,
        photo: author.photo || defaultImg
    };
};

const getCategoryName = (category: any) => {
    if (!category || typeof category === 'string') return category || 'Uncategorized';
    return category.title || 'Category';
};

const getMonthsAgo = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} months ago`;
};

const getThumbnailUrl = (thumbnail: any) => {
    if (!thumbnail) return defaultCardImg;
    if (typeof thumbnail === 'string') return thumbnail;
    return thumbnail.url || thumbnail.thumbnail || defaultCardImg;
};

interface FeaturedBlogCardProps {
    blog: any;
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ blog }) => {
    if (!blog) return null;

    const author = getAuthorInfo(blog.author);
    const category = blog.category || blog.marketplaceCategory;
    const categoryName = getCategoryName(category);

    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-100 shadow-md hover:shadow-[0_30px_70px_rgba(92,63,250,0.06)] hover:-translate-y-0.5 transition-all duration-500 flex flex-col lg:flex-row min-h-[440px]"
        >
            {/* Image Section */}
            <div className="relative lg:w-[58%] h-64 lg:h-auto overflow-hidden bg-slate-50 flex-shrink-0">
                <Image
                    src={getThumbnailUrl(blog.thumbnail)}
                    fill
                    priority
                    className="object-cover group-hover:scale-101.5 transition-transform duration-1000 ease-in-out"
                    alt={blog.title}
                />
                
                {/* Modern visual gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent hidden lg:block" />

                {/* Sparkling Glassmorphism Badge */}
                <div className="absolute top-5 left-5 z-10">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Top Featured Partner</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-[42%] p-6 lg:p-10 flex flex-col justify-center relative overflow-hidden bg-white">
                {/* Abstract subtle brand glowing orbs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-50/40 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-50/40 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        {/* Meta Category & Date Row */}
                        <div className="flex items-center gap-4 mb-5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50/60 border border-indigo-100/50 px-3 py-1 rounded-full">
                                {categoryName}
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                <span>{getMonthsAgo(blog.createdAt)}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl xl:text-3xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 leading-tight mb-4">
                            {blog.title}
                        </h2>

                        {/* Summary description */}
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-4 lg:line-clamp-5 mb-8">
                            {blog.smallDescription}
                        </p>
                    </div>

                    {/* Author block and CTA action */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                    src={(author.photo as string) || defaultImg}
                                    fill
                                    className="rounded-full object-cover border border-slate-100 shadow-sm"
                                    alt={author.name}
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                                    <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs md:text-sm font-extrabold text-slate-800 truncate">{author.name}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Verified Contributor</p>
                            </div>
                        </div>

                        {/* Premium CTA text link */}
                        <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs md:text-sm group-hover:translate-x-1 transition-transform duration-300">
                            Read Article
                            <ChevronRight className="w-4 h-4 stroke-[3] route-loader-target" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedBlogCard;
