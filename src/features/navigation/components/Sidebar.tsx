import Link from 'next/link';
import { Home, Map, Compass, User, Settings, LogOut, Plane, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return (
        <aside className="relative z-20 flex h-screen w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Compass className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Globetrotter</span>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                    <NavItem key={item.href} {...item} isActive={item.href === '/'} />
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-1 border-t border-slate-100 pt-4">
                {BOTTOM_ITEMS.map((item) => (
                    <NavItem key={item.href} {...item} />
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
}: {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            )}
        >
            <Icon className={cn('h-5 w-5', isActive ? 'text-slate-900' : 'text-slate-400')} />
            {label}
        </Link>
    );
}
