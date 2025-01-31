'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TextSize } from '../types/enums/TextSizeEnum';

interface MenuItem {
    link: string;
    label: string;
}

const Menu: React.ComponentType<{ readonly isVisible?: boolean; readonly onClose?: () => void }> = dynamic(() => Promise.resolve(({ isVisible, onClose }) => {
    const pathname = usePathname();
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

    const menuItems: MenuItem[] = [
        { link: '/', label: 'Главная' },
        { link: '/about', label: 'О нас' },
        { link: '/services', label: 'Услуги' },
        { link: '/calendar', label: 'Календарь' },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handlePageLoad = () => setIsPageLoaded(true);

            if (document.readyState === 'complete') {
                handlePageLoad();
            } else {
                window.addEventListener('load', handlePageLoad);
            }

            return () => {
                window.removeEventListener('load', handlePageLoad);
            };
        }
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isVisible && isPageLoaded ? 'hidden' : 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible, isPageLoaded]);

    return (
        <ul
            className={`
                fixed top-0 right-0 h-full w-full bg-white text-primary transform transition-transform duration-300 ease-in-out z-10
                ${isVisible && isPageLoaded ? 'translate-x-0' : 'translate-x-full'}
                flex flex-col justify-center items-center p-10 ${TextSize.XL3}
                overflow-hidden
            `}
        >
            {menuItems.map((item, index) => (
                <li key={index} className="mb-4 transform transition-transform duration-300 hover:scale-105 hover:text-purple">
                    <Link
                        href={item.link}
                        className={`link font-serif decoration-mint decoration-4 underline-offset-8 ${pathname === item.link ? 'active underline' : ''}`}
                        onClick={() => onClose && onClose()}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
            <li className="mb-4 transform transition-transform duration-300 hover:scale-105 hover:text-purple">
                <Link
                    href="/#contacts"
                    className="font-serif"
                    onClick={() => onClose && onClose()}
                >
                    Контакты
                </Link>
            </li>
        </ul>
    );
}), { ssr: false });

export default Menu;