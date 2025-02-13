'use client';

import React from 'react';
import { AppointmentStatus, appointmentStatusLabels } from '@/app/types/enums/AppointmentStatus';
import { useState } from 'react';

interface EventModalProps {
    event: {
        title: string;
        extendedProps?: {
            email: string;
            phone: string;
            status: AppointmentStatus;
            psychologistSlug: string;
        };
    } | null;
    onClose: () => void;
    onStatusChange: (newStatus: AppointmentStatus) => Promise<void>;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onStatusChange }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    if (!event) return null;

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as AppointmentStatus;
        setIsUpdating(true);
        try {
            await onStatusChange(newStatus);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">{event.title}</h3>
                <div className="space-y-4">
                    <p><strong>Email:</strong> {event.extendedProps?.email}</p>
                    <p><strong>Phone:</strong> {event.extendedProps?.phone}</p>
                    <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <select
                            value={event.extendedProps?.status}
                            onChange={handleStatusChange}
                            disabled={isUpdating}
                            className={`border rounded-lg px-3 py-1.5 ${
                                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                            } focus:outline-none focus:ring-2 focus:ring-purple/50`}
                        >
                            {Object.entries(AppointmentStatus).map(([key, value]) => (
                                <option key={value} value={value}>
                                    {appointmentStatusLabels[value]}
                                </option>
                            ))}
                        </select>
                        {isUpdating && (
                            <div className="w-4 h-4 border-2 border-purple border-t-transparent rounded-full animate-spin"></div>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isUpdating}
                        className={`px-4 py-2 rounded transition-colors ${
                            isUpdating
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
