'use client';

import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { submitAppointment } from '@/app/types/services/submitAppointmentService';
import Button from '@/app/components/button';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';

interface AppointmentFormProps {
    selectedDate: Date;
    selectedTime: string;
    psychologistSlug: string;
}

// Update initialState to match the return type of submitAppointment
const initialState = {
    success: false,
    error: '',
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate, selectedTime, psychologistSlug }) => {
    // Create a bound version of submitAppointment that includes our props
    const boundSubmitAppointment = async (prevState: typeof initialState, formData: FormData) => {
        formData.append('selectedDate', selectedDate.toISOString());
        formData.append('selectedTime', selectedTime);
        formData.append('psychologistSlug', psychologistSlug);
        return submitAppointment(formData);
    };

    const [state, formAction] = useFormState(boundSubmitAppointment, initialState);
    const { pending } = useFormStatus();

    return (
        <form action={formAction}>
            <div className="flex justify-around m-5 gap-3 text-gray-700">
                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Имя: {state.appointment?.name}
                    </p>
                ) : (
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Email: {state.appointment?.email}
                    </p>
                ) : (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Телефон: {state.appointment?.phone}
                    </p>
                ) : (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={state.success}
                    />
                )}
            </div>

            {!state.success && <div className="flex items-center m-5">
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
            </div>}

            <div className='flex justify-center my-3'>
                {state.success ? (
                    <p className="bg-mint py-2 px-4 rounded-full font-bold text-lg">Запись успешно отправлена!</p>
                ) : (
                    <Button
                        label={pending ? "Отправка..." : "Записаться"}
                        variant={ButtonVariant.Outline}
                    />
                )}
            </div>

            {state.error && !state.success && (
                <p className="py-2 text-center text-sm text-primary bg-purple">{state.error}</p>
            )}
        </form>
    );
};

export default AppointmentForm;
