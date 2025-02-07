'use client';

import React from 'react';
import Image from 'next/image';
import Accordion from '../ui/Accordion';

const services = [
    {
        id: 1,
        title: 'Индивидуальная консультация',
        subtitle: 'Персональные сессии для решения личных проблем',
        content: (
            <div className="space-y-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/individual.jpg"
                        alt="Индивидуальная консультация"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                        Индивидуальные консультации предоставляют безопасное пространство для обсуждения личных проблем, 
                        тревог и целей. В ходе сессий мы работаем над развитием самопонимания, улучшением эмоционального 
                        состояния и достижением позитивных изменений в жизни.
                    </p>
                </div>
                <button className="w-full md:w-auto bg-mint text-white py-2 px-6 rounded-full hover:bg-mint/90 transition-colors duration-300">
                    Записаться
                </button>
            </div>
        )
    },
    {
        id: 2,
        title: 'Семейная терапия',
        subtitle: 'Помощь в улучшении семейных отношений',
        content: (
            <div className="space-y-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/family.jpg"
                        alt="Семейная терапия"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                        Семейная терапия помогает улучшить коммуникацию между членами семьи, разрешить конфликты 
                        и укрепить семейные связи. Мы работаем вместе над созданием более гармоничных и поддерживающих отношений.
                    </p>
                </div>
                <button className="w-full md:w-auto bg-mint text-white py-2 px-6 rounded-full hover:bg-mint/90 transition-colors duration-300">
                    Записаться
                </button>
            </div>
        )
    },
    {
        id: 3,
        title: 'Онлайн консультации',
        subtitle: 'Удобные консультации через видеосвязь',
        content: (
            <div className="space-y-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/online.jpg"
                        alt="Онлайн консультации"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                        Онлайн консультации предоставляют возможность получить профессиональную помощь, не выходя из дома. 
                        Это удобный и эффективный способ работы, особенно для тех, кто ценит гибкость и комфорт.
                    </p>
                </div>
                <button className="w-full md:w-auto bg-mint text-white py-2 px-6 rounded-full hover:bg-mint/90 transition-colors duration-300">
                    Записаться
                </button>
            </div>
        )
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                    Наши услуги
                </h2>
                
                <Accordion 
                    items={services}
                    defaultOpenId={1}
                    className="md:mt-8"
                />
            </div>
        </section>
    );
};

export default ServicesSection; 