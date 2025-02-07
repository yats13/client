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

        // Format start and end times in local timezone
        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: `${selectedDate}T${selectedTime}:00`,
                timeZone: process.env.TIMEZONE || 'Europe/Warsaw'
            },
            end: {
                // Explicitly type parameters to fix TypeScript errors
                dateTime: `${selectedDate}T${selectedTime.split(':').map((n: string, i: number) => 
                    i === 0 ? String(Number(n) + 1).padStart(2, '0') : n).join(':')}:00`,
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
            requestBody: event  // Changed from 'resource' to 'requestBody'
        });

        // Handle the response type correctly
        if (response.data?.id) {
            return NextResponse.json({ success: true, eventId: response.data.id });
        }
        throw new Error('Failed to create event');

    } catch (error) {
        console.error('Google Calendar Error:', error);
        return NextResponse.json({ success: false, message: 'Ошибка при создании события в календаре' }, { status: 500 });
    }
}
