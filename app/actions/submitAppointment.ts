'use server';

import { google } from 'googleapis';
import dotenv from 'dotenv';

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

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function submitAppointment(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const dateTime = new Date(formData.get('selectedDate') as string);
        const psychologistSlug = formData.get('psychologistSlug') as string;

        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: dateTime.toISOString(),
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
            },
            end: {
                dateTime: new Date(dateTime.getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
            },
            attendees: [{ email }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
            conferenceData: {
                createRequest: {
                    requestId: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' }
                }
            }
        };

        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
            requestBody: event,
            conferenceDataVersion: 1
        });

        return { 
            success: true, 
            appointment: {
                name,
                email,
                phone,
                psychologistSlug,
                id: response.data.id!,
                dateTime,
                meetLink: response.data.hangoutLink,
                createdAt: new Date()
            },
            message: 'Запись успешно отправлена!' 
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
