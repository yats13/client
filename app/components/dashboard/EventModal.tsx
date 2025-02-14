'use client';

import type { CalendarEvent } from '@/app/types/appointment';
import { AppointmentStatus, AppointmentStatusLabels } from '@/app/types/enums/AppointmentStatus';

type EventModalProps = {
  event: CalendarEvent | null;
  onClose: () => void;
  onStatusChange: (status: AppointmentStatus) => void;
};

const statusActions = [
  { status: AppointmentStatus.IN_PROGRESS, label: 'Начать', className: 'bg-blue-100 text-blue-900 hover:bg-blue-200' },
  { status: AppointmentStatus.PASSED, label: 'Завершить', className: 'bg-green-100 text-green-900 hover:bg-green-200' },
  { status: AppointmentStatus.CANCELED, label: 'Отменить', className: 'bg-red-100 text-red-900 hover:bg-red-200' },
] as const;

export default function EventModal({ event, onClose, onStatusChange }: EventModalProps) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {event.title}
          </h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500">
              Email: {event.extendedProps.email}
            </p>
            <p className="text-sm text-gray-500">
              Телефон: {event.extendedProps.phone}
            </p>
            <p className="text-sm text-gray-500">
              Статус: {AppointmentStatusLabels[event.extendedProps.status]}
            </p>
            <p className="text-sm text-gray-500">
              Психолог: {event.extendedProps.psychologist.name}
            </p>
          </div>

          <div className="mt-6 flex gap-2">
            {statusActions.map(({ status, label, className }) => (
              <button
                key={status}
                type="button"
                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium ${className}`}
                onClick={() => onStatusChange(status)}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
