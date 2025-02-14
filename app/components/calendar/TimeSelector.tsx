import { useMemo } from 'react';
import type { CalendarEvent } from '@/app/types/appointment';
import { BUSINESS_HOURS } from '@/app/constants/time';
import { AppointmentStatus } from '@prisma/client';

interface TimeSelectorProps {
  selectedDate: Date;
  psychologistId: string;
  appointments: CalendarEvent[];
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

export default function TimeSelector({ 
  selectedDate, 
  psychologistId, 
  appointments = [],
  onTimeSelect, 
  selectedTime 
}: TimeSelectorProps) {
    const timeSlots = useMemo(() => {
    const slots: { time: string; isDisabled: boolean }[] = [];
    const [startHour] = BUSINESS_HOURS.start.split(':').map(Number);
    const [endHour] = BUSINESS_HOURS.end.split(':').map(Number);
console.log(appointments);
    // Get booked times for selected date and psychologist
    const bookedTimes = (appointments || [])
      .filter(apt => {
        const aptDate = new Date(apt.start);
        const selectedDateTime = new Date(selectedDate);
        const isMatch = (
          apt.extendedProps.psychologistId === Number(psychologistId) &&
          aptDate.getFullYear() === selectedDate.getFullYear() &&
          aptDate.getMonth() === selectedDate.getMonth() &&
          aptDate.getDate() === selectedDate.getDate() &&
          apt.extendedProps.status !== AppointmentStatus.CANCELED
        );
        
        return isMatch;
      })
      .map(apt => {
        const date = new Date(apt.start);
        return date.getHours();
      });

    // Generate time slots
    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      slots.push({
        time: timeString,
        isDisabled: bookedTimes.includes(hour)
      });
    }

    return slots;
  }, [selectedDate, psychologistId, appointments]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map(({ time, isDisabled }) => (
        <button
          key={time}
          onClick={() => !isDisabled && onTimeSelect(time)}
          disabled={isDisabled}
          className={`
            py-2 px-4 rounded-full text-sm transition-colors
            ${isDisabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : selectedTime === time
                ? 'bg-purple text-white'
                : 'bg-gray-100 hover:bg-mint/35 hover:text-purple'
            }
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
} 