'use client';

import { addDays } from '@/app/utils/date';

export function isDateDisabled(date: Date): boolean {
  const tomorrow = addDays(new Date(), 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  // Disable if date is before tomorrow
  return checkDate < tomorrow;
}

export function getValidDate(date: Date): Date {
  return addDays(date, 1);
}

export const getInitialDate = (): Date => {
  const tomorrow = addDays(new Date(), 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

export const getUpdatedDate = (month: number, year: number, offset: number) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
    } else if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
    }

    return { month: newMonth, year: newYear };
};

export function getDaysInMonth(month: number, year: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let firstDayOfWeek = firstDay.getDay();
    // Convert Sunday from 0 to 7 to match our Monday-first calendar
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    // Adjust to make Monday = 1
    firstDayOfWeek--;

    return {
        totalDays: daysInMonth,
        firstDayOfWeek: firstDayOfWeek
    };
}
