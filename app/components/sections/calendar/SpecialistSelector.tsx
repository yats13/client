'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SpecialistSelectorProps } from '@/app/types/props/SpecialistSelectorProps';
import {PsychologistProps} from "@/app/types/props/PsychologistProps";

interface SpecialistSelectorComponentProps extends SpecialistSelectorProps {
    onSpecialistSelect: (psychologist: PsychologistProps) => void;
}

const SpecialistSelector: React.FC<SpecialistSelectorComponentProps> = ({ psychologists, onSpecialistSelect }) => {
    const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null);

    const handleSpecialistClick = (psychologist: PsychologistProps) => {
        setSelectedSpecialist(psychologist.id);
        onSpecialistSelect(psychologist);
    };

    return (
        <div className="m-4 p-4 border-gray-300 flex flex-col">
            <h3 className="text-center font-bold text-3xl text-purple mb-4">Выберите специалиста</h3>
            <div className="grid grid-cols-2 gap-3">
                {psychologists.map((psychologist) => (
                    <div
                        key={psychologist.slug}
                        className={`rounded-3xl cursor-pointer hover:opacity-80 ${
                            selectedSpecialist === psychologist.id ? 'opacity-100' : 'opacity-30'
                        }`}
                        onClick={() => handleSpecialistClick(psychologist)}
                    >
                        <Image
                            src={psychologist.image}
                            alt={psychologist.name}
                            width={180}
                            height={180}
                            className="rounded-t-full mx-auto md:mx-0"
                        />
                        <div className="text-center">
                            <p className={`font-bold p-4 rounded-b-3xl ${psychologist.bg_color}`}>
                                {psychologist.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialistSelector;
