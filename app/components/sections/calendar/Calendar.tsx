'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpecialistSelector from '@/app/components/sections/calendar/SpecialistSelector';
import SubmitSelected from '@/app/components/sections/calendar/SubmitSelected';
import { handleBookingSubmit } from '@/app/types/services/handle-submit';
import type { CalendarEvent } from '@/app/types/appointment';
import type { SpecialistSelectorProps } from '@/app/types/props/SpecialistSelectorProps';
import type { PsychologistProps } from '@/app/types/props/PsychologistProps';
import { getAppointments } from '@/app/actions/getAppointments';

const DateSelector = dynamic(() => import('@/app/components/sections/calendar/DateSelector'), { ssr: false });
const TimePicker = dynamic(() => import('@/app/components/sections/calendar/TimePicker'), { ssr: false });

const Calendar: React.FC<SpecialistSelectorProps> = ({ psychologists }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedSpecialist, setSelectedSpecialist] = useState<PsychologistProps | null>(null);
    const [appointments, setAppointments] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        if (selectedSpecialist) {
            const fetchAppointments = async () => {
                const result = await getAppointments(selectedSpecialist.id);
                if (result.success && result.appointments) {
                    setAppointments(result.appointments);
                }
            };
            fetchAppointments();
        }
    }, [selectedSpecialist]);

    const handleSubmit = () => {
        handleBookingSubmit(selectedDate, selectedTime, selectedSpecialist);
    };

    return (
        <>
            <div className="flex bg-gray-100 py-10 justify-center">
                <div className="m-4 p-4 rounded-3xl shadow-lg bg-white flex flex-col md:flex-row">
                    <div className="m-4 p-4">
                        <h3 className="text-center font-bold text-3xl text-purple mb-4">
                            Выберите дату и время
                        </h3>
                        <div className="flex flex-col lg:flex-row">
                            <DateSelector onDateSelect={setSelectedDate} />
                            {selectedDate && (
                                <TimePicker 
                                    selectedDate={selectedDate} 
                                    onTimeSelect={setSelectedTime}
                                    selectedPsychologist={selectedSpecialist?.id.toString() ?? ''}
                                    appointments={appointments}
                                />
                            )}
                        </div>
                    </div>
                    <SpecialistSelector psychologists={psychologists} onSpecialistSelect={setSelectedSpecialist} />
                </div>
            </div>

            {selectedDate && selectedTime && selectedSpecialist && (
                <SubmitSelected
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    selectedSpecialist={selectedSpecialist}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default Calendar;
