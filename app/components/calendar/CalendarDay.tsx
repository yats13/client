import React from 'react';
import type { CalendarDayProps } from '@/app/types/props/calendar';

export default function CalendarDay({ day, isSelected, isDisabled, onDateSelect }: CalendarDayProps) {
    return (
        <button
            className={`w-8 h-8 rounded-full transition-colors ${
                isDisabled 
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                    : isSelected 
                        ? 'bg-purple text-white' 
                        : 'bg-gray-100 hover:bg-mint/35 hover:text-purple'
            }`}
            onClick={onDateSelect}
            disabled={isDisabled}
            aria-label={`Select ${day}`}
        >
            {day}
        </button>
    );
}
