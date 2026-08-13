"use client";

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | string>(0);

    useEffect(() => {
        if (isOpen) {
            const content = contentRef.current;
            if (content) {
                setHeight(content.scrollHeight);
            }
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden mb-4 transition-all duration-300 hover:border-brand-primary/40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
            >
                <span className="body-medium font-bold text-gray-900 pr-8">{title}</span>
                <ChevronDown
                    className={`w-5 md:w-6 h-5 md:h-6 text-brand-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                style={{ height: height }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div ref={contentRef} className="p-6 pt-0">
                    <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface AccordionGroupProps {
    items: { title: string; content: React.ReactNode }[];
}

export function AccordionGroup({ items }: AccordionGroupProps) {
    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <Accordion key={index} title={item.title}>
                    {item.content}
                </Accordion>
            ))}
        </div>
    );
}
