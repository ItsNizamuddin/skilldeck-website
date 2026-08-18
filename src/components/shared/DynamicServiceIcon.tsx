import React from 'react';
import * as Icons from 'lucide-react';
import Image from 'next/image';

interface DynamicServiceIconProps {
    icon?: string;
    thumbnail?: string;
    alt?: string;
    className?: string;
}

export default function DynamicServiceIcon({
    icon,
    thumbnail,
    alt = "icon",
    className = ""
}: DynamicServiceIconProps) {
    const serviceIcon = icon || thumbnail;

    const { iconUrl, iconName, hexColor } = (() => {
        if (!serviceIcon) return { iconUrl: null, iconName: null, hexColor: null };
        if (serviceIcon.startsWith("http://") || serviceIcon.startsWith("https://") || serviceIcon.startsWith("/")) {
            return { iconUrl: serviceIcon, iconName: null, hexColor: null };
        }
        const parts = serviceIcon.split(",");
        const rawName = parts[0]?.trim() || "";
        const name = rawName.startsWith("Lucide") ? rawName.substring(6) : rawName;
        const color = parts[1]?.trim() || null;
        return { iconUrl: null, iconName: name, hexColor: color };
    })();

    const IconComponent = (iconName ? (Icons[iconName as keyof typeof Icons] || Icons.Layers) : Icons.Layers) as React.ComponentType<any>;

    return (
        <div
            className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border
                ${iconUrl ? 'bg-white border-slate-200 overflow-hidden p-1' : (hexColor ? '' : 'bg-indigo-50 border-indigo-100 text-indigo-500')} ${className}`}
            style={hexColor && !iconUrl ? { backgroundColor: `${hexColor}1a`, color: hexColor, borderColor: `${hexColor}33` } : undefined}
        >
            {iconUrl ? (
                <Image
                    src={iconUrl}
                    alt={alt}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                />
            ) : (
                <IconComponent className="w-5 h-5" aria-hidden="true" />
            )}
        </div>
    );
}
