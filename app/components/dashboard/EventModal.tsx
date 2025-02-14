'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AppointmentStatus, AppointmentStatusLabels } from '@/app/types/enums/AppointmentStatus';
import type { CalendarEvent } from '@/app/types/appointment';

type EventModalProps = {
  event: CalendarEvent | null;
  onClose: () => void;
  onStatusChange: (status: AppointmentStatus) => void;
};

const statusActions = [
  { status: AppointmentStatus.IN_PROGRESS, label: 'Начать', className: 'bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500' },
  { status: AppointmentStatus.PASSED, label: 'Завершить', className: 'bg-green-100 text-green-900 hover:bg-green-200 focus-visible:ring-green-500' },
  { status: AppointmentStatus.CANCELED, label: 'Отменить', className: 'bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500' },
] as const;

export default function EventModal({ event, onClose, onStatusChange }: EventModalProps) {
  if (!event) return null;

  return (
    <Transition appear show={!!event} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {event.title}
                </Dialog.Title>
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
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
                      onClick={() => onStatusChange(status)}
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Закрыть
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
