import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';
import { getPreferredLocale } from './utils/locale';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
    localeDetection: true,
    defaultLocale: (request) => {
        const acceptLanguage = request.headers.get('accept-language');
        return getPreferredLocale(acceptLanguage);
    }
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}; 