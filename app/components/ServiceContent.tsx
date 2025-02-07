'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
}

const serviceItems: ServiceItem[] = [
    {
        id: 1,
        title: 'Индивидуальная консультация',
        description: 'Персональные сессии для решения личных проблем',
        content: 'Индивидуальные консультации предоставляют безопасное пространство для обсуждения личных проблем, тревог и целей. В ходе сессий мы работаем над развитием самопонимания, улучшением эмоционального состояния и достижением позитивных изменений в жизни.',
        imageUrl: '/images/individual.jpg'
    },
    {
        id: 2,
        title: 'Семейная терапия',
        description: 'Помощь в улучшении семейных отношений',
        content: 'Семейная терапия помогает улучшить коммуникацию между членами семьи, разрешить конфликты и укрепить семейные связи. Мы работаем вместе над созданием более гармоничных и поддерживающих отношений.',
        imageUrl: '/images/family.jpg'
    },
    {
        id: 3,
        title: 'Онлайн консультации',
        description: 'Удобные консультации через видеосвязь',
        content: 'Онлайн консультации предоставляют возможность получить профессиональную помощь, не выходя из дома. Это удобный и эффективный способ работы, особенно для тех, кто ценит гибкость и комфорт.',
        imageUrl: '/images/online.jpg'
    }
];

const ServiceContent: React.FC = () => {
    const [activeId, setActiveId] = useState<number>(1); // First item active by default

    const toggleAccordion = (id: number) => {
        setActiveId(id);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="space-y-4">
                {serviceItems.map((item) => (
                    <div 
                        key={item.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleAccordion(item.id)}
                            className={`w-full flex items-center justify-between p-4 ${
                                activeId === item.id ? 'bg-mint/10' : 'bg-white'
                            }`}
                        >
                            <div className="flex flex-col items-start text-left">
                                <h3 className="text-lg font-semibold text-primary">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description}
                                </p>
                            </div>
                            <ChevronDownIcon 
                                className={`w-5 h-5 text-primary transition-transform duration-300 ${
                                    activeId === item.id ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        
                        <div 
                            className={`transition-all duration-300 ease-in-out ${
                                activeId === item.id ? 'max-h-[500px]' : 'max-h-0'
                            } overflow-hidden`}
                        >
                            <div className="p-4 bg-white">
                                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 768px"
                                    />
                                </div>
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                                <button className="mt-4 w-full md:w-auto bg-mint text-white py-2 px-6 rounded-full hover:bg-mint/90 transition-colors duration-300">
                                    Записаться
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceContent; 