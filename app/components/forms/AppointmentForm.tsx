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
const initialState = {
    success: false,
    message: '',
};
const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate, selectedTime, psychologistSlug }) => {
    const [state, formAction] = useFormState(submitAppointment, initialState);
    const { pending } = useFormStatus();

    return (
        <form onSubmit={(e) => handleSubmit(e, selectedDate, selectedTime, psychologistSlug, submitAppointment)}>
            <div className="flex justify-around m-5 gap-3 text-gray-700">
                {isSuccess ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Имя: {formData.name}
                    </p>
                ) : (
                    <input
                        type="text"
                        id="name"
                        placeholder="Имя"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={isSuccess}
                    />
                )}

                {isSuccess ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Email: {formData.email}
                    </p>
                ) : (
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={isSuccess}
                    />
                )}

                {isSuccess ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-6 py-2">
                        Телефон: {formData.phone}
                    </p>
                ) : (
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-500 bg-transparent rounded-full px-6 placeholder-gray-500"
                        disabled={isSuccess}
                    />
                )}
            </div>

            {!isSuccess && <div className="flex items-center m-5">
                <input
                    id="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="w-4 h-4 text-mint rounded-sm accent-mint"
                    disabled={isSuccess}
                />
                <label htmlFor="agree" className="ms-2 text-sm font-medium text-primary">
                    Подтверждаю обработку данных
                </label>
            </div>}

            <div className='flex justify-center my-3'>
                {isSuccess ? (
                    <p className="bg-mint py-2 px-4 rounded-full font-bold text-lg">Запись успешно отправлена!</p>
                ) : (
                    <Button
                        label={isSubmitting ? "Отправка..." : "Записаться"}
                        variant={ButtonVariant.Outline}
                    />
                )}
            </div>

            {message && !isSuccess && <p className="py-2 text-center text-sm text-primary bg-purple">{message}</p>}
        </form>
    );
};

export default AppointmentForm;
