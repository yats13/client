'use client';

export const isAfter1630 = () => {
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    return currentHour > 16 || (currentHour === 16 && currentMinutes >= 30);
};

export const getInitialDate = (): Date => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (isAfter1630()) {
        return new Date(now.setDate(now.getDate() + 1)); // Select next day if after 16:30
    }
    return now;
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

export const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
};
