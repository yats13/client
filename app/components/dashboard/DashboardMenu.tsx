'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface MenuItem {
    link: string;
    label: string;

}
export default function DashboardMenu() {
    const pathname = usePathname();
    const menuItems:MenuItem[] = [
        { link: '/dashboard', label: 'Главная' },
        { link: '/dashboard/schedule', label: 'Расписание' },
    ];
    return (
    <nav className="flex flex-start p-4 bg-background border-b list-none gap-3">
    {menuItems.map((item, index) => (
        <li key={index} className="mb-4 transform transition-transform duration-300 hover:scale-105 hover:text-purple">
            <Link
                href={item.link}
                className={`link font-serif decoration-mint decoration-4 underline-offset-8 ${pathname === item.link ? 'active underline' : ''}`}
            >
                {item.label}
            </Link>
        </li>
    ))}
    </nav>   
)
}