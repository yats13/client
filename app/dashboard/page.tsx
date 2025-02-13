'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import PageTitle from '../components/page-titile';
import { getAppointments } from '../actions/getAppointments';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps?: {
    email: string;
    phone: string;
    status: string;
  };
}

export default function DashboardPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getAppointments();
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

    fetchAppointments();
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    setSelectedEvent(event || null);
  };

  if (error) {
    return (
      <div className="p-4">
        <PageTitle>Панель управления</PageTitle>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Ошибка! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageTitle>Панель управления</PageTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-4">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-gray-500">Загрузка записей...</div>
              </div>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                eventClick={handleEventClick}
                slotMinTime="09:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                locale="ru"
                height="auto"
                expandRows={true}
                slotDuration="01:00:00"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Детали записи</h2>
            {selectedEvent ? (
              <div className="space-y-3">
                <p><span className="font-medium">Клиент:</span> {selectedEvent.title}</p>
                <p><span className="font-medium">Email:</span> {selectedEvent.extendedProps?.email}</p>
                <p><span className="font-medium">Телефон:</span> {selectedEvent.extendedProps?.phone}</p>
                <p><span className="font-medium">Статус:</span> {selectedEvent.extendedProps?.status}</p>
                <p><span className="font-medium">Дата:</span> {new Date(selectedEvent.start).toLocaleString('ru-RU')}</p>
              </div>
            ) : (
              <p className="text-gray-500">Выберите запись для просмотра деталей</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
