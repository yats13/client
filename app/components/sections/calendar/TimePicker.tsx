'use client';

import { useState, useEffect } from 'react';
import TimeSelector from '@/app/components/calendar/TimeSelector';
import type { CalendarEvent } from '@/app/types/appointment';

interface TimePickerProps {
  selectedDate: Date;
  selectedPsychologist: string;
  appointments: CalendarEvent[];
  onTimeSelect: (time: string | null) => void;
}

export default function TimePicker({ 
  selectedDate, 
  selectedPsychologist,
  appointments,
  onTimeSelect 
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTime(null); // Reset selected time when date/psychologist changes
  }, [selectedDate, selectedPsychologist]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className="time-picker border border-gray-200 rounded-3xl p-6 m-2 shadow-sm">
      <h3 className="text-center font-semibold text-purple mb-4">Выберите время</h3>
      <TimeSelector
        selectedDate={selectedDate}
        psychologistId={selectedPsychologist}
        appointments={appointments}
        onTimeSelect={handleTimeSelect}
        selectedTime={selectedTime}
      />
    </div>
  );
}
