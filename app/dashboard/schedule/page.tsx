'use client';

import { useEffect, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg } from '@fullcalendar/core';
import PageTitle from '@/app/components/page-titile';
import { getAppointments } from '@/app/actions/getAppointments';
import { updateAppointmentStatus } from '@/app/actions/updateAppointmentStatus';
import PsychologistSelector from '@/app/components/dashboard/PsychologistSelector';
import EventModal from '@/app/components/dashboard/EventModal';
import { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';
import DashboardMenu from '@/app/components/dashboard/DashboardMenu';
import type { CalendarEvent } from '@/app/types/appointment';
import { BUSINESS_HOURS } from '@/app/constants/time';
import { ERRORS } from '@/app/constants/errors';
import type { ApiResponse } from '@/app/types/api';

export default function DashboardSchedulePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getAppointments(selectedPsychologist);
      
      if (!result.success) {
        throw new Error(result.error || ERRORS.FETCH.APPOINTMENTS);
      }
      
      setEvents(result.appointments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERRORS.GENERIC.LOADING);
      console.error('Error loading appointments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPsychologist]);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const localStart = new Date(event.start!.getTime() - event.start!.getTimezoneOffset() * 60000);
    const localEnd = new Date(event.end!.getTime() - event.end!.getTimezoneOffset() * 60000);
    
    setSelectedEvent({
      ...event.toPlainObject(),
      start: localStart.toISOString(),
      end: localEnd.toISOString(),
      extendedProps: {
        ...event.extendedProps,
        psychologist: event.extendedProps.psychologist,
      },
    } as CalendarEvent);
  }, []);

  const handleStatusChange = useCallback(async (newStatus: AppointmentStatus) => {
    if (!selectedEvent) return;

    try {
      const result = await updateAppointmentStatus(selectedEvent.id, newStatus);
      if (!result.success) {
        throw new Error(ERRORS.UPDATE.STATUS);
      }

      const updatedEvent = {
        ...selectedEvent,
        extendedProps: {
          ...selectedEvent.extendedProps,
          status: newStatus,
        },
      };

      setEvents((prevEvents) => 
        prevEvents.map((event) => event.id === selectedEvent.id ? updatedEvent : event),
      );
      setSelectedEvent(updatedEvent);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERRORS.UPDATE.STATUS);
    }
  }, [selectedEvent]);

  const handleCloseModal = useCallback(() => setSelectedEvent(null), []);

  return (
    <div className="w-full mx-auto py-8">
      <PageTitle text="Ежедневник"/>
      <div className="flex justify-between items-center mb-8">
        <DashboardMenu/>
        <PsychologistSelector
          onSelect={setSelectedPsychologist}
          selectedId={selectedPsychologist}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}

      <div className={isLoading ? 'opacity-50' : ''}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          eventClick={handleEventClick}
          timeZone="local"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          slotMinTime={BUSINESS_HOURS.start}
          slotMaxTime={BUSINESS_HOURS.end}
          allDaySlot={false}
          locale="ru"
        />
      </div>

      <EventModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
