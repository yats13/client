import { AppointmentResponse } from '@/app/types/props/AppointmentResponse';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function createCalendarEvent(appointment: AppointmentResponse) {
    const event = {
        summary: `Психологическая консультация - ${appointment.name}`,
        description: `Email: ${appointment.email}\nТелефон: ${appointment.phone}`,
        start: {
            dateTime: appointment.dateTime.toISOString(),
            timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
        },
        end: {
            dateTime: new Date(appointment.dateTime.getTime() + 60*60*1000).toISOString(),
            timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
        },
        attendees: [{ email: appointment.email }],
        conferenceData: {
            createRequest: {
                requestId: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
        }
    };

    const response = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        requestBody: event,
        conferenceDataVersion: 1
    });

    return response.data;
} 