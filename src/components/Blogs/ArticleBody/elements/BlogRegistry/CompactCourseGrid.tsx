"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoveRight, Star, Calendar } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";


interface CourseCardProps {
    course: any;
}

function CourseCard({ course }: CourseCardProps) {
    const courseName = course.course_name || course.course_title;
    const tagline = course.courseCard?.tagline || course.short_description || "Professional certification training program.";
    const rating = 4.8; // Fallback or from data
    const reviews = 124; // Fallback or from data

    return (
        <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            {/* Top Accent/Category */}
            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                    {course.category_name || "Professional"}
                </span>
            </div>

            {/* Course Content */}
            <div className="p-8 flex flex-col h-full">
                <div className="flex-1 space-y-4">
                    {/* Header: Title & Rating */}
                    <div>
                        <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                            ))}
                            <span className="text-[10px] font-bold text-slate-400 ml-1">({reviews} reviews)</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {courseName}
                        </h4>
                    </div>

                    {/* Tagline/Description */}
                    <p className="text-sm text-slate-500 leading-relaxed max-w-xs line-clamp-3">
                        {tagline}
                    </p>

                    {/* Features/Highlights */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                <Calendar className="w-2.5 h-2.5 text-blue-500" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600">Upcoming Batches</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                                <Star className="w-2.5 h-2.5 text-emerald-500" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600">Certified Trainers</span>
                        </div>
                    </div>
                </div>

                {/* Footer: CTA */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <Link
                        href={`/${course.category_slug || 'course'}/${course.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all duration-300 group/btn shadow-md hover:shadow-blue-200"
                    >
                        Explore Program
                        <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CourseSkeleton() {
    return (
        <div className="h-full bg-white rounded-3xl border border-slate-100 p-8 space-y-6 animate-pulse">
            <div className="space-y-3">
                <Skeleton className="h-3 w-16 rounded-full" />
                <div className="flex gap-1"><Skeleton className="h-3 w-3" /><Skeleton className="h-3 w-3" /><Skeleton className="h-3 w-3" /></div>
                <Skeleton className="h-8 w-full rounded-xl" />
                <Skeleton className="h-8 w-2/3 rounded-xl" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-5/6 rounded" />
                <Skeleton className="h-3 w-4/6 rounded" />
            </div>
            <div className="flex gap-4 pt-4">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <div className="pt-6 border-t border-slate-50">
                <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
        </div>
    );
}

interface CompactCourseGridProps {
    courses?: any[];
    loading?: boolean;
}

const CARDS_PER_PAGE = 2;

export default function CompactCourseGrid({ courses, loading = false }: CompactCourseGridProps) {
    const [page, setPage] = useState(0);

    // If loading or and we don't have courses yet, show skeleton
    if (loading || (!courses && courses !== undefined)) {
        return (
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <CourseSkeleton />
                <CourseSkeleton />
            </div>
        );
    }

    if (!courses || courses.length === 0) return null;

    const totalPages = Math.ceil(courses.length / CARDS_PER_PAGE);
    const start = page * CARDS_PER_PAGE;
    const visibleCourses = courses.slice(start, start + CARDS_PER_PAGE);
    const showPagination = courses.length > CARDS_PER_PAGE;

    return (
        <div className="my-12">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visibleCourses.map((course, idx) => (
                    <CourseCard key={start + idx} course={course} />
                ))}
            </div>

            {/* Professional Pagination Controlled UI */}
            {showPagination && (
                <div className="flex items-center justify-between gap-4 mt-12 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="flex items-center gap-2 pr-6 pl-4 py-3 rounded-2xl bg-white text-slate-700 font-bold text-xs uppercase tracking-widest border border-slate-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                    </button>

                    {/* Simple Dot Indicators */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${i === page
                                    ? "w-8 bg-blue-600 shadow-sm shadow-blue-200"
                                    : "w-2 bg-slate-300 hover:bg-slate-400"
                                    }`}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="flex items-center gap-2 pl-6 pr-4 py-3 rounded-2xl bg-white text-slate-700 font-bold text-xs uppercase tracking-widest border border-slate-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
