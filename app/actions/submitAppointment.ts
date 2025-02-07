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

export async function submitAppointment(formData: FormData) {
    if (typeof window !== 'undefined') {
        return { 
            success: false, 
            error: 'This action can only be performed on the server',
            appointment: undefined
        };
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return { 
            success: false, 
            error: 'Ошибка конфигурации сервера',
            appointment: undefined
        };
    }

    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const dateTime = new Date(formData.get('selectedDate') as string);

        const response = await createGoogleCalendarEvent({
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
                id: response.data.id!,
                dateTime,
                meetLink: response.data.hangoutLink,
                createdAt: new Date()
            }
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            success: false, 
            error: 'Ошибка при создании записи',
            appointment: undefined
        };
    }
}
