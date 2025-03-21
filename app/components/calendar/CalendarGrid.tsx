// CalendarGrid.tsx
import React from 'react';
import CalendarDay from '@/app/components/calendar/CalendarDay';
import type { CalendarGridProps } from '@/app/types/props/calendar';

export default function CalendarGrid({ daysInMonth, month, year, today, selectedDay, onDateSelect }: CalendarGridProps) {
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
}
