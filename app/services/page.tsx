import Link from 'next/link'
import PageTitle from '../components/page-titile'
import ConsultationPackages from '../components/sections/services/consultation-packages'

export const metadata = {
    title: "Услуги психолога | Психолог Онлайн",
    description: "Консультации психолога, коучинг, работа с тревожностью и стрессом.",
    robots: "index, follow",
    openGraph: {
        title: "Услуги | Психолог Онлайн",
        description: "Помощь в решении психологических проблем и личностном росте.",
        url: "https://mirados.co/services",
        type: "website",
        images: [{ url: "/images/services.jpg" }]
    }
};

export default function Page() {
    return (
        <main className='relative'>
            <PageTitle text="Услуги" />
            <div className="container mx-auto px-4 py-8">
                {/* Primary Consultation */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-purple">Первичная консультация - 30 минут БЕСПЛАТНО</h2>
                    <p className="mt-4 text-gray-700">
                        Встреча, на которой мы познакомимся и обсудим Ваши запросы и ожидания от работы с психологом. Вы сможете задать любые вопросы о процессе консультирования, а также решить для себя, готовы ли Вы к совместной работе.
                    </p>
                </section>

                {/* Individual Counseling */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-purple">Индивидуальное консультирование</h2>
                    <p className="text-gray-700">
                        Личные встречи для решения эмоциональных проблем и психологических проблем. Помощь в осознании причин внутренних конфликтов. Работа с тревогой, выгоранием и стрессом.
                    </p>
                    <p className="mt-4 text-lg font-semibold">50 минут - 1000 грн | 100 zł | 25 евро</p>
                </section>

                {/* One-Time Consultation */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-purple">Разовая консультация</h2>
                    <p className="text-lg font-semibold">1 час 30 минут - 2000 грн | 200 zł | 50 евро</p>
                    <p className="mt-4 text-gray-700">
                        Мы вместе оценим ваше текущее состояние, глубоко разберем суть проблемы и ее причины, вместе рассмотрим возможные пути решения и наметим первые шаги к улучшению ситуации.
                    </p>
                </section>

                {/* Consultation Package */}
                <section className="mb-8">
                    <ConsultationPackages />
                </section>
            </div>
        </main>
    );
}