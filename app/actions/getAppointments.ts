'use server';

import { prisma } from '@/app/lib/prisma';
import { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';

export async function getAppointments() {
    try {
        const appointments = await prisma.appointment.findMany({
            orderBy: {
                dateTime: 'asc'
            }
        }) as Array<{
            id: string;
            name: string;
            email: string;
            phone: string;
            dateTime: Date;
            psychologistSlug: string;
            status: AppointmentStatus;
            createdAt: Date;
        }>;

        return {
            success: true,
            appointments: appointments.map(appointment => ({
                id: appointment.id,
                title: `${appointment.name}`,
                start: appointment.dateTime.toISOString(),
                end: new Date(appointment.dateTime.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
                extendedProps: {
                    email: appointment.email,
                    phone: appointment.phone,
                    status: appointment.status
                }
            }))
        };
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return {
            success: false,
            error: 'Failed to fetch appointments'
        };
    }
}
