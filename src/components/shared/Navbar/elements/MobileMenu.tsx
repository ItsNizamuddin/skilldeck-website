"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, ChevronDown, Layers, Layout, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import mainLogo from "../../../../../public/logos/mainlogo.svg";
import { aboutLinks, mobileNavLinks, services } from "./navConfig";

interface MobileMenuProps {
    isMenuOpen: boolean;
    closeMenu: () => void;
    ctaText: string;
    categories: any[];
    isHomePage: boolean;
    isCompaniesLoading: boolean;
    handleCompaniesClick: () => void;
    handleNavClick: (e: React.MouseEvent, sectionId: string | null) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    isMenuOpen,
    closeMenu,
    ctaText,
    categories,
    isHomePage,
    isCompaniesLoading,
    handleCompaniesClick,
    handleNavClick,
}) => {
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

    const sortedCategories = [...categories]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(cat => ({
            ...cat,
            courses: [...(cat.courses || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
        }));

    return (
        <div
            className={cn(
                "fixed inset-0 lg:hidden transition-all duration-500",
                isMenuOpen ? "visible pointer-events-auto" : "invisible pointer-events-none delay-500"
            )}
            style={{ zIndex: 9999 }}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/60 transition-opacity duration-500 ease-in-out",
                    isMenuOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Panel Drawer */}
            <div
                className={cn(
                    "absolute top-0 right-0 w-full h-full bg-white shadow-2xl overflow-hidden flex flex-col transition-transform duration-500 ease-in-out",
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
                    <Link href="/" onClick={closeMenu}>
                        <Image src={mainLogo} alt="Logo" width={100} height={32} className="h-7 w-auto" style={{ width: 'auto', height: 'auto' }} />
                    </Link>
                    <button
                        type="button"
                        data-no-loader="true"
                        onClick={closeMenu}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="p-4">
                        {/* Services Accordion */}
                        <div className="mb-1">
                            <button
                                type="button"
                                data-no-loader="true"
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className="w-full flex items-center justify-between py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <span className="text-[15px] font-medium">Services</span>
                                <ChevronDown className={cn(
                                    "w-4 h-4 text-gray-500 transition-transform duration-200",
                                    mobileServicesOpen && "rotate-180"
                                )} />
                            </button>

                            {mobileServicesOpen && (
                                <div className="mt-1 border-l-2 border-blue-100 space-y-1">
                                    <Link
                                        href="/services"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-3 py-2.5 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Layers className="w-4 h-4" />
                                        <span>All Services</span>
                                    </Link>
                                    {services.map((service) => (
                                        <Link
                                            key={service.name}
                                            href={service.href}
                                            onClick={closeMenu}
                                            className="flex items-center gap-2 px-3 py-2.5 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <service.icon className="w-4 h-4" />
                                            <span>{service.name}</span>
                                        </Link>
                                    ))}
                                    <Link
                                        href="/services/marketplace"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-3 py-2.5 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <ShoppingCart className="w-4 h-4 text-purple-600" />
                                        <span>Marketplace</span>
                                    </Link>
                                    <Link
                                        href="/web-templates"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-3 py-2.5 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Layout className="w-4 h-4" />
                                        <span>Web Templates</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Courses Accordion */}
                        <div className="mb-1">
                            <button
                                type="button"
                                data-no-loader="true"
                                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                                className="w-full flex items-center justify-between py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <span className="text-[15px]">Courses</span>
                                <ChevronDown className={cn(
                                    "w-4 h-4 text-gray-500 transition-transform duration-200",
                                    mobileCoursesOpen && "rotate-180"
                                )} />
                            </button>

                            {mobileCoursesOpen && (
                                <div className="mt-1 pl-3 border-l-2 border-blue-100 space-y-1">
                                    {sortedCategories.map((category, catIdx) => (
                                        <div key={category._id} className="flex flex-col">
                                            <button
                                                type="button"
                                                data-no-loader="true"
                                                onClick={() => setOpenCategoryIndex(openCategoryIndex === catIdx ? null : catIdx)}
                                                className="flex items-start justify-between w-full py-2 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <span className="text-start font-semibold">{category.name}</span>
                                                <ChevronDown className={cn(
                                                    "w-3 h-3 transition-transform duration-200",
                                                    openCategoryIndex === catIdx && "rotate-180"
                                                )} />
                                            </button>

                                            {openCategoryIndex === catIdx && (
                                                <div className="mt-1 space-y-1 border-l border-slate-100">
                                                    {category.courses && category.courses.length > 0 ? (
                                                        category.courses.map((course: any) => (
                                                            <Link
                                                                key={course.slug}
                                                                href={`/${category.slug}/${course.slug}`}
                                                                onClick={closeMenu}
                                                                className="flex items-center gap-3 py-2 text-xs pl-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-start"
                                                            >
                                                                <div className="relative w-7 h-7 shrink-0 flex items-center justify-center bg-slate-50 rounded-lg">
                                                                    {course.courseCard?.courseIcon?.url ? (
                                                                        <Image
                                                                            src={course.courseCard.courseIcon.url}
                                                                            alt={course.course_name}
                                                                            width={18}
                                                                            height={18}
                                                                            className="object-contain"
                                                                            style={{ width: 'auto', height: 'auto' }}
                                                                        />
                                                                    ) : (
                                                                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                                                    )}
                                                                </div>
                                                                {course.course_name}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <span className="block px-4 py-2 text-xs text-slate-400 italic">Coming Soon</span>
                                                    )}
                                                    <Link
                                                        href={`/${category.slug}`}
                                                        onClick={closeMenu}
                                                        className="block px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        View All in {category.name}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Custom Navigation Links */}
                        {mobileNavLinks.map((link) => {
                            const isCompanies = link.name === "Companies";
                            const targetHref = isCompanies ? "/companies" : (isHomePage ? `#${link.sectionId}` : link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={targetHref}
                                    onClick={(e) => {
                                        if (isCompanies) {
                                            handleCompaniesClick();
                                        } else {
                                            handleNavClick(e, link.sectionId);
                                        }
                                    }}
                                    className="block py-3 text-gray-800 text-[15px] font-medium hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <span className="relative inline-block">
                                        {link.name}
                                        {isCompanies && isCompaniesLoading && (
                                            <span className="absolute -bottom-1 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full w-full" />
                                        )}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* About Accordion */}
                        <div className="mt-1">
                            <button
                                type="button"
                                data-no-loader="true"
                                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                className="w-full flex items-center justify-between py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <span className="text-[15px]">About</span>
                                <ChevronDown className={cn(
                                    "w-4 h-4 text-gray-500 transition-transform duration-200",
                                    mobileAboutOpen && "rotate-180"
                                )} />
                            </button>

                            {mobileAboutOpen && (
                                <div className="mt-1 ml-3 pl-3 border-l-2 border-blue-100 space-y-1">
                                    {aboutLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={closeMenu}
                                            rel="nofollow"
                                            className="block px-3 py-2.5 text-gray-600 text-sm hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
                    <Button
                        as={Link}
                        href="/register"
                        onClick={closeMenu}
                        variant="primary"
                        size="md"
                        className="w-full flex items-center justify-center gap-2"
                        rel="nofollow"
                    >
                        {ctaText}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

MobileMenu.displayName = "MobileMenu";
