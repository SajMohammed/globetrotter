'use client';

import { cn } from '@/lib/utils';

interface FoilElementProps {
    children?: React.ReactNode;
    className?: string;
    as?: 'div' | 'span' | 'h1' | 'h2' | 'p';
}

export function FoilElement({ children, className, as: Component = 'div' }: FoilElementProps) {
    return (
        <Component
            className={cn(
                "relative text-transparent bg-clip-text",
                className
            )}
            style={{
                backgroundImage: `
                    linear-gradient(
                        135deg, 
                        #bf953f 0%, 
                        #fcf6ba 25%, 
                        #b38728 50%, 
                        #fbf5b7 75%, 
                        #aa771c 100%
                    )
                `,
                backgroundSize: '200% 200%',
                animation: 'foil-shimmer 4s ease infinite',
            }}
        >
            {children}
            {/* Inner shadow for depth */}
            <span className="absolute inset-0 text-black/20 blur-[1px] -z-10 select-none" aria-hidden="true">
                {children}
            </span>
        </Component>
    );
}
