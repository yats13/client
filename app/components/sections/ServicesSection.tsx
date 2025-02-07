'use client';

import React from 'react';
import Image from 'next/image';
import Accordion from '@/app/components/Accordion';

interface Service {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const services: Service[] = [
    {
        id: 1,
        title: 'Индивидуальная консультация',
        description: 'Персональные сессии для решения личных проблем и достижения целей',
        imageUrl: '/images/individual.jpg'
    },
    {
        id: 2,
        title: 'Семейная терапия',
        description: 'Помощь в улучшении отношений и решении семейных конфликтов',
        imageUrl: '/images/family.jpg'
    },
    {
        id: 3,
        title: 'Онлайн консультации',
        description: 'Удобные консультации из любой точки мира через видеосвязь',
        imageUrl: '/images/online.jpg'
    },
    {
        id: 4,
        title: 'Групповая терапия',
        description: 'Терапевтические группы для обмена опытом и взаимной поддержки',
        imageUrl: '/images/group.jpg'
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                    Наши услуги
                </h2>
                
                {/* Mobile Accordion View */}
                <div className="md:hidden">
                    <Accordion 
                        items={services.map(service => ({
                            id: service.id,
                            title: service.title,
                            subtitle: service.description,
                            content: (
                                <div className="space-y-4">
                                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                                        <Image
                                            src={service.imageUrl}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                            sizes="100vw"
                                        />
                                    </div>
                                    <p className="text-gray-600">
                                        {service.description}
                                    </p>
                                    <button className="w-full bg-mint text-white py-2 px-4 rounded-full hover:bg-mint/90 transition-colors duration-300">
                                        Подробнее
                                    </button>
                                </div>
                            )
                        }))}
                        defaultOpenId={1}
                    />
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-primary">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {service.description}
                                </p>
                                
                                <button className="mt-4 w-full bg-mint text-white py-2 px-4 rounded-full hover:bg-mint/90 transition-colors duration-300">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection; 