import React from 'react';
import BlogLoadMoreSkeleton from '@/components/Utils/BlogLoadMoreSkeleton';

const BlogGridSkeleton = () => {
    return (
        <div className="container mx-auto px-4 lg:px-0 mb-6 lg:mb-20">
            <div className="md:py-10">
                <div className="lg:grid lg:grid-cols-12 items-center mb-8">
                    <div className="col-span-4 flex flex-col justify-center gap-y-1">
                        <div className="w-16 h-4 bg-gray-100 animate-pulse rounded-full" />
                        <div className="w-64 h-8 bg-gray-50 animate-pulse rounded-full mt-2" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={i > 0 ? "hidden sm:block" : ""}>
                            <BlogLoadMoreSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogGridSkeleton;
