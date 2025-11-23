"use client";

import Link from 'next/link';
import { Home, Map, Compass, User, Settings, LogOut, Plane, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const NAV_ITEMS = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Map, label: 'My Map', href: '/map' },
    { icon: Briefcase, label: 'Trips', href: '/trips' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Plane, label: 'Passport', href: '/passport' },
];

const BOTTOM_ITEMS = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'relative z-20 flex h-screen flex-col border-r border-slate-200 bg-white py-6 transition-all duration-300 ease-in-out',
                isCollapsed ? 'w-20 px-2' : 'w-64 px-4'
            )}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900"
            >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            <div className={cn('mb-8 flex items-center gap-2', isCollapsed ? 'justify-center px-0' : 'px-2')}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Compass className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                    <span className="text-lg font-bold tracking-tight text-slate-900 overflow-hidden whitespace-nowrap">
                        Globetrotter
                    </span>
                )}
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        isActive={item.href === '/'}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-1 border-t border-slate-100 pt-4">
                {BOTTOM_ITEMS.map((item) => (
                    <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
                ))}
            </div>
        </aside>
    );
}

function NavItem({
    icon: Icon,
    label,
    href,
    isActive,
    isCollapsed,
}: {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive?: boolean;
    isCollapsed: boolean;
}) {
    return (
        <Link
            href={href}
            title={isCollapsed ? label : undefined}
            className={cn(
                'flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200',
                isCollapsed ? 'justify-center px-2' : 'px-3',
                isActive
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            )}
        >
            <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-slate-900' : 'text-slate-400')} />
            {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">{label}</span>}
        </Link>
    );
}
