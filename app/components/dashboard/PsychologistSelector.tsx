'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { prisma } from '@/app/lib/prisma';

interface Psychologist {
    slug: string;
    name: string;
}

interface PsychologistSelectorProps {
    onSelect: (slug: string | null) => void;
    selectedSlug: string | null;
}

const PsychologistSelector: React.FC<PsychologistSelectorProps> = ({ onSelect, selectedSlug }) => {
    const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPsychologists = async () => {
            try {
                const response = await fetch('/api/psychologists');
                const data = await response.json();
                setPsychologists(data);
            } catch (error) {
                console.error('Error fetching psychologists:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPsychologists();
    }, []);

    if (isLoading) {
        return <div className="animate-pulse h-10 bg-gray-200 rounded w-48"></div>;
    }

    return (
        <div className="flex items-center gap-4">
            <label htmlFor="psychologist-select" className="text-purple font-semibold">
                Психолог:
            </label>
            <select
                id="psychologist-select"
                value={selectedSlug || ''}
                onChange={(e) => onSelect(e.target.value || null)}
                className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple/50"
            >
                <option value="">Все психологи</option>
                {psychologists.map((psych) => (
                    <option key={psych.slug} value={psych.slug}>
                        {psych.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PsychologistSelector;
