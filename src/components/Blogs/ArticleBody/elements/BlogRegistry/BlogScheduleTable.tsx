"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, CreditCard, Monitor, Building2, ExternalLink, Loader2 } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useIpLocation } from "@/hooks/useIpLocation";
import { mapToInstitute, mapToSchedule } from "@/lib/scheduleMapper";
import { Institute, Schedule } from "@/types/schedules";

/* ─── Styles scoped to this widget ────────────────────────────────── */
const styles: Record<string, any> = {
    wrapper: {
        margin: "3rem 0",
        width: "100%",
    } as React.CSSProperties,

    heading: {
        fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
        fontWeight: 700,
        color: "#0f172a",
        lineHeight: 1.3,
    } as React.CSSProperties,

    subtitle: {
        fontSize: "0.9rem",
        color: "#64748b",
        marginTop: "0.5rem",
        maxWidth: 640,
        lineHeight: 1.6,
    } as React.CSSProperties,

    accent: {
        width: 48,
        height: 4,
        borderRadius: 4,
        background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
        marginTop: 12,
        marginBottom: 24,
    } as React.CSSProperties,

    tableContainer: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
    } as React.CSSProperties,

    scrollArea: {
        overflowX: "auto" as const,
        WebkitOverflowScrolling: "touch" as const,
    } as React.CSSProperties,

    grid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        minWidth: 760,
        width: "100%",
    } as React.CSSProperties,

    headerCell: {
        padding: "14px 20px",
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
        color: "#cbd5e1",
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        whiteSpace: "nowrap" as const,
    } as React.CSSProperties,

    cell: (isEven: boolean) =>
    ({
        padding: "18px 20px",
        background: isEven ? "#ffffff" : "#f8fafc",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        transition: "background 0.15s",
    } as any),

    courseName: {
        fontSize: 15,
        fontWeight: 600,
        color: "#1e293b",
        lineHeight: 1.35,
    } as React.CSSProperties,

    duration: {
        fontSize: 14,
        color: "#475569",
        display: "flex",
        alignItems: "center",
        gap: 6,
    } as React.CSSProperties,

    fees: (isContact: boolean) =>
    ({
        fontSize: 15,
        fontWeight: 700,
        color: isContact ? "#2563eb" : "#0f172a",
    } as any),

    badge: (isOnline: boolean) =>
    ({
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: 999,
        background: isOnline ? "#ecfdf5" : "#eff6ff",
        color: isOnline ? "#047857" : "#1d4ed8",
        border: `1px solid ${isOnline ? "#a7f3d0" : "#bfdbfe"}`,
    } as any),

    dot: (isOnline: boolean) =>
    ({
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: isOnline ? "#10b981" : "#3b82f6",
    } as any),

    button: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
        color: "#ffffff",
        background: "linear-gradient(135deg, #2563eb, #3b82f6)",
        borderRadius: 10,
        textDecoration: "none",
        transition: "all 0.2s",
        boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
    } as React.CSSProperties,

    skeleton: (isEven: boolean) =>
    ({
        padding: "18px 20px",
        background: isEven ? "#ffffff" : "#f8fafc",
        borderBottom: "1px solid #f1f5f9",
    } as any),
};

/* ─── Row Component ───────────────────────────────────────────────── */

function ScheduleRow({ schedule, index }: { schedule: any; index: number }) {

    const isEven = index % 2 === 0;
    const isOnline = schedule.deliveryType?.toLowerCase().includes("online");

    const pricing = schedule.filteredPricing?.[0] || schedule.pricing?.[0];
    const price = pricing
        ? `${pricing.currency.symbol}${(pricing.comparedPrice || pricing.actualPrice)?.toLocaleString()}`
        : "Contact Us";

    return (
        <>
            {/* Institute */}
            <div style={styles.cell(isEven)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {schedule.company?.logo ? (
                        <Image
                            src={schedule.company.logo}
                            alt={schedule.company.name}
                            width={32}
                            height={32}
                            sizes="32px"
                            style={{ width: 32, height: 32, objectFit: "contain", background: "white", border: "1px solid #e2e8f0", padding: 4, borderRadius: 4 }}
                        />
                    ) : (
                        <div style={{ width: 32, height: 32, borderRadius: 4, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#94a3b8", border: "1px solid #e2e8f0" }}>
                            {schedule.company?.name?.[0] || "I"}
                        </div>
                    )}
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>
                        {schedule.company?.name}
                    </span>
                </div>
            </div>

            {/* Date */}
            <div style={styles.cell(isEven)}>
                <span style={styles.duration}>
                    <Calendar size={14} />
                    {schedule.startsAt ? new Date(schedule.startsAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBA"}
                </span>
            </div>

            {/* Fees */}
            <div style={styles.cell(isEven)}>
                <span style={styles.fees(price === "Contact Us")}>{price}</span>
            </div>

            {/* Training Mode */}
            <div style={styles.cell(isEven)}>
                <span style={styles.badge(isOnline)}>
                    <span style={styles.dot(isOnline)} />
                    {schedule.deliveryType || "Classroom"}
                </span>
            </div>

            {/* Action */}
            <div style={styles.cell(isEven)}>
                <Link
                    href={`/companies/${schedule.company?.slug || ''}`}
                    style={styles.button}
                >
                    Enroll Now
                    <ExternalLink size={12} />
                </Link>
            </div>
        </>
    );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export default function BlogScheduleTable({ blog }: { blog: any }) {
    const courses = blog?.marketCourses;
    if (!courses || courses.length === 0) return null;

    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [schedulesByTenant, setSchedulesByTenant] = useState<Record<string, Schedule[]>>({});
    const [loading, setLoading] = useState(true);
    const { data: locationData, loading: locationLoading } = useIpLocation();

    useEffect(() => {
        const processData = (data: any) => {
            // Process Tenants
            const fetchedInstitutes: Institute[] = (data.tenants || []).map((tenant: any, index: number) =>
                mapToInstitute(tenant, index)
            );

            const instituteMap = fetchedInstitutes.reduce((acc, inst) => {
                acc[inst.id] = inst;
                return acc;
            }, {} as Record<string, Institute>);

            // Process Schedules
            const groupedSchedules: Record<string, Schedule[]> = {};
            (data.data || []).forEach((sch: any) => {
                if (!groupedSchedules[sch.tenantId]) {
                    groupedSchedules[sch.tenantId] = [];
                }

                const institute = instituteMap[sch.tenantId];
                const companyData = institute ? {
                    id: institute.id,
                    name: institute.name,
                    logo: institute.logo,
                    isVerified: institute.isVerified,
                    rating: institute.rating,
                    slug: institute.slug as string
                } : {
                    id: sch.tenantId,
                    name: "Unknown",
                    logo: "",
                    isVerified: undefined,
                    rating: undefined,
                    slug: ""
                };

                const mappedSchedule = mapToSchedule(sch, companyData, locationData);
                groupedSchedules[sch.tenantId].push(mappedSchedule);
            });

            // Sort institutes by sponsored/rank
            fetchedInstitutes.sort((a, b) => {
                const aSchedules = groupedSchedules[a.id] || [];
                const bSchedules = groupedSchedules[b.id] || [];
                const aSponsored = aSchedules.some(s => s.isFeatured) ? 1 : 0;
                const bSponsored = bSchedules.some(s => s.isFeatured) ? 1 : 0;

                if (aSponsored !== bSponsored) return bSponsored - aSponsored;
                return a.rank - b.rank;
            });

            setInstitutes(fetchedInstitutes);
            setSchedulesByTenant(groupedSchedules);
            setLoading(false);
        };

        const fetchData = async (signal: AbortSignal) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append('slug', selectedCourse.slug);
                if (locationData?.timezone) params.append('timezone', locationData.timezone);
                if (locationData?.currency) params.append('currency', locationData.currency);

                const response = await fetch(`/api/schedules?${params.toString()}`, { signal });
                if (!response.ok) throw new Error("Failed to fetch schedules");

                const data = await response.json();
                processData(data);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching schedules for blog:", error);
                }
            } finally {
                if (!signal?.aborted) setLoading(false);
            }
        };

        let abortFn: (() => void) | undefined;
        if (selectedCourse?.slug && !locationLoading) {
            const controller = new AbortController();
            abortFn = () => controller.abort();
            fetchData(controller.signal);
        }

        return () => {
            if (abortFn) abortFn();
        };
    }, [selectedCourse.slug, locationData, locationLoading]);

    const allSchedules = useMemo(() => {
        return Object.values(schedulesByTenant).flat().sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return (a.rank || 999) - (b.rank || 999);
        });
    }, [schedulesByTenant]);

    return (
        <div style={styles.wrapper}>
            {/* Tabs Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", marginBottom: 32 }}>
                <div id="course-tabs" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 8, padding: "8px 0", overflowX: "auto", scrollBehavior: "smooth" }} className="no-scrollbar">
                    {courses.map((item: any, index: number) => {
                        if (!item) return null;
                        const isSelected = selectedCourse?.slug === item.slug;
                        const courseName = item.course_title || item.course_name;

                        return (
                            <button
                                key={item._id || index}
                                style={{
                                    display: "flex",
                                    whiteSpace: "nowrap",
                                    alignItems: "center",
                                    padding: "10px 24px",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    borderRadius: 999,
                                    transition: "all 0.3s",
                                    border: `1px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                                    background: isSelected ? "#2563eb" : "white",
                                    color: isSelected ? "white" : "#64748b",
                                    boxShadow: isSelected ? "0 4px 12px rgba(37, 99, 235, 0.2)" : "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => setSelectedCourse(item)}
                            >
                                {courseName}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                    <h2 style={styles.heading}>
                        {selectedCourse.course_title || selectedCourse.course_name} Schedules
                    </h2>
                    <p style={styles.subtitle}>
                        Upcoming batch schedules for {selectedCourse.course_title || selectedCourse.course_name}.
                        Compare dates, fees, and training modes across different institutes.
                    </p>
                    <div style={styles.accent} />
                </div>

                {/* Table Container */}
                <div style={styles.tableContainer}>
                    <div style={styles.scrollArea}>
                        <div style={styles.grid}>
                            {/* Header Row */}
                            {["Institute", "Date", "Fees", "Training Mode", "Action"].map((label, i) => (
                                <div key={i} style={styles.headerCell}>{label}</div>
                            ))}

                            {/* Data Rows */}
                            {loading ? (
                                Array.from({ length: 15 }).map((_, i) => (
                                    <div key={i} style={styles.skeleton(Math.floor(i / 5) % 2 === 0)}>
                                        <Skeleton className="h-5 w-full" />
                                    </div>
                                ))
                            ) : allSchedules.length > 0 ? (
                                allSchedules.map((schedule, idx) => (
                                    <ScheduleRow key={schedule.id || idx} schedule={schedule} index={idx} />
                                ))
                            ) : (
                                <div style={{ gridColumn: "span 5", padding: "48px 20px", textAlign: "center" }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#94a3b8" }}>
                                        <Calendar className="w-10 h-10 opacity-20" />
                                        <p style={{ fontSize: 14, fontWeight: 500 }}>No upcoming batches found for this course.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
