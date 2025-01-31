import React from 'react';
import LinkTo from '@/app/components/link-to'
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import { TextSize } from '@/app/types/enums/TextSizeEnum';
import SocialMedia from "@/app/components/social-media"
import { Color } from "@/app/types/enums/Color"

const HeroSection: React.FC = () => {
    return (
        <section id="hero"
            className="top-0 bg-hero-section bg-cover bg-center px-10 h-screen flex flex-col justify-center items-start text-start text-white relative"
        >
            <div className='max-w-screen-md'>
                <h1 className={`text-2xl sm:${TextSize.XL5} font-bold mb-3 max-w-3xl mt-10`}>
                    Не оставайтесь наедине со своими слезами, обидами, страхом и отчаянием
                </h1>
                <div className="m-3 text-lg md:m-6:text-xl">
                    <p>
                        Вы имеете право улучшить качество своей жизни!
                    </p>
                    <p>
                        Мы поможем Вам справится с эмоциональными трудностями, наладить отношения с окружающими, найти причину постоянно повторяющихся конфликтов и трудностей.
                    </p>
                </div>
                <LinkTo 
                    label="Записаться"
                    href="/calendar"
                    variant={ButtonVariant.Secondary} 
                />
            </div>
            <SocialMedia color={Color.White} />
        </section>
    );
};

export default HeroSection;
