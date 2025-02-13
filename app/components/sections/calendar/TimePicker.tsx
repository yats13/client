'use client';

import React, { useState, useEffect } from 'react';
import { isTimeDisabled, getValidatedTimeSelection } from '@/app/types/services/time-service';
import { AvailableTimes } from '@/app/types/enums/AvailableTimes';

type TimePickerProps = {
    selectedDate: Date;
    onTimeSelect: (time: string | null) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({ selectedDate, onTimeSelect }) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    useEffect(() => {
        setSelectedTime(null); // Reset selected time when the selected date changes
    }, [selectedDate]);

    if (!currentDate) return null;

    const handleTimeClick = (time: string) => {
        const validatedTime = getValidatedTimeSelection(time, {
            selectedDate,
            selectedTime,
            currentDateTime: currentDate,
        });

        setSelectedTime(validatedTime ?? null);
        onTimeSelect(validatedTime ?? null);
    };

    const renderTimeButtons = () =>
        Object.values(AvailableTimes).map((time) => {
            const disabled = isTimeDisabled(time, {
                selectedDate,
                selectedTime,
                currentDateTime: currentDate,
            });

            const isSelected = time === selectedTime;

            return (
                <button
                    key={time}
                    disabled={disabled}
                    onClick={() => handleTimeClick(time)}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                        disabled
                            ? 'cursor-not-allowed text-gray-300 border-gray-200'
                            : isSelected
                                ? 'bg-purple border-purple text-white'
                                : 'border-gray-200 hover:bg-mint/35 hover:text-purple hover:border-mint'
                    }`}
                >
                    {time}
                </button>
            );
        });

    return (
        <div className="time-picker border border-gray-200 rounded-3xl p-6 m-2 shadow-sm">
            <h3 className="text-center font-semibold text-purple mb-4">Выберите время</h3>
            <div className="grid grid-cols-2 gap-3">{renderTimeButtons()}</div>
        </div>
    );
};

export default TimePicker;
