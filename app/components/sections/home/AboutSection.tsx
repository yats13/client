// components/AboutSection.tsx
"use client";

import React from 'react';
import SectionPageTitle from '@/app/components/section-page-title';
import LinkTo from '../../link-to';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-light-grey text-start relative z-10 py-8 -mt-28">
      <SectionPageTitle text="О нас" />
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        <div className="block-left w-full md:w-1/2 pr-4 self-center">
          <h3 className="underline decoration-mint decoration-4 text-2xl text-purple pt-3">
            Наш подход
          </h3>
          <p>
            Основное направление нашей работы — транзактный анализ, который
            помогает понять, как человек взаимодействует с собой и окружающими через три ключевые роли: Ребенка, Взрослого и Родителя. Этот метод позволяет осознать, какие из этих ролей доминируют в жизни, как они влияют на решения и взаимодействия, и помогает изменить шаблоны поведения, которые приводят к конфликтам и внутренним противоречиям.
          </p>
          <p>
            Однако каждый клиент — это отдельное пространство, и мы подбираем подходы индивидуально. Помимо транзактного анализа, мы используем техники других направлений, выбирая самое эффективное для каждого конкретного случая.
          </p>

          <h3 className="underline decoration-mint decoration-4 text-2xl text-purple pt-3">
            Что мы предлагаем?
          </h3>
          <p>
            Мы создаем пространство, где каждый может исследовать свои тревоги и внутренние конфликты. Наш подход сочетает глубокую работу над личными установками с поиском практических решений. Мы верим, что каждый человек способен обрести гармонию, если его вовремя поддержать. Онлайн-формат консультаций дает возможность быть рядом, где бы вы ни находились, и сопровождать вас на пути к осознанию и внутреннему покою.
          </p>
          <div className="mt-10">
            <LinkTo label="Продолжить" href="/about" variant={ButtonVariant.Primary} />
          </div>
        </div>
        <div className="block-right md:w-1/2 flex justify-center mt-0 lg:-mt-24 ">
          <div className="relative w-full lg:w-3/4">
            <Image
              src="/images/about-us-home.png"
              alt="About Us"
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
