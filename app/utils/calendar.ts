import type { CalendarEvent } from '@/app/types/appointment';
import { BUSINESS_HOURS } from '@/app/constants/time';
import { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';

export function getBusinessHours() {
  return {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 0 = Sunday, 1 = Monday, etc.
    startTime: BUSINESS_HOURS.start,
    endTime: BUSINESS_HOURS.end,
  };
}

export function getBlockedTimes(events: CalendarEvent[], psychologistId?: number | null) {
  return events
    .filter(event => {
      // Filter events that are not canceled and either:
      // - belong to the selected psychologist
      // - or block the time slot for all psychologists if no specific one is selected
      const isActive = event.extendedProps.status !== AppointmentStatus.CANCELED;
      const matchesPsychologist = !psychologistId || event.extendedProps.psychologistId === psychologistId;
      return isActive && matchesPsychologist;
    })
    .map(event => ({
      start: new Date(event.start),
      end: new Date(event.end),
      display: 'background',
      backgroundColor: 'rgba(220, 220, 220, 0.5)',
      overlap: false,
      classNames: ['blocked-time'],
    }));
} 