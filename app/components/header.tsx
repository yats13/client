'use client';

import { useState } from 'react';
import { TextSize } from "../types/enums/TextSizeEnum";
import Logo from "./logo";
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Динамическая загрузка Menu с отключением SSR
const Menu = dynamic(() => import("./menu"), { ssr: false });

export default function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const pathname = usePathname();
    console.log(pathname);
    const mainColor = clsx({
        "white": pathname === "/",
        "zinc-900": pathname !== "/"
    });

    // Переключение меню
    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    // Закрытие меню
    const closeMenu = () => setIsMenuVisible(false);

    return (
        <header className="w-full absolute z-20">
            <div className={`container mx-auto px-4 flex justify-between items-center top-0 text-${mainColor}`}>
                <div></div>
                <Logo size={TextSize.XL5} onClick={closeMenu} />
                <nav>
                    <button
                        onClick={toggleMenu}
                        className="focus:outline-none relative w-8 h-8 z-20"
                        aria-label="Toggle menu"
                    >
                        <div className={clsx("hamburger-icon", { "open": isMenuVisible })}>
                            <span
                                className={clsx(
                                    "block w-8 h-1 transition-all duration-300 ease-in-out transform rounded-full",
                                    isMenuVisible ? "rotate-45 translate-y-2.5 bg-zinc-900" : 'bg-'+mainColor
                                )}
                            ></span>
                            <span
                                className={clsx(
                                    "block w-8 h-1 mt-1.5 transition-all duration-300 ease-in-out rounded-full",
                                    isMenuVisible ? "opacity-0" : 'bg-'+mainColor
                                )}
                            ></span>
                            <span
                                className={clsx(
                                    "block w-8 h-1 mt-1.5 transition-all duration-300 ease-in-out transform rounded-full",
                                    isMenuVisible ? "-rotate-45 -translate-y-2.5 bg-zinc-900" :'bg-'+ mainColor
                                )}
                            ></span>
                        </div>
                    </button>
                    <Menu isVisible={isMenuVisible} onClose={closeMenu} />
                </nav>
            </div>
        </header>
    );
}
