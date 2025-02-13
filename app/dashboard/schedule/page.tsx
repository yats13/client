'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import PageTitle from '@/app/components/page-titile';
import { getAppointments } from '@/app/actions/getAppointments';
import { updateAppointmentStatus } from '@/app/actions/updateAppointmentStatus';
import PsychologistSelector from '@/app/components/dashboard/PsychologistSelector';
import EventModal from '@/app/components/dashboard/EventModal';
import { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';
import DashboardMenu from "@/app/components/dashboard/DashboardMenu";

interface Psychologist {
  slug: string;
  name: string;
  email?: string;
  phone?: string;
  specialization?: string;
  imageUrl?: string;
  // Add any other required psychologist properties
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps?: {
    email: string;
    phone: string;
    status: AppointmentStatus;
    psychologistSlug: string;  // Keep the original property
    psychologistData: Psychologist;  // Add full psychologist data
    psychologist?: Psychologist;  // For backwards compatibility
  };
}

export default function DashboardSchedulePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async (psychologistId?: string | null) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getAppointments(psychologistId);
      if (result.success && result.appointments) {
        // Transform the data to match CalendarEvent interface
        const transformedEvents = result.appointments.map(apt => ({
          ...apt,
          extendedProps: {
            ...apt.extendedProps,
            // Ensure we maintain the original psychologistSlug
            psychologistSlug: apt.extendedProps.psychologistSlug,
            // Create the psychologist object with all available data
            psychologist: {
              slug: apt.extendedProps.psychologistSlug,
              name: apt.title.split(' - ')[0],
              email: apt.extendedProps.psychologistData?.email,
              phone: apt.extendedProps.psychologistData?.phone,
              specialization: apt.extendedProps.psychologistData?.specialization,
              imageUrl: apt.extendedProps.psychologistData?.imageUrl,
              // Include any other psychologist properties from psychologistData
              ...apt.extendedProps.psychologistData
            }
          }
        }));
        setEvents(transformedEvents);
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
    const event = clickInfo.event;
    // Create a new date object in local timezone
    const localStart = new Date(event.start!.getTime() - event.start!.getTimezoneOffset() * 60000);
    const localEnd = new Date(event.end!.getTime() - event.end!.getTimezoneOffset() * 60000);
    
    setSelectedEvent({
      ...event.toPlainObject(),
      start: localStart.toISOString(),
      end: localEnd.toISOString()
    } as CalendarEvent);
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

  const formatUTCDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-full mx-auto py-8">
        <PageTitle text="Ежедневник"/>

      <div className="flex justify-between items-center mb-8">
        <DashboardMenu/>

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
          timeZone="local"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          slotMinTime="09:00:00"
          slotMaxTime="18:00:00"
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
