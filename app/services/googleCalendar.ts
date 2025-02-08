import { calendar_v3, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { env, validateEnv } from '@/app/lib/env';

interface EventData {
    name: string;
    email: string;
    phone: string;
    dateTime: Date;
}

let oauth2Client: OAuth2Client | null = null;

function getOAuth2Client(): OAuth2Client {
    validateEnv();
    
    if (!oauth2Client) {
        oauth2Client = new google.auth.OAuth2({
            clientId: env.google.clientId,
            clientSecret: env.google.clientSecret,
            redirectUri: env.google.redirectUri
        });

        oauth2Client.setCredentials({
            refresh_token: env.google.refreshToken
        });
    }
    return oauth2Client;
}

export async function createGoogleCalendarEvent(eventData: EventData): Promise<calendar_v3.Schema$Event> {
    try {
        const calendar = google.calendar('v3');
        
        const event: calendar_v3.Schema$Event = {
            summary: `Психологическая консультация - ${eventData.name}`,
            description: `Email: ${eventData.email}\nТелефон: ${eventData.phone}`,
            start: {
                dateTime: eventData.dateTime.toISOString(),
                timeZone: env.google.timezone
            },
            end: {
                dateTime: new Date(eventData.dateTime.getTime() + 60*60*1000).toISOString(),
                timeZone: env.google.timezone
            },
            attendees: [{ email: eventData.email }],
            conferenceData: {
                createRequest: {
                    requestId: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' }
                }
            }
        };

        const { data } = await calendar.events.insert({
            auth: getOAuth2Client(),
            calendarId: env.google.calendarId,
            requestBody: event,
            conferenceDataVersion: 1
        });

        return data;
    } catch (error) {
        console.error('Google Calendar API Error:', error);
        throw error;
    }
} 