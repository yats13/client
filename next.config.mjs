import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // Your existing config here
};

export default withNextIntl(nextConfig);
