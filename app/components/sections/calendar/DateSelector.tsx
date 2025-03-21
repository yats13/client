'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CalendarHeader from '@/app/components/calendar/CalendarHeader';
import CalendarGrid from '@/app/components/calendar/CalendarGrid';
import { getInitialDate, getUpdatedDate, getDaysInMonth } from '@/app/types/services/calendar-service';
import { CalendarProps } from '@/app/types/props/CalendarProps';
import { DateState } from '@/app/types/props/DateState';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const DateSelector: React.FC<CalendarProps> = ({ onDateSelect }) => {
    const [dateState, setDateState] = useState<DateState>(() => {
    const initialDate = getInitialDate();
    return {
      selectedDay: initialDate.getDate(),
      month: initialDate.getMonth(),
      year: initialDate.getFullYear(),
      initialDate,
    };
  });

  const { selectedDay, month, year, initialDate } = dateState;

  // Set the initial date on mount
  useEffect(() => {
    onDateSelect(initialDate);
  }, [onDateSelect, initialDate]);

  const daysInMonth = useMemo(() => getDaysInMonth(month, year), [month, year]);

  const handleDateSelect = useCallback(
    (day: number) => {
      const selectedDate = new Date(year, month, day);
      selectedDate.setHours(0, 0, 0, 0);
      setDateState((prevState) => ({
        ...prevState,
        selectedDay: day,
      }));
      onDateSelect(selectedDate);
    },
    [month, year, onDateSelect]
  );

  const handlePreviousMonth = () => {
    const { month: newMonth, year: newYear } = getUpdatedDate(month, year, -1);
    setDateState({
      selectedDay: null, // Reset selected day
      month: newMonth,
      year: newYear,
      initialDate,
    });
    onDateSelect(null); // Notify parent that the date selection is reset
  };

  const handleNextMonth = () => {
    const { month: newMonth, year: newYear } = getUpdatedDate(month, year, 1);
    setDateState({
      selectedDay: null,
      month: newMonth,
      year: newYear,
      initialDate,
    });
    onDateSelect(null);
  };

  return (
    <div className="border p-6 m-2 rounded-3xl border-gray-300">
      <CalendarHeader
        month={month}
        year={year}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        today={initialDate}
      />
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-gray-500 text-sm py-2">
            {day}
          </div>
        ))}
      </div>
      <CalendarGrid
        daysInMonth={daysInMonth}
        month={month}
        year={year}
        today={initialDate}
        selectedDay={selectedDay}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default DateSelector;
