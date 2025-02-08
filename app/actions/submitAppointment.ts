'use server';

import { createGoogleCalendarEvent } from '../services/googleCalendar';

interface AppointmentResponse {
    name: string;
    email: string;
    phone: string;
    psychologistSlug: string;
    id: string;
    dateTime: Date;
    meetLink?: string;
    createdAt: Date;
}

export type FormState = {
    success: boolean;
    error?: string;
    appointment?: AppointmentResponse;
}

export const initialState: FormState = {
    success: false,
    error: '',
    appointment: undefined
};

export async function submitAppointment(
    formData: FormData
): Promise<FormState> {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return { 
            success: false, 
            error: 'Ошибка конфигурации сервера не удалось получить данные из .env',
            appointment: undefined
        };
    }

    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const dateTime = new Date(formData.get('selectedDate') as string);

        const event = await createGoogleCalendarEvent({
            name,
            email,
            phone,
            dateTime
        });

        return { 
            success: true, 
            appointment: {
                name,
                email,
                phone,
                psychologistSlug: formData.get('psychologistSlug') as string,
                id: event.id ?? '',
                dateTime,
                meetLink: event.hangoutLink ?? undefined,
                createdAt: new Date()
            }
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            success: false, 
            error: 'Ошибка при создании записи'
        };
    }
}
