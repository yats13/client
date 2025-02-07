'use server';

import { google } from 'googleapis';
import dotenv from 'dotenv';

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
        const selectedDate = formData.get('selectedDate') as string;
        const selectedTime = formData.get('selectedTime') as string;
        const psychologistSlug = formData.get('psychologistSlug') as string;

        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: new Date(`${selectedDate}T${selectedTime}:00Z`).toISOString(),
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
            },
            end: {
                dateTime: new Date(new Date(`${selectedDate}T${selectedTime}:00Z`).getTime() + 60 * 60 * 1000).toISOString(),
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
        };

        await calendar.events.insert({
            auth: oauth2Client,
            calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
            requestBody: event,
        });

        return { success: true, message: 'Запись успешно отправлена!' };
    } catch (error) {
        console.error('Google Calendar Error:', error);
        return { success: false, message: 'Ошибка при создании события в календаре' };
    }
}
