import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your existing config here
};

export default withNextIntl(nextConfig);
