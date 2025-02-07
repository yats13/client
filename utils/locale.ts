import { defaultLocale, locales } from '@/config/i18n';
import type { Locale } from '@/config/i18n';

export function getPreferredLocale(acceptLanguage: string | null): Locale {
    if (!acceptLanguage) return defaultLocale;

    // Parse the Accept-Language header
    const preferredLocales = acceptLanguage
        .split(',')
        .map(item => item.split(';')[0])
        .map(item => item.trim().substring(0, 2));

    // Find the first preferred locale that is supported
    const matchedLocale = preferredLocales.find(locale => 
        locales.includes(locale as Locale)
    );

    return (matchedLocale as Locale) || defaultLocale;
} 