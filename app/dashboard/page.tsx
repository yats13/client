'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import PageTitle from '../components/page-titile';
import { getAppointments } from '../actions/getAppointments';
import { updateAppointmentStatus } from '../actions/updateAppointmentStatus';
import PsychologistSelector from '../components/dashboard/PsychologistSelector';
import EventModal from '../components/dashboard/EventModal';
import { AppointmentStatus } from '../types/enums/AppointmentStatus';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps?: {
    email: string;
    phone: string;
    status: AppointmentStatus;
    psychologistSlug: string;
  };
}

export default function DashboardPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async (psychologistSlug?: string | null) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getAppointments(psychologistSlug);
      if (result.success && result.appointments) {
        setEvents(result.appointments);
      } else {
        setError(result.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError('An error occurred while fetching appointments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedPsychologist);
  }, [selectedPsychologist]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event.toPlainObject() as CalendarEvent);
  };

  const handleStatusChange = async (newStatus: AppointmentStatus) => {
    if (!selectedEvent) return;

    const result = await updateAppointmentStatus(selectedEvent.id, newStatus);
    if (result.success) {
      // Update the local state to reflect the change
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === selectedEvent.id
            ? {
                ...event,
                extendedProps: {
                  ...event.extendedProps!,
                  status: newStatus
                }
              }
            : event
        )
      );
      // Update the selected event
      setSelectedEvent(prev => 
        prev ? {
          ...prev,
          extendedProps: {
            ...prev.extendedProps!,
            status: newStatus
          }
        } : null
      );
    } else {
      setError('Failed to update appointment status');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <PageTitle text="Ежедневник"/>
        <PsychologistSelector
          onSelect={setSelectedPsychologist}
          selectedSlug={selectedPsychologist}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className={isLoading ? 'opacity-50' : ''}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          slotMinTime="09:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          locale="ru"
        />
      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
