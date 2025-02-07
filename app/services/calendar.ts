import { google } from 'googleapis';

const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

export async function createCalendarEvent(appointment: AppointmentResponse) {
    const event = {
        summary: `Психологическая консультация - ${appointment.name}`,
        description: `Email: ${appointment.email}\nТелефон: ${appointment.phone}`,
        start: {
            dateTime: appointment.dateTime.toISOString(),
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: new Date(appointment.dateTime.getTime() + 60*60*1000).toISOString(), // 1 hour duration
            timeZone: 'Europe/Moscow',
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: event,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
} 