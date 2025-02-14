'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type MenuItem = {
    href: string;
    label: string;
};

const menuItems: MenuItem[] = [
    { href: '/dashboard', label: 'Главная' },
    { href: '/dashboard/schedule', label: 'Ежедневник' },
    { href: '/dashboard/psychologists', label: 'Психологи' },
];

export default function DashboardMenu() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4">
            {menuItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={clsx(
                        'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        pathname === href
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}