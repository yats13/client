import React from 'react';
import Image from 'next/image';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import { PsychologistProps } from '@/app/types/props/PsychologistProps';
import LinkTo from '@/app/components/link-to';
import type { psychologist } from '@prisma/client';

export default function PsychologistCard({psychologist}: {psychologist:PsychologistProps}) {
    return (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                {/* Image Section */}
                <div className="md:shrink-0">
                    <Image
                        src={psychologist.image}
                        alt={psychologist.name}
                        width={200}
                        height={200}
                        className="h-full w-auto object-cover"
                    />
                </div>
                {/* Content Section */}
                <div className="flex flex-col p-8 justify-center">
                    <h3 className="block mt-1 text-xl leading-tight font-medium text-black">
                        {psychologist.name}
                    </h3>
                    <div className="uppercase tracking-wide text-sm font-semibold">
                        {psychologist.title}
                    </div>
                    <div className={`w-full h-2  rounded-full`}></div>
                    <p className="mt-2 mb-6">{psychologist.description}</p> 
                    <LinkTo label="Записаться" href={`/calendar?specialist=${psychologist.slug}`} variant={ButtonVariant.Primary} />
                </div>
            </div>
        </div>
    );
};
