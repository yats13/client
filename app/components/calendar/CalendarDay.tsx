import React from 'react';

interface CalendarDayProps {
    day: number;
    isSelected: boolean;
    isDisabled: boolean;
    onDateSelect: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isSelected, isDisabled, onDateSelect }) => {
    return (
        <button
            className={`w-8 h-8 rounded-full ${
                isDisabled 
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                    : isSelected 
                        ? 'bg-mint text-zinc-900' 
                        : 'bg-gray-100 hover:bg-mint/35 hover:text-zinc-900'
            }`}
            onClick={onDateSelect}
            disabled={isDisabled}
            aria-label={`Select ${day}`}
        >
            {day}
        </button>
    );
};

export default CalendarDay;
