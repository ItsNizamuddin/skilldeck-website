"use client";

import { MenuItem } from "@/components/ui/navbar-menu";
import { ArrowRight, BookOpen, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseCardData {
    courseIcon?: {
        url: string;
        alt: string;
    };
}

interface CategoryCourse {
    slug: string;
    order?: number;
    course_name: string;
    courseCard?: CourseCardData;
}

interface CategoryWithCourses {
    _id: string;
    name: string;
    slug: string;
    courses: CategoryCourse[];
    order?: number;
}

export default function NavCategoriesDropdown({
    initialCategories = [],
    active,
    setActive
}: {
    initialCategories?: CategoryWithCourses[],
    active: string | null,
    setActive: (item: string | null) => void
}) {
    const [activeCategory, setActiveCategory] = useState<CategoryWithCourses | null>(null);
    const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
    const pathname = usePathname();

    const sortedCategories = [...initialCategories].sort((a, b) => (a.order || 0) - (b.order || 0));

    useEffect(() => {
        if (sortedCategories.length > 0 && !activeCategory) {
            setActiveCategory(sortedCategories[0]);
        }
    }, [sortedCategories, activeCategory]);

    useEffect(() => {
        setLoadingTarget(null);
        setActive(null);
    }, [pathname, setActive]);

    return (
        <MenuItem setActive={setActive} active={active} item="Courses" centered>
            <div className="w-[85vw] max-w-5xl h-[500px] bg-white rounded-xl overflow-hidden grid grid-cols-12 border border-slate-100 shadow-xl">
                {/* Left Sidebar: Categories */}
                <div className="col-span-12 lg:col-span-3 border-r border-slate-100 bg-slate-50/50 px-2 pt-4 pb-2 flex flex-col h-full">
                    <div className="px-2 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Browse by Domain
                    </div>

                    <div className="h-[430px] overflow-y-auto space-y-2 pr-2 pb-6 custom-scrollbar">
                        {sortedCategories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setActiveCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group
                                ${activeCategory?._id === cat._id
                                        ? "bg-white shadow-sm text-blue-600 ring-1 ring-slate-200/60"
                                        : "text-slate-600 hover:bg-white hover:text-blue-500"
                                    }
                            `}
                            >
                                <span className="truncate text-black">{cat.name}</span>
                                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeCategory?._id === cat._id
                                    ? "text-blue-600 translate-x-0 opacity-100"
                                    : "translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-slate-400"
                                    }`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Content: Course Grid */}
                <div className="col-span-12 lg:col-span-9 bg-white overflow-y-auto custom-scrollbar">
                    {activeCategory ? (
                        <div className="h-full flex flex-col">
                            {/* Sticky Header */}
                            <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl text-slate-900 leading-tight">
                                                {activeCategory.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-0.5">Explore our top-rated courses</p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/${activeCategory.slug}`}
                                        onClick={() => setLoadingTarget(`explore-${activeCategory.slug}`)}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all group shrink-0"
                                    >
                                        Explore All
                                        {loadingTarget === `explore-${activeCategory.slug}` ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        )}
                                    </Link>
                                </div>
                            </div>

                            {/* Course List */}
                            <div className="px-6 pb-6">
                                <div className="grid grid-cols-1 gap-3">
                                    {activeCategory.courses && activeCategory.courses.length > 0 ? (
                                        [...activeCategory.courses]
                                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                                            .map((course, idx) => (
                                                <Link
                                                    key={course.slug || idx}
                                                    href={`/${activeCategory.slug}/${course.slug}`}
                                                    onClick={() => setLoadingTarget(course.slug)}
                                                    className="flex flex-col gap-1 py-1 px-3 rounded-2xl border border-slate-200 mt-2 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm transition-all group"
                                                >
                                                    <div className="flex items-center justify-between gap-3 w-full">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                                                {course.courseCard?.courseIcon?.url ? (
                                                                    <Image
                                                                        src={course.courseCard.courseIcon.url}
                                                                        alt={course.course_name}
                                                                        width={24}
                                                                        height={24}
                                                                        className="object-contain group-hover:scale-110 transition-transform"
                                                                    />
                                                                ) : (
                                                                    <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-slate-800 font-semibold group-hover:text-blue-600 transition-colors line-clamp-1">
                                                                {course.course_name}
                                                            </span>
                                                        </div>
                                                        <div className="ml-auto shrink-0 flex items-center">
                                                            {loadingTarget === course.slug ? (
                                                                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                                            ) : (
                                                                <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                    ) : (
                                        <div className="col-span-full h-full flex flex-col items-center justify-center py-20 text-slate-300">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                <BookOpen className="w-8 h-8 opacity-20" />
                                            </div>
                                            <p className="text-sm font-medium">Coming Soon</p>
                                            <p className="text-xs mt-1">We're currently curating new courses for this domain.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                            <div className="text-center">
                                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                <p>Select a domain to explore courses</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MenuItem>
    );
}
