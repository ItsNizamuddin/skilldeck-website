import React from "react";

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export default function Skeleton({ className = "", width, height }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-secondary-900/10 rounded-lg ${className}`}
            style={{
                width: width,
                height: height
            }}
        />
    );
}
