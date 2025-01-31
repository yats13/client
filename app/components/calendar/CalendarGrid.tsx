// CalendarGrid.tsx
import React from 'react';
import CalendarDay from '@/app/components/calendar/CalendarDay';
import { CalendarGridProps } from '@/app/types/props/CalendarGridProps';


const CalendarGrid: React.FC<CalendarGridProps> = ({ daysInMonth, month, year, today, selectedDay, onDateSelect }) => {
    const isPastDate = (day: number): boolean => {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date.getTime() < today.getTime();
    };

    const isTodayAndPastTimeLimit = (day: number): boolean => {
        const currentHour = today.getHours();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear() && currentHour >= 16;
    };

    return (
        <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const isDisabled = isPastDate(day) || isTodayAndPastTimeLimit(day);
                return (
                    <CalendarDay
                        key={day}
                        day={day}
                        isSelected={selectedDay === day}
                        isDisabled={isDisabled}
                        onDateSelect={() => onDateSelect(day)} // Ensure onDateSelect is used correctly
                    />
                );
            })}
        </div>
    );
};

export default CalendarGrid;
