'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
    id: number;
    title: string;
    subtitle?: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    defaultOpenId?: number;
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ 
    items, 
    defaultOpenId = 1,
    className = ''
}) => {
    const [activeId, setActiveId] = useState<number>(defaultOpenId);

    const toggleAccordion = (id: number) => {
        setActiveId(activeId === id ? id : id);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item) => (
                <div 
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                >
                    <button
                        onClick={() => toggleAccordion(item.id)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                            activeId === item.id ? 'bg-mint/10' : 'bg-white hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-purple">
                                {item.title}
                            </h3>
                            {item.subtitle && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.subtitle}
                                </p>
                            )}
                        </div>
                        <ChevronDownIcon 
                            className={`w-5 h-5 text-primary transition-transform duration-300 ${
                                activeId === item.id ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    
                    <div 
                        className={`transition-all duration-300 ease-in-out ${
                            activeId === item.id ? 'max-h-[1000px]' : 'max-h-0'
                        } overflow-hidden`}
                    >
                        <div className="p-4 bg-white">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion; 