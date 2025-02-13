// CalendarGrid.tsx
import React from 'react';
import CalendarDay from '@/app/components/calendar/CalendarDay';
import { CalendarGridProps } from '@/app/types/props/CalendarGridProps';

interface CalendarGridProps {
  daysInMonth: {
    totalDays: number;
    firstDayOfWeek: number;
  };
  month: number;
  year: number;
  today: Date;
  selectedDay: number | null;
  onDateSelect: (day: number) => void;
}

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
            {/* Add empty cells for days before the first day of the month */}
            {Array.from({ length: daysInMonth.firstDayOfWeek }, (_, i) => (
                <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {/* Render the actual days */}
            {Array.from({ length: daysInMonth.totalDays }, (_, i) => i + 1).map((day) => {
                const isDisabled = isPastDate(day) || isTodayAndPastTimeLimit(day);
                return (
                    <CalendarDay
                        key={day}
                        day={day}
                        isSelected={selectedDay === day}
                        isDisabled={isDisabled}
                        onDateSelect={() => onDateSelect(day)}
                    />
                );
            })}
        </div>
    );
};

export default CalendarGrid;
