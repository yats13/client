'use client';

import { useState, useEffect } from 'react';
import type { Appointment } from '@prisma/client';
import { getAppointments } from '@/app/actions/getAppointments';
import TimeSelector from '@/app/components/calendar/TimeSelector';
import type { CalendarEvent } from '@/app/types/appointment';

interface AppointmentPageProps {
  selectedPsychologist: string;
  selectedDate: Date;
}

export default function AppointmentPage({ selectedPsychologist, selectedDate }: AppointmentPageProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (selectedPsychologist && selectedDate) {
      const fetchAppointments = async () => {
        const result = await getAppointments(Number(selectedPsychologist));
        if (result.success && result.appointments) {
          setAppointments(result.appointments as CalendarEvent[]);
        }
      };
      fetchAppointments();
    }
  }, [selectedPsychologist, selectedDate]);

  return (
    <div>
      {selectedDate && selectedPsychologist && (
        <TimeSelector
          selectedDate={selectedDate}
          psychologistId={selectedPsychologist}
          appointments={appointments}
          onTimeSelect={setSelectedTime}
          selectedTime={selectedTime}
        />
      )}
    </div>
  );
} 