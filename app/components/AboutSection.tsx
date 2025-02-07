import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Image Container */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/images/about-psychologist.jpg"
                                alt="Психолог за работой"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">
                            О нас
                        </h2>

                        <div className="space-y-4 text-gray-600">
                            <p className="leading-relaxed">
                                Мы - команда профессиональных психологов с многолетним опытом работы. 
                                Наша миссия - помогать людям достигать гармонии в жизни и отношениях.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                <div className="bg-mint/10 p-4 rounded-lg">
                                    <h3 className="font-semibold text-primary mb-2">
                                        10+ лет опыта
                                    </h3>
                                    <p className="text-sm">
                                        Многолетний опыт работы с различными психологическими проблемами
                                    </p>
                                </div>

                                <div className="bg-mint/10 p-4 rounded-lg">
                                    <h3 className="font-semibold text-primary mb-2">
                                        500+ клиентов
                                    </h3>
                                    <p className="text-sm">
                                        Сотни довольных клиентов, которым мы помогли изменить жизнь к лучшему
                                    </p>
                                </div>
                            </div>

                            <p className="leading-relaxed">
                                Мы используем современные методики и индивидуальный подход к каждому клиенту. 
                                Наши специалисты регулярно проходят дополнительное обучение и повышение квалификации.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="w-full sm:w-auto bg-mint text-white py-3 px-6 rounded-full hover:bg-mint/90 transition-colors duration-300">
                                    Записаться на консультацию
                                </button>
                                <button className="w-full sm:w-auto border-2 border-mint text-mint py-3 px-6 rounded-full hover:bg-mint/10 transition-colors duration-300">
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Statistics - Shown only on smaller screens */}
                <div className="mt-8 lg:hidden grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-mint/5 rounded-lg">
                        <div className="text-3xl font-bold text-mint mb-2">10+</div>
                        <div className="text-sm text-gray-600">Лет опыта</div>
                    </div>
                    <div className="text-center p-4 bg-mint/5 rounded-lg">
                        <div className="text-3xl font-bold text-mint mb-2">500+</div>
                        <div className="text-sm text-gray-600">Довольных клиентов</div>
                    </div>
                    <div className="text-center p-4 bg-mint/5 rounded-lg">
                        <div className="text-3xl font-bold text-mint mb-2">5</div>
                        <div className="text-sm text-gray-600">Направлений работы</div>
                    </div>
                    <div className="text-center p-4 bg-mint/5 rounded-lg">
                        <div className="text-3xl font-bold text-mint mb-2">24/7</div>
                        <div className="text-sm text-gray-600">Онлайн поддержка</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 