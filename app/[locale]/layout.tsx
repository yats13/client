import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/config/i18n';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: {
        locale: string;
    };
};

export default async function LocaleLayout({
    children,
    params: { locale }
}: Props) {
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
} 