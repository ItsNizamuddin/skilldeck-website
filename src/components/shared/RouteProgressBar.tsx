"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset loading state when route transition completes
        setLoading(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setTimeout(() => {
                setLoading(false);
            }, 3000); // 3-second fail-safe timeout
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [loading]);

    useEffect(() => {
        const injectSpinner = (element: HTMLElement) => {
            if (element.querySelector('.route-btn-spinner')) return;

            let svg = element.querySelector('svg.route-loader-target') ||
                element.querySelector('.route-loader-target svg');

            if (!svg) {
                const svgs = element.querySelectorAll('svg');
                if (svgs.length > 0) {
                    svg = svgs[svgs.length - 1]; // Use last SVG (which is usually the arrow/chevron)
                }
            }

            const spinner = document.createElement('span');
            spinner.className = 'route-btn-spinner';

            if (svg) {
                // Hide the SVG icon
                svg.classList.add('route-btn-icon-hidden');
                // Insert spinner in place of the SVG
                svg.parentNode?.insertBefore(spinner, svg);
            } else {
                // Fallback: append spinner to the end of the element
                element.appendChild(spinner);
            }
            element.classList.add('route-loading-active');
        };

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Skip loading if the clicked element or any parent specifies data-no-loader
            if (target.closest('[data-no-loader]')) {
                return;
            }

            // Find closest anchor tag
            const anchor = target.closest('a');

            if (anchor) {
                const href = anchor.getAttribute('href');
                const targetAttr = anchor.getAttribute('target');

                // Only intercept internal page navigations
                if (
                    href &&
                    href.startsWith('/') &&
                    !href.includes('#') &&
                    targetAttr !== '_blank' &&
                    !e.ctrlKey &&
                    !e.metaKey &&
                    !e.shiftKey &&
                    e.button === 0 // Left click only
                ) {
                    const currentUrl = window.location.pathname + window.location.search;
                    if (href !== currentUrl) {
                        setLoading(true);
                        injectSpinner(anchor);
                    }
                }
            }

        };

        document.addEventListener('click', handleAnchorClick);
        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    // Remove loading classes and elements when loading completes
    useEffect(() => {
        if (!loading) {
            document.querySelectorAll('.route-loading-active').forEach((el) => {
                el.classList.remove('route-loading-active');
            });
            document.querySelectorAll('.route-btn-icon-hidden').forEach((el) => {
                el.classList.remove('route-btn-icon-hidden');
            });
            document.querySelectorAll('.route-btn-spinner').forEach((el) => {
                el.remove();
            });
        }
    }, [loading]);

    return null;
}
