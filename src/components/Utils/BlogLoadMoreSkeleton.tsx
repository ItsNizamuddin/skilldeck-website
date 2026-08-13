import React from 'react';

const BlogLoadMoreSkeleton = () => {
    return (
        <div className=" ">
            {[...Array(1)].map((_, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="w-full h-40 md:h-62 lg:h-64 bg-gray-300 rounded-md" />
                    <div className=" flex gap-2 items-center mt-2 md:mt-4 ">
                        <div className="w-20 h-4 bg-gray-300 rounded-md" />
                        <div className="w-20 h-4 bg-gray-300 rounded-md" />
                    </div>
                    <div className="my-2 md:my-3">
                        <div className="w-3/4 h-4 bg-gray-300 rounded-md" />
                        <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-2" />
                    </div>
                    <div className="w-full h-16 bg-gray-300 rounded-md" />
                    <div className="flex items-center gap-3 mt-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        <div className="w-20 h-4 bg-gray-300 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogLoadMoreSkeleton;
