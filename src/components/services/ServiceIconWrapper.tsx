import React from "react";
import ServiceItemIcon from "./ServiceItemIcon";

interface ServiceIconWrapperProps {
    iconString?: string;
    className?: string;
    iconClassName?: string;
    defaultIcon?: string;
    fallbackBgClass?: string;
}

export default function ServiceIconWrapper({
    iconString,
    className = "w-10 h-10 rounded-lg",
    iconClassName = "w-5 h-5",
    defaultIcon = "Layers",
    fallbackBgClass = "bg-indigo-50 text-indigo-600"
}: ServiceIconWrapperProps) {
    const parts = iconString?.split(",") || [];
    const hexColor = parts[1]?.trim();
    const parsedColor = hexColor && hexColor !== "currentColor" ? hexColor : null;

    return (
        <div 
            className={`flex items-center justify-center shrink-0 ${className} ${!parsedColor ? fallbackBgClass : ""}`}
            style={parsedColor ? { backgroundColor: `${parsedColor}1a`, color: parsedColor } : undefined}
        >
            <ServiceItemIcon iconString={iconString} className={iconClassName} defaultIcon={defaultIcon} />
        </div>
    );
}
