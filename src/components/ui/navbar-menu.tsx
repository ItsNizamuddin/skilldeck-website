"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
    className,
    centered = false,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
    className?: string;
    centered?: boolean;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className={`relative ${className || ""}`}>
            <div
                onClick={() => active === item ? setActive("") : setActive(item)}
                className="cursor-pointer text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors flex items-center gap-1.5"
            >
                {item}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${active === item ? "rotate-180" : ""}`} />
            </div>
            {active !== null && active === item && (
                <div className={`${centered ? "fixed top-12 left-1/2 -translate-x-1/2 z-50 pt-6" : "absolute top-[calc(100%_+_1rem)] left-1/2 -translate-x-1/2 pt-2"}`}>
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative flex justify-center items-center space-x-6 p-4"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
    icon: Icon,
}: {
    title: string;
    description: string;
    href: string;
    src?: string;
    icon?: React.ElementType;
}) => {
    return (
        <Link href={href} className="flex space-x-3 group">
            {src ? (
                <Image
                    src={src}
                    width={100}
                    height={60}
                    alt={title}
                    className="flex-shrink-0 rounded-lg shadow-md"
                />
            ) : Icon ? (
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
            ) : null}
            <div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {title}
                </h4>
                <p className="text-gray-500 text-xs max-w-[12rem]">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string;[key: string]: any }) => {
    return (
        <Link
            href={href}
            {...rest}
            className="text-slate-600 hover:text-blue-600 font-normal transition-colors text-sm"
        >
            {children}
        </Link>
    );
};
