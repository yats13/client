'use client';

import { useActionState, useOptimistic } from 'react';
import { submitAppointment } from '@/app/actions/submitAppointment';
import Button from '@/app/components/button';
import { ButtonVariant } from '@/app/types/enums/ButtonVariant';
import { motion } from 'framer-motion';
import type { FormState } from '@/app/types/appointment';
import type { FormAction, FormSubmitHandler } from '@/app/types/form';
import { ERRORS } from '@/app/constants/errors';
import { MESSAGES } from '@/app/constants/messages';

type AppointmentFormProps = {
    selectedDate: Date;
    selectedTime: string;
    psychologistSlug: string;
};

const initialState: FormState = {
    success: false,
};

const inputClassName = 'w-full border border-gray-500 bg-transparent rounded-full px-4 py-2 placeholder-gray-500';

export default function AppointmentForm({ selectedDate, selectedTime, psychologistSlug }: AppointmentFormProps) {
    const boundSubmitAppointment: FormAction = async (prevState: FormState, formData: FormData) => {
        const agree = formData.get('agree');
        if (!agree) {
            return {
                success: false,
                error: ERRORS.GENERIC.VALIDATION,
            };
        }

        formData.append('selectedDate', selectedDate.toLocaleString());
        formData.append('selectedTime', selectedTime);
        formData.append('psychologistSlug', psychologistSlug);

        return submitAppointment(formData);
    };

    const [state, formAction] = useActionState<FormState, FormData>(boundSubmitAppointment, initialState);
    const [optimistic, addOptimistic] = useOptimistic(false);

    const handleSubmit: FormSubmitHandler = (formData) => {
        addOptimistic(true);
        formAction(formData);
    };

    return (
        <form action={handleSubmit} className="w-full max-w-md mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-around gap-4 my-5">
                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        {MESSAGES.LABELS.NAME}: {state.appointment?.name}
                    </p>
                ) : (
                    <input
                        type="text"
                        name="name"
                        placeholder={MESSAGES.LABELS.NAME}
                        required
                        className={inputClassName}
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        {MESSAGES.LABELS.EMAIL}: {state.appointment?.email}
                    </p>
                ) : (
                    <input
                        type="email"
                        name="email"
                        placeholder={MESSAGES.LABELS.EMAIL}
                        required
                        className={inputClassName}
                        disabled={state.success}
                    />
                )}

                {state.success ? (
                    <p className="text-gray-700 bg-transparent rounded-full px-4 py-2 text-center">
                        {MESSAGES.LABELS.PHONE}: {state.appointment?.phone}
                    </p>
                ) : (
                    <input
                        type="tel"
                        name="phone"
                        placeholder={MESSAGES.LABELS.PHONE}
                        required
                        className={inputClassName}
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
                        required
                        className="w-4 h-4 text-mint rounded-sm accent-mint"
                        disabled={state.success}
                    />
                    <label htmlFor="agree" className="ms-2 text-sm font-medium text-primary">
                        {MESSAGES.FORM.AGREE}
                    </label>
                </div>
            )}

            <div className="flex justify-center my-5">
                {state.success ? (
                    <p className="bg-mint py-2 px-6 rounded-full font-bold text-lg text-center">
                        {MESSAGES.FORM.SUCCESS}
                    </p>
                ) : (
                    <Button
                        label={optimistic ? MESSAGES.FORM.SUBMITTING : MESSAGES.FORM.SUBMIT}
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
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="py-2 text-center text-sm text-primary bg-purple rounded-t-3xl w-full"
                >
                    {state.error}
                </motion.p>
            )}
        </form>
    );
}
