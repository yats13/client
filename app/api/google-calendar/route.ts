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

        // Create event time in RFC3339 format with the correct timezone
        const timezone = process.env.TIMEZONE || 'Europe/Warsaw';
        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: `${selectedDate}T${selectedTime}:00`,
                timeZone: timezone
            },
            end: {
                dateTime: `${selectedDate}T${selectedTime.split(':')
                    .map((n: string, i: number) => i === 0 
                        ? String(Number(n) + 1).padStart(2, '0') 
                        : n)
                    .join(':')}:00`,
                timeZone: timezone
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

// Add this helper function at the end of the file
function getTimezoneOffset(): string {
    const timezone = process.env.TIMEZONE || 'Europe/Warsaw';
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'longOffset'
    });
    const timeZoneParts = formatter.formatToParts(date).find(part => part.type === 'timeZoneName');
    if (!timeZoneParts?.value) return '+00:00';
    
    // Convert "GMT+2" or "GMT+02:00" format to "+02:00" format
    const offset = timeZoneParts.value.replace('GMT', '');
    if (offset.includes(':')) return offset;
    
    const hours = offset.slice(0, -2).padStart(2, '0');
    return `${offset[0]}${hours}:00`;
}
