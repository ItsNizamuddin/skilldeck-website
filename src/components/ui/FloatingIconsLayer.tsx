"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface IconProps {
    id: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ElementType;
    className: string;
    colorClass?: string;
    label?: string;
    alwaysShowLabel?: boolean;
}

interface FloatingIconsLayerProps {
    icons: IconProps[];
}

const Icon = ({ iconData, index }: { iconData: IconProps; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });
    const [isNear, setIsNear] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Out-of-sync animation values
    const duration = 6 + ((index * 2) % 4); // 6s, 8s, 10s, etc.
    const delay = -(index * 0.7); // negative delay so they start immediately at different points

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100 + index * 80); // Staggered entry!
        return () => clearTimeout(timer);
    }, [index]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const iconCenterY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - iconCenterX, 2) +
                Math.pow(e.clientY - iconCenterY, 2)
            );

            if (distance < 160) {
                const angle = Math.atan2(e.clientY - iconCenterY, e.clientX - iconCenterX);
                // Stronger push when closer
                const force = (1 - distance / 160) * 35;
                setTransform({
                    x: -Math.cos(angle) * force,
                    y: -Math.sin(angle) * force
                });
                setIsNear(true);
            } else {
                setTransform({ x: 0, y: 0 });
                setIsNear(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const IconComponent = iconData.icon;

    return (
        <div
            ref={ref}
            style={{
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
                transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), scale 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: mounted ? 1 : 0,
                scale: mounted ? 1 : 0.6,
            }}
            className={cn("absolute hidden md:flex flex-col items-center justify-center z-10", iconData.className)}
        >
            <div
                style={{
                    animation: `float-gentle ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                }}
                className="flex flex-col items-center justify-center"
            >
                <div className={cn(
                    "flex items-center justify-center w-9 h-9 md:w-10 md:h-10 2xl:w-14 2xl:h-14 p-2 2xl:p-3 rounded-lg 2xl:rounded-2xl  transition-all duration-300",
                    isNear
                        ? "scale-115 "
                        : ""
                )}>
                    <IconComponent className={cn(
                        "w-4.5 h-4.5 md:w-6 md:h-6 2xl:w-7 2xl:h-7",
                        iconData.colorClass || "text-slate-700"
                    )} />
                </div>
                {iconData.label && (
                    <span
                        style={{
                            opacity: isNear || iconData.alwaysShowLabel ? 1 : 0,
                            transform: `translate3d(0, ${isNear || iconData.alwaysShowLabel ? 0 : -3}px, 0)`,
                            transition: "all 0.2s ease-out",
                        }}
                        className="mt-0.5 px-2 py-0.5 text-[9px] md:text-[9.5px] 2xl:text-[11px] font-bold text-slate-700 whitespace-nowrap"
                    >
                        {iconData.label}
                    </span>
                )}
            </div>
        </div>
    );
};

const FloatingIconsLayer = ({ icons }: FloatingIconsLayerProps) => {
    return (
        <>
            {icons.map((iconData, index) => (
                <Icon key={iconData.id} iconData={iconData} index={index} />
            ))}
        </>
    );
};

export default FloatingIconsLayer;
