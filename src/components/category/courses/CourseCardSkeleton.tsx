import React from "react";

interface CourseCardSkeletonProps {
    className?: string;
}

export function CourseCardSkeleton({ className = "" }: CourseCardSkeletonProps) {
    return (
        <div className={`bg-white border border-gray-100 rounded-2xl p-4 space-y-3 h-[380px] animate-pulse flex flex-col justify-between ${className}`}>
            {/* Badges */}
            <div className="flex gap-2">
                <div className="h-5 w-20 bg-slate-100 rounded-full" />
                <div className="h-5 w-24 bg-slate-100 rounded-full" />
            </div>
            {/* Provider Name */}
            <div className="space-y-1.5 py-1">
                <div className="h-3.5 w-1/2 bg-slate-100 rounded" />
                <div className="h-2.5 w-1/3 bg-slate-100 rounded" />
            </div>
            {/* Logo Banner Slot */}
            <div className="h-[100px] border border-slate-100/50 rounded-xl bg-slate-50 flex items-center justify-center">
                <div className="h-6 w-24 bg-slate-100 rounded" />
            </div>
            {/* Date & Price */}
            <div className="grid grid-cols-2 gap-4 py-1.5 border-y border-slate-50">
                <div className="space-y-1.5">
                    <div className="h-2.5 w-12 bg-slate-100 rounded" />
                    <div className="h-3.5 w-20 bg-slate-100 rounded" />
                </div>
                <div className="space-y-1.5">
                    <div className="h-2.5 w-16 bg-slate-100 rounded" />
                    <div className="h-3.5 w-24 bg-slate-100 rounded" />
                </div>
            </div>
            {/* CTA Button */}
            <div className="h-10 bg-slate-100 rounded-xl w-full" />
        </div>
    );
}

export default CourseCardSkeleton;
