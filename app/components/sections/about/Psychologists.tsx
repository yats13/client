import React from 'react';
import prisma from '@/prisma/db';
import PsychologistsCard from './PsychologistCard';

export default async function Psychologists() {
    const psychologists = await prisma.psychologist.findMany();
    return (
        <div className="flex justify-around mb-20 bg-lightPurple py-20">
            {psychologists.map((psychologist) => (
                <PsychologistsCard key={psychologist.id} psychologist={psychologist} />
            ))}
        </div>
    );
};
