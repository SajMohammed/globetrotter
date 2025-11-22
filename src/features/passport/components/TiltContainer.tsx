'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, ReactNode, useRef } from 'react';

interface TiltContainerProps {
    children: ReactNode;
    className?: string;
    tiltIntensity?: number; // How much it tilts (degrees)
    glareIntensity?: number; // Opacity of the glare effect
}

export function TiltContainer({
    children,
    className,
    tiltIntensity = 15,
    glareIntensity = 0.4
}: TiltContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Map mouse position to rotation
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

    // Glare gradient position
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        // Normalize to -0.5 to 0.5
        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
        >
            {children}

            {/* Dynamic Glare Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-50 rounded-inherit mix-blend-overlay"
                style={{
                    background: useTransform(
                        [glareX, glareY],
                        ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${glareIntensity}) 0%, transparent 80%)`
                    ),
                    opacity: useTransform(mouseX, (val) => Math.abs(val) * 2), // Fade out when centered
                }}
            />
        </motion.div>
    );
}
