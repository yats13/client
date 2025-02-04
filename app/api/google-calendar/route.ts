import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function POST(req: Request) {
    try {
        const { name, email, phone, selectedDate, selectedTime, psychologistSlug } = await req.json();

        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: new Date(`${selectedDate}T${selectedTime}:00Z`).toISOString(),
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw'
            },
            end: {
                dateTime: new Date(new Date(`${selectedDate}T${selectedTime}:00Z`).getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw'
            },
            attendees: [{ email }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 }
                ]
            }
        };

        const response = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
            resource: event
        });

        return NextResponse.json({ success: true, eventId: response.data.id });
    } catch (error) {
        console.error('Google Calendar Error:', error);
        return NextResponse.json({ success: false, message: 'Ошибка при создании события в календаре' }, { status: 500 });
    }
}
