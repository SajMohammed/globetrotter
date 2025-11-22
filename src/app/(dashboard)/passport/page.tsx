import { PassportBook } from '@/features/passport/components/PassportBook';

export default function PassportPage() {
    return (
        <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50">
            <div className="flex-1 overflow-hidden">
                <PassportBook />
            </div>
        </div>
    );
}
