import React from "react";

interface CourseCardSkeletonProps {
    className?: string;
}

export function CourseCardSkeleton({ className = "" }: CourseCardSkeletonProps) {
    return (
        <div className={`bg-white border border-gray-100 rounded-2xl p-4 space-y-3 animate-pulse flex flex-col justify-between ${className}`}>
            {/* Badges */}
            <div className="flex gap-2">
                <div className="h-5 w-20 bg-slate-100 rounded-full" />
                <div className="h-5 w-24 bg-slate-100 rounded-full" />
            </div>

            {/* Provider Name */}
            <div className="space-y-1.5 py-1">
                <div className="h-4 w-1/2 bg-slate-100 rounded" />
                <div className="h-3 w-1/3 bg-slate-100 rounded" />
            </div>

            {/* Banner Slot */}
            <div className="h-[188px] rounded-lg bg-slate-100 flex items-center justify-center w-full" />

            {/* Date & Fee */}
            <div className="flex justify-center items-center gap-6 py-1">
                <div className="h-8 w-24 bg-slate-100 rounded" />
                <div className="w-0.5 h-8 bg-slate-200" />
                <div className="h-8 w-24 bg-slate-100 rounded" />
            </div>

            {/* Mode / Sessions / Days */}
            <div className="grid grid-cols-3 gap-2">
                <div className="h-12 bg-slate-100 rounded-xl" />
                <div className="h-12 bg-slate-100 rounded-xl" />
                <div className="h-12 bg-slate-100 rounded-xl" />
            </div>

            {/* Ratings */}
            <div className="grid grid-cols-2 gap-3 py-1">
                <div className="h-8 bg-slate-100 rounded" />
                <div className="h-8 bg-slate-100 rounded" />
            </div>

            {/* CTA Button */}
            <div className="h-11 bg-slate-100 rounded-xl w-full" />
        </div>
    );
}

export default CourseCardSkeleton;
