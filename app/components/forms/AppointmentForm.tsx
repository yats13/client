'use client';

import React from 'react';
import { useActionState, useOptimistic } from "react";
import { submitAppointment } from '@/app/types/services/submitAppointmentService';
import Button from '@/app/components/button';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import { motion } from 'motion/react';

interface AppointmentFormProps {
    selectedDate: Date;
    selectedTime: string;
    psychologistSlug: string;
}

interface AppointmentResponse {
    name: string;
    email: string;
    phone: string;
    psychologistSlug: string;
    id: string;
    dateTime: Date;
    createdAt: Date;
}

interface FormState {
    success: boolean;
    error?: string;
    appointment?: AppointmentResponse;
}

const initialState: FormState = {
    success: false,
    error: undefined,
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate, selectedTime, psychologistSlug }) => {
    const boundSubmitAppointment = async (prevState: FormState, formData: FormData) => {
        formData.append('selectedDate', selectedDate.toISOString());
        formData.append('selectedTime', selectedTime);
        formData.append('psychologistSlug', psychologistSlug);
        return submitAppointment(formData);
    };

    const [state, formAction] = useActionState(boundSubmitAppointment, initialState);
    const [optimistic, addOptimistic] = useOptimistic(false);

    return (
        <form action={formAction} className="w-full max-w-md mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-around gap-4 my-5">
                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        Имя: {state.appointment?.name}
                    </p>
                ) : (
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        className="w-full border border-gray-500 bg-transparent rounded-full px-4 py-2 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        Email: {state.appointment?.email}
                    </p>
                ) : (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border border-gray-500 bg-transparent rounded-full px-4 py-2 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        Телефон: {state.appointment?.phone}
                    </p>
                ) : (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        className="w-full border border-gray-500 bg-transparent rounded-full px-4 py-2 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}
            </div>

            {!state.success && (
                <div className="flex items-center justify-center my-5">
                    <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        className="w-4 h-4 text-mint rounded-sm accent-mint"
                        disabled={state.success}
                    />
                    <label htmlFor="agree" className="ms-2 text-sm font-medium text-primary">
                        Подтверждаю обработку данных
                    </label>
                </div>
            )}

            <div className='flex justify-center my-5'>
                {state.success ? (
                    <p className="bg-mint py-2 px-6 rounded-full font-bold text-lg text-center">
                        Запись успешно отправлена!
                    </p>
                ) : (
                    <Button
                        label={optimistic ? "Отправка..." : "Записаться"}
                        variant={ButtonVariant.Outline}
                        className="w-full md:w-auto"
                        type="submit"
                    />
                )}
            </div>

            {state.error && !state.success && (
                <motion.p 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="py-2 text-center text-sm text-primary bg-purple rounded-t-3xl w-full"
                >
                    {state.error}
                </motion.p>
            )}
        </form>
    );
};

export default AppointmentForm;
