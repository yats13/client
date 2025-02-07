import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';
import { getPreferredLocale } from './utils/locale';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
    localeDetection: true
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}; 