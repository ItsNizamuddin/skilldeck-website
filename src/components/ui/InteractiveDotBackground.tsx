"use client";

import { useEffect, useRef } from "react";

interface InteractiveDotBackgroundProps {
    dotColor?: string;
    gap?: number;
    radius?: number;
    mouseRadius?: number;
}

export default function InteractiveDotBackground({
    dotColor = "rgba(148, 163, 184, 0.3)",
    gap = 16,
    radius = 1.5,
    mouseRadius = 90,
}: InteractiveDotBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const isAnimatingRef = useRef(false);
    const dotsRef = useRef<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        originX: number;
        originY: number;
    }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const dots = dotsRef.current;
            const mouse = mouseRef.current;

            const springConstant = 0.08;
            const friction = 0.85;
            let needsFurtherAnimation = false;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = dot.originX;
                let targetY = dot.originY;

                let currentDotColor = dotColor;

                if (dist < mouseRadius && dist > 0.1) {
                    const force = Math.pow((mouseRadius - dist) / mouseRadius, 2.5);
                    const repelDist = force * 4; // Minimal physical displacement

                    targetX = dot.originX - (dx / dist) * repelDist;
                    targetY = dot.originY - (dy / dist) * repelDist;

                    // Multi-stage highlight color change
                    if (dist < mouseRadius * 0.4) {
                        currentDotColor = "#a855f7"; // Closest: Bright Purple
                    } else if (dist < mouseRadius * 0.8) {
                        currentDotColor = "#2563eb"; // Medium: Brand Royal Blue
                    }
                }

                const ax = (targetX - dot.x) * springConstant;
                const ay = (targetY - dot.y) * springConstant;

                dot.vx = (dot.vx + ax) * friction;
                dot.vy = (dot.vy + ay) * friction;

                dot.x += dot.vx;
                dot.y += dot.vy;

                if (Math.abs(dot.vx) > 0.005 || Math.abs(dot.vy) > 0.005) {
                    needsFurtherAnimation = true;
                }

                ctx.fillStyle = currentDotColor;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            if (needsFurtherAnimation || mouse.x !== -1000) {
                animationFrameId = requestAnimationFrame(draw);
            } else {
                isAnimatingRef.current = false;
            }
        };

        const triggerAnimation = () => {
            if (!isAnimatingRef.current) {
                isAnimatingRef.current = true;
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;

            const dots = [];
            const cols = Math.ceil(width / gap);
            const rows = Math.ceil(height / gap);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * gap + gap / 2;
                    const y = r * gap + gap / 2;
                    dots.push({
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        originX: x,
                        originY: y,
                    });
                }
            }
            dotsRef.current = dots;
            triggerAnimation();
        };

        resize();

        const resizeObserver = new ResizeObserver(() => resize());
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const localX = e.clientX - rect.left;
            const localY = e.clientY - rect.top;

            mouseRef.current = { x: localX, y: localY };

            if (localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height) {
                triggerAnimation();
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
            triggerAnimation();
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            if (canvas.parentElement) {
                canvas.parentElement.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [dotColor, gap, radius, mouseRadius]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-20"
            style={{ display: "block" }}
        />
    );
}