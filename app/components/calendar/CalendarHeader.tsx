import React from 'react';
import type { CalendarHeaderProps } from '@/app/types/props/calendar';
import { getMonthName } from '@/app/types/enums/Months';

export default function CalendarHeader({ month, year, onPreviousMonth, onNextMonth, today }: CalendarHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <button 
                onClick={onPreviousMonth} 
                className="text-purple hover:text-mint transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple/10"
                disabled={year === today.getFullYear() && month <= today.getMonth()}
                aria-label="Previous Month"
            >
                &lt;
            </button>
            <span className="font-semibold text-purple">
                {getMonthName(month, 'ru')} {year}
            </span>
            <button 
                onClick={onNextMonth} 
                className="text-purple hover:text-mint transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple/10"
                aria-label="Next Month"
            >
                &gt;
            </button>
        </div>
    );
}
