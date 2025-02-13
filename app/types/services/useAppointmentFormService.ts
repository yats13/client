import { useState } from 'react';
import { validateAppointment } from '@/app/types/utils/validateAppointment';

interface AppointmentFormState {
    name: string;
    email: string;
    phone: string;
    agree: boolean;
}

export function useAppointmentFormService() {
    const [formData, setFormData] = useState<AppointmentFormState>({
        name: '',
        email: '',
        phone: '',
        agree: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        selectedDate: Date,
        selectedTime: string,
        psychologistSlug: string,
        submitAppointment: (formData: FormData) => Promise<{ success: boolean; error?: string }>
    ) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setIsSuccess(false);

        // Validate input fields
        const validationError = validateAppointment(formData);
        if (validationError) {
            setMessage(validationError);
            setIsSubmitting(false);
            return;
        }

        // Prepare form data
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('date', selectedDate.toISOString());
        formDataToSend.append('time', selectedTime);
        formDataToSend.append('psychologistSlug', psychologistSlug);

        try {
            // Submit the appointment to your backend
            const result = await submitAppointment(formDataToSend);

            if (result.success) {
                setMessage('Запись 123 успешно отправлена!');
                setIsSuccess(true);
            } else {
                setMessage(result.error || 'Ошибка при отправке формы.');
            }
        } catch (error) {
            setMessage('Ошибка при создании записи.');
            console.error('Error creating appointment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { formData, handleChange, handleSubmit, isSubmitting, message, isSuccess };
}
