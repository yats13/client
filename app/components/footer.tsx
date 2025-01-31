import Logo from "./logo"
import { TextSize } from '../types/enums/TextSizeEnum';

export default function Footer () {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center justify-end pb-8">
            <Logo size={TextSize.XL4}/>
            <p className="text-xs">&copy;{currentYear}. All rights reserved.</p>
        </footer>
    );
}