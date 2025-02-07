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
        const startDateTime = formatToRFC3339(`${selectedDate}T${selectedTime}:00`, timezone);
        const endDateTime = formatToRFC3339(
            `${selectedDate}T${selectedTime.split(':')
                .map((n: string, i: number) => i === 0 
                    ? String(Number(n) + 1).padStart(2, '0') 
                    : n)
                .join(':')}:00`,
            timezone
        );

        const event = {
            summary: `Консультация с ${psychologistSlug}`,
            description: `Клиент: ${name}\nEmail: ${email}\nТелефон: ${phone}`,
            start: {
                dateTime: startDateTime,
                timeZone: timezone
            },
            end: {
                dateTime: endDateTime,
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

/**
 * Formats a datetime string to RFC3339 format with proper timezone offset
 * @param dateTimeStr - DateTime string in format "YYYY-MM-DDTHH:mm:ss"
 * @param timezone - IANA timezone string (e.g., 'Europe/Warsaw')
 * @returns RFC3339 formatted datetime string
 */
function formatToRFC3339(dateTimeStr: string, timezone: string): string {
    const date = new Date(dateTimeStr);
    
    // Create a formatter for the specified timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'longOffset'
    });

    // Get timezone offset
    const timeZoneParts = formatter.formatToParts(date);
    const timeZonePart = timeZoneParts.find(part => part.type === 'timeZoneName');
    let offset = timeZonePart?.value || '+00:00';

    // Clean up the offset format
    offset = offset.replace('GMT', '');
    if (!offset.includes(':')) {
        // Handle single digit offsets (e.g., +2, -5)
        const hours = offset.replace(/[+-]/, '');
        const sign = offset.startsWith('-') ? '-' : '+';
        offset = `${sign}${hours.padStart(2, '0')}:00`;
    } else {
        // Handle offsets that already include minutes (e.g., +02:30)
        const [sign, ...rest] = offset;
        offset = `${sign}${rest.join('').padStart(5, '0')}`;
    }

    // Format the date components
    const parts = formatter.formatToParts(date);
    const dateParts: { [key: string]: string } = {};
    parts.forEach(part => {
        if (part.type !== 'literal' && part.type !== 'timeZoneName') {
            dateParts[part.type] = part.value;
        }
    });

    // Construct the RFC3339 string
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}${offset}`;
}
