import { IBlogAuthor, IBlogCategory, IBlogs } from '@/types/interface-lib';
import { ChevronRight, Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import defaultCardImg from '../../../../../public/blogs/default.svg';
import defaultImg from '../../../../../public/blogs/defaultProfile.png';

const getAuthorInfo = (author: string | IBlogAuthor | undefined | null) => {
    if (!author || typeof author === 'string') {
        return { name: 'Unknown Author', photo: defaultImg };
    }

    let photoUrl: any = defaultImg;
    if (author.photo) {
        if (typeof author.photo === 'string' && author.photo.trim() !== "") {
            photoUrl = author.photo;
        } else if (typeof author.photo === 'object') {
            const photoObj = author.photo as any;
            photoUrl = photoObj.url || photoObj.thumbnail || defaultImg;
        }
    }

    return {
        name: author.name || 'Unknown Author',
        photo: photoUrl
    };
};

const getCategoryName = (category: string | IBlogCategory | undefined | null) => {
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

interface BlogCardProps {
    blog: IBlogs;
    priority?: boolean;
}

const getThumbnailUrl = (thumbnail: any) => {
    if (!thumbnail || thumbnail === "") return defaultCardImg;
    if (typeof thumbnail === 'string') return thumbnail;
    if (typeof thumbnail === 'object') return thumbnail.url || thumbnail.thumbnail || defaultCardImg;
    return defaultCardImg;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, priority = false }) => {
    if (!blog) return null;

    const author = getAuthorInfo(blog.author);
    const category = (blog as any).category || (blog as any).marketplaceCategory;
    const categoryName = getCategoryName(category);

    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-[0_15px_30px_rgba(92,63,250,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full"
        >
            {/* Blog Cover Image container */}
            <div className="relative w-full aspect-[1.8] overflow-hidden bg-slate-50 flex-shrink-0">
                <Image
                    src={getThumbnailUrl(blog.thumbnail)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    alt={blog.title}
                />

                {/* Translucent category overlay */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white rounded shadow-sm border border-slate-700/30">
                        {categoryName}
                    </span>
                </div>
            </div>

            {/* Details section */}
            <div className="p-4 md:p-4.5 flex flex-col flex-1">
                {/* Meta stats */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                        <Eye className="w-3 h-3 text-indigo-500" />
                        <span>{Math.floor(Number(blog.views || 0))} Views</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <div className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                        <Clock className="w-3 h-3 text-indigo-500" />
                        <span>{getMonthsAgo(blog.createdAt)}</span>
                    </div>
                </div>

                {/* Title and description */}
                <h4 className="text-sm md:text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug mb-1.5">
                    {blog.title}
                </h4>
                <p className="text-slate-500 text-[11px] md:text-xs line-clamp-2 leading-relaxed flex-1 mb-4">
                    {blog.smallDescription}
                </p>

                {/* Author profile and link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image
                                src={author.photo}
                                fill
                                className="rounded-full object-cover border border-slate-100 shadow-sm"
                                alt={author.name}
                            />
                        </div>
                        <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{author.name}</p>
                    </div>

                    <div className="text-indigo-600 font-extrabold text-[10px] uppercase tracking-wider inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                        Read <ChevronRight className="w-3 h-3 stroke-[3] route-loader-target" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
