import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';
const TIMEZONE = process.env.TIMEZONE!;

// Initialize OAuth2 Client
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const createGoogleCalendarEvent = async (formData, selectedDate, selectedTime, psychologistSlug) => {
    try {
        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${formData.name}\nEmail: ${formData.email}\nТелефон: ${formData.phone}`,
            start: {
                dateTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00Z`).toISOString(),
                timeZone: TIMEZONE
            },
            end: {
                dateTime: new Date(new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00Z`).getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: TIMEZONE
            },
            attendees: [{ email: formData.email }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 } // 30 min before
                ]
            }
        };

        const response = await calendar.events.insert({
            calendarId: CALENDAR_ID,
            resource: event
        });

        return response.data;
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        throw new Error('Не удалось создать событие в календаре');
    }
};
