import { MonteCarlo } from 'next/font/google'
import { LogoProps } from '../types/props/LogoProps';
import { TextSize } from '../types/enums/TextSizeEnum';
import Link from 'next/link';

const monteCarlo = MonteCarlo({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
})

export default function Logo({size = TextSize.XL4, onClick}: LogoProps) {
    return (
        <Link
            href="/"
            onClick={onClick}
            className={`${monteCarlo.className} ${size} mix-blend-difference z-20`}
        >
            MiraDos
        </Link>
    )
}