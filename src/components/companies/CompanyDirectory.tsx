"use client";

import { Company } from "@/types";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchInput from "./SearchInput";

interface CompanyDirectoryProps {
    regularCompanies: Company[];
    totalRegular: number;
    totalPages: number;
    page: number;
    fp: number;
    search?: string;
}

export default function CompanyDirectory({
    regularCompanies,
    totalRegular,
    totalPages,
    page,
    fp,
    search = ""
}: CompanyDirectoryProps) {
    const router = useRouter();
    const [mobileIndex, setMobileIndex] = useState(0);
    const prevPageRef = useRef(page);

    // Sync mobileIndex slider placement based on page transitions
    useEffect(() => {
        if (page < prevPageRef.current) {
            // Page decremented, position the slider on the last element of the previous page
            setMobileIndex(Math.max(0, regularCompanies.length - 1));
        } else {
            // Page incremented or search filters changed, reset to first card
            setMobileIndex(0);
        }
        prevPageRef.current = page;
    }, [page, search, regularCompanies.length]);

    const handleMobilePrev = () => {
        if (mobileIndex > 0) {
            setMobileIndex(mobileIndex - 1);
        } else if (page > 1) {
            const prevPage = page - 1;
            router.push(`/companies?page=${prevPage}&fp=${fp}${search ? `&search=${encodeURIComponent(search)}` : ""}#all-providers`, { scroll: false });
        }
    };

    const handleMobileNext = () => {
        if (mobileIndex < regularCompanies.length - 1) {
            setMobileIndex(mobileIndex + 1);
        } else if (page < totalPages) {
            const nextPage = page + 1;
            router.push(`/companies?page=${nextPage}&fp=${fp}${search ? `&search=${encodeURIComponent(search)}` : ""}#all-providers`, { scroll: false });
        }
    };

    return (
        <div id="all-providers" className="mt-6">
            {/* Heading Group Panel */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-2 gap-4">
                <div>
                    <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-3 py-1 rounded-full">
                        All Institutes
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 leading-tight">
                        Browse verified training companies
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Filter by city, specialism, fee band and placement record. Add up to four to compare.
                    </p>
                </div>

                {/* <div className="shrink-0 flex items-center">
                    <Link
                        href="/companies/compare"
                        className="px-4.5 h-11 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-xs md:text-sm flex items-center gap-2 shadow-sm transition group"
                    >
                        Open comparison
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                </div> */}
                {/* Server-Side Search input */}
                <div className="mb-5">
                    <SearchInput />
                </div>
            </div>


            {/* Results Grid / Fallback */}
            {regularCompanies.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 max-w-xl mx-auto">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900">No training companies found</h3>
                    <p className="text-slate-500 mt-1.5 text-sm">
                        {search ? `No results matching "${search}". Please try a different query.` : "Please check back later."}
                    </p>
                </div>
            ) : (
                <>
                    {/* Companies listing label */}
                    <div className="flex items-center justify-between mb-5 px-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {search ? `Search results for "${search}"` : "All training providers"}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                            {totalRegular} {totalRegular === 1 ? "company" : "companies"} listed
                        </span>
                    </div>

                    {/* Desktop View: Grid of 3 Cards */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {regularCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>

                    {/* Mobile View: 1 Card Carousel */}
                    {(() => {
                        const safeMobileIndex = Math.min(mobileIndex, Math.max(0, regularCompanies.length - 1));
                        return (
                            <div className="block md:hidden mb-8">
                                <div className="mb-6">
                                    <CompanyCard company={regularCompanies[safeMobileIndex]} />
                                </div>
                                {/* Mobile Navigation Controls */}
                                <div className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                                    <button
                                        onClick={handleMobilePrev}
                                        disabled={page === 1 && mobileIndex === 0}
                                        className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="text-xs font-semibold text-slate-700">
                                        {safeMobileIndex + 1} of {regularCompanies.length} on Page {page}
                                    </span>
                                    <button
                                        onClick={handleMobileNext}
                                        disabled={page === totalPages && mobileIndex === regularCompanies.length - 1}
                                        className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Desktop Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
                            <Link
                                href={`/companies?page=${Math.max(1, page - 1)}&fp=${fp}${search ? `&search=${encodeURIComponent(search)}` : ""}#all-providers`}
                                className={`p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all ${page === 1 ? "pointer-events-none opacity-40" : ""
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <span className="text-sm font-medium text-slate-700 px-4">
                                Page {page} of {totalPages}
                            </span>
                            <Link
                                href={`/companies?page=${Math.min(totalPages, page + 1)}&fp=${fp}${search ? `&search=${encodeURIComponent(search)}` : ""}#all-providers`}
                                className={`p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all ${page === totalPages ? "pointer-events-none opacity-40" : ""
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
