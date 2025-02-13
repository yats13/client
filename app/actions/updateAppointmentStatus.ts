'use server';

import { prisma } from '@/app/lib/prisma';
import { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';

export async function updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
    try {
        await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status }
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating appointment status:', error);
        return {
            success: false,
            error: 'Failed to update appointment status'
        };
    }
}
