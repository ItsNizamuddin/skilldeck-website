"use client";

import { Check, HelpCircle, Users } from "lucide-react";
import { useMemo } from "react";

interface TargetAudienceProps {
    whoCanAttend?: {
        description?: string;
        roles?: string;
    };
    prerequisites?: string;
}

export const TargetAudience = ({ whoCanAttend, prerequisites }: TargetAudienceProps) => {
    const rolesList = useMemo(() => {
        if (!whoCanAttend?.roles) return [];
        return whoCanAttend.roles
            .split(",")
            .map(r => r.replace(/<[^>]*>/g, " ").trim())
            .filter(Boolean);
    }, [whoCanAttend?.roles]);

    const hasRoles = rolesList.length > 0;
    const hasPrereqs = !!prerequisites && prerequisites.trim().length > 0;

    if (!hasRoles && !hasPrereqs) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Who can attend Box */}
            {hasRoles && (
                <div className="bg-white border border-purple-100/70 rounded-2xl p-4 space-y-2 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-[#101A3D]">Who can attend</h4>
                    </div>

                    {whoCanAttend?.description && (
                        <p className="body-extrasmall text-gray-500 leading-relaxed">
                            {whoCanAttend.description.replace(/<[^>]*>/g, " ").trim()}
                        </p>
                    )}

                    <ul className="space-y-1">
                        {rolesList.map((role, idx) => (
                            <li key={idx} className="flex items-center gap-3 bg-purple-50/30 border border-purple-100/20 px-3 py-1.5 rounded-full">
                                <div className="mt-0.5 w-4 h-4 rounded-full border border-purple-300 flex items-center justify-center text-purple-600 bg-white">
                                    <Check className="w-2.5 h-2.5" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-700">{role}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Before you start Box */}
            {hasPrereqs && (
                <div className="bg-white border border-amber-100/70 rounded-2xl p-4 space-y-4 shadow-sm">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[#101A3D]">Before you start</h4>
                        </div>

                        {/* Inline styles to style only li tags with circle check icon */}
                        <div className="prereqs-wrapper text-xs text-gray-700 leading-relaxed font-semibold">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .prereqs-wrapper ul {
                                    list-style: none;
                                    padding-left: 0;
                                    margin-top: 0.5rem;
                                    margin-bottom: 0.5rem;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 0.75rem;
                                }
                                .prereqs-wrapper li {
                                    position: relative;
                                    padding-left: 1.5rem;
                                }
                                .prereqs-wrapper li::before {
                                    content: '';
                                    position: absolute;
                                    left: 0;
                                    top: 0.15rem;
                                    width: 1rem;
                                    height: 1rem;
                                    border-radius: 9999px;
                                    background-color: #FEF3C7; /* bg-amber-50 */
                                    border: 1px solid #FDE68A; /* border-amber-200 */
                                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
                                    background-size: 0.55rem;
                                    background-repeat: no-repeat;
                                    background-position: center;
                                }
                                .prereqs-wrapper p {
                                    margin-bottom: 0.5rem;
                                    font-weight: 500;
                                    color: #4B5563; /* text-gray-600 */
                                }
                                .prereqs-wrapper * {
                                    font-family: inherit !important;
                                }
                            ` }} />
                            <div dangerouslySetInnerHTML={{ __html: prerequisites }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TargetAudience;
