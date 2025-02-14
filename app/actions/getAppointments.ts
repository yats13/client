'use server';

import { prisma } from '@/prisma/db';
import type { CalendarEvent } from '@/app/types/appointment';
import { APPOINTMENT_DURATION } from '@/app/constants/time';
import { ERRORS } from '@/app/constants/errors';

type AppointmentResponse = {
  success: boolean;
  appointments?: CalendarEvent[];
  error?: string;
};

export async function getAppointments(psychologistId?: number | null): Promise<AppointmentResponse> {
  try {
    if (psychologistId && !Number.isFinite(psychologistId)) {
      return {
        success: false,
        error: ERRORS.GENERIC.INVALID_ID,
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: psychologistId ? { psychologistId } : undefined,
      include: {
        psychologist: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        dateTime: 'asc',
      },
    });

    return {
      success: true,
      appointments: appointments.map((appointment) => ({
        id: String(appointment.id),
        title: appointment.name,
        start: appointment.dateTime.toISOString(),
        end: new Date(appointment.dateTime.getTime() + APPOINTMENT_DURATION).toISOString(),
        extendedProps: {
          email: appointment.email,
          phone: appointment.phone,
          status: appointment.status,
          psychologistId: appointment.psychologistId,
          psychologist: appointment.psychologist,
        },
      })),
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      success: false,
      error: ERRORS.FETCH.APPOINTMENTS,
    };
  }
}
