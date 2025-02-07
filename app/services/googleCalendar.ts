import { google } from 'googleapis';

export async function createGoogleCalendarEvent(eventData: {
    name: string;
    email: string;
    phone: string;
    dateTime: Date;
}) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({ 
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN 
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary: `Психологическая консультация - ${eventData.name}`,
        description: `Email: ${eventData.email}\nТелефон: ${eventData.phone}`,
        start: {
            dateTime: eventData.dateTime.toISOString(),
            timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
        },
        end: {
            dateTime: new Date(eventData.dateTime.getTime() + 60*60*1000).toISOString(),
            timeZone: process.env.TIMEZONE || 'Europe/Warsaw',
        },
        attendees: [{ email: eventData.email }],
        conferenceData: {
            createRequest: {
                requestId: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
        }
    };

    return calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        requestBody: event,
        conferenceDataVersion: 1
    });
} 