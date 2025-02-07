import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
    const t = useTranslations('home');
    
    return (
        <main className="min-h-screen p-24">
            <div className="mb-8">
                <LanguageSwitcher />
            </div>
            <h1 className="text-4xl font-bold mb-4">
                {t('title')}
            </h1>
            <p className="text-xl">
                {t('description')}
            </p>
        </main>
    );
} 