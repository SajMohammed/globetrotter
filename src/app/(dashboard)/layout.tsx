import { Sidebar } from '@/features/navigation/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-screen w-full overflow-hidden bg-white">
            <Sidebar />
            <main className="relative flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
