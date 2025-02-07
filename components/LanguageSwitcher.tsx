'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { locales } from '@/config/i18n';
import { useTransitions } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { startTransition } = useTransitions();

    const handleChange = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    return (
        <div className="relative inline-block text-left">
            <select
                value={locale}
                onChange={(e) => handleChange(e.target.value)}
                className="block w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {locales.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
} 