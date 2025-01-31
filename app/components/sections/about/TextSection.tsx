// components/AboutSection.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const TextSection: React.FC = () => {
    // Track the currently expanded section
    const [activeSection, setActiveSection] = useState<string>('aboutUs'); // Open the first section by default

    // Data for each section
    const sections = [
        {
            id: 'aboutUs',
            title: 'Наш путь',
            content: (
                <>
                    <p>Все знают нас как сестры — Маша и Даша. Свой профессиональный путь мы всегда проходили плечом к плечу. </p>
                    <p>Много лет мы работали на телевидении: рассказывали истории людей, изучали их эмоции, проводили интервью и раскрывали то, что было скрыто от глаз зрителя. </p>
                    <p>Но однажды мы осознали: наблюдать за этими историями со стороны недостаточно — мы хотим помогать людям находить выход из их сложных ситуаций и участвовать в их трансформации.</p>
                    <p> Так начался наш путь в психологию, где мы решили применить все наши знания о человеческом поведении, накопленные за годы работы на экране.</p>
                </>
            ),
            image: '/images/about-us-home.png',
        },
        {
            id: 'ourJourney',
            title: 'Наше развитие',
            content: (
                <p>С момента этого решения мы посвятили себя обучению и практике: от академических курсов до практических тренингов и мастер-классов. Нам важно не просто решать сиюминутные проблемы, но и видеть глубину каждого внутреннего конфликта, помогать людям осознавать свои сильные стороны и находить долгосрочные решения.</p>
            ),
            image: '/images/IMG_4695-4.jpg',
        },
        {
            id: 'qualifications',
            title: 'Наша квалификация в психологии',
            content: (
                <ul className="list-disc list-inside marker:text-mint space-y-2 ml-6">
                    <li className="before:text-mint">Master in Psychology, Swiss Montreux Business School</li>
                    <li>“Психология” ILM Academy (760 часов + 120 практики)</li>
                    <li>“Кризисная психология и травмотерапия” ILM Academy</li>
                    <li>101 курс ТА</li>
                    <li>202 курс ТА (в процессе)</li>
                    <li>Курс “Zaburzenia lękowe u osób dorosłych” (“Тревожные расстройства у взрослых” 30 часов)</li>
                    <li>Курс “Psychotraumatologie” (“Психотравматология” 30 часов)</li>
                    <li>“ДНК Психотравмы”, 1 ступень (20 часов)</li>
                    <li>“Методы оказания первой психологической помощи” Larus School of Psychology (8 часов)</li>
                </ul>
            ),
            image: '/images/about-us-home.png',
        },
        {
            id: 'also',
            title: 'Также мы:',
            content: (
                <ul className="list-disc list-inside marker:text-mint space-y-2 ml-6">
                    <li>
                        Члены Национальной психологической ассоциации и Союза транзактного анализа (УСТА).
                    </li>
                    <li>
                        Волонтеры на горячей линии психологической помощи, что позволяет нам оставаться в постоянном контакте с реальными проблемами людей и применять эффективные методы поддержки.
                    </li>
                </ul>
            ),
            image: '/images/IMG_5042-41.jpg',
        },
        {
            id: 'approach',
            title: 'Наш подход',
            content: (
                <>
                    <p>Основное направление нашей работы — транзактный анализ, который помогает понять, как человек взаимодействует с собой и окружающими через три ключевые роли: Ребенка, Взрослого и Родителя. Этот метод позволяет осознать, какие из этих ролей доминируют в жизни, как они влияют на решения и взаимодействия, и помогает изменить шаблоны поведения, которые приводят к конфликтам и внутренним противоречиям.</p>
                    <p>Однако каждый клиент — это отдельное пространство, и мы подбираем подходы индивидуально. Помимо транзактного анализа, мы используем техники других направлений, выбирая самое эффективное для каждого конкретного случая.</p>
                </>
            ),
            image: '/images/IMG_4695-4.jpg',
        },
        {
            id: 'offer',
            title: 'Что мы предлагаем',
            content: (
                <>
                    <p>Мы создаем пространство, где каждый может исследовать свои тревоги и внутренние конфликты. Наш подход сочетает глубокую работу над личными установками с поиском практических решений. Мы верим, что каждый человек способен обрести гармонию, если его вовремя поддержать.</p>
                    <p>Онлайн-формат консультаций дает возможность быть рядом, где бы вы ни находились, и сопровождать вас на пути к осознанию и внутреннему покою.</p>
                </>
            ),
            image: '/images/IMG_4837-19.jpg',
        },
    ];

    // Toggle section and close others only when another section is selected
    const toggleSection = (sectionId: string) => {
        if (activeSection !== sectionId) {
            setActiveSection(sectionId);
        }
    };

    return (
        <div id="about" className="p-10 container mx-auto space-y-6 flex flex-col md:flex-row">
        {/* Left Menu Section */}
        <div className="left-menu w-full md:w-1/4 self-center">
            {sections.map((section) => (
                <h2
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`cursor-pointer text-purple hover:underline decoration-mint decoration-4 text-xl font-bold mb-4 mt-6 ${activeSection === section.id ? 'underline' : ''}`}
                >
                    {section.title}
                </h2>
            ))}
        </div>

        {/* Center Content Section */}
        <div className="center-content w-full md:w-1/2 pr-4  self-center">
            <div
                className={`transition-all duration-500 ease-out transform ${
                    activeSection ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="p-2">
                    {sections.find((section) => section.id === activeSection)?.content}
                </div>
            </div>
        </div>

        {/* Right Image Section */}
        <div className="right-image w-full md:w-1/4 flex justify-center">
            <div className="relative w-full max-w-md h-auto">
                <Image
                    src={sections.find((section) => section.id === activeSection)?.image || '/images/default.png'}
                    alt={sections.find((section) => section.id === activeSection)?.title || 'Image'}
                    className="object-cover"
                    fill
                    priority
                />
            </div>
        </div>
    </div>
    );
};

export default TextSection;
