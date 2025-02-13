import React from 'react';
import { CalendarHeaderProps } from '@/app/types/props/CalendarHeaderProps';
import { Months, getMonthName } from '@/app/types/enums/Months';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ month, year, onPreviousMonth, onNextMonth, today }) => {
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
};

export default CalendarHeader;
