'use server';

import { prisma } from '@/app/lib/prisma';
import type { FormState } from '@/app/types/appointment';
import { ERRORS } from '@/app/constants/errors';

export async function submitAppointment(formData: FormData): Promise<FormState> {
  try {
    const data = Object.fromEntries(formData.entries());
    const { name, email, phone, selectedDate, selectedTime, psychologistSlug } = data;

    if (!name || !email || !phone || !selectedDate || !selectedTime || !psychologistSlug) {
      return {
        success: false,
        error: ERRORS.GENERIC.VALIDATION,
      };
    }

    const psychologist = await prisma.psychologist.findUnique({
      where: { slug: psychologistSlug as string },
    });

    if (!psychologist) {
      return {
        success: false,
        error: ERRORS.GENERIC.INVALID_ID,
      };
    }

    // Parse the date string to ensure proper format
    const parsedDate = new Date(selectedDate as string);
    const [hours, minutes] = (selectedTime as string).split(':');
    
    const dateTime = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parseInt(hours),
      parseInt(minutes)
    );

    if (isNaN(dateTime.getTime())) {
      return {
        success: false,
        error: ERRORS.GENERIC.INVALID_TIME,
      };
    }

    const appointment = await prisma.appointment.create({
      data: {
        name: name as string,
        email: email as string,
        phone: phone as string,
        dateTime,
        psychologistId: psychologist.id,
      },
      include: {
        psychologist: true,
      },
    });

    return {
      success: true,
      appointment: {
        ...appointment,
        id: Number(appointment.id),
        psychologist: {
          id: psychologist.id,
          name: psychologist.name,
          slug: psychologist.slug,
        },
      },
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      success: false,
      error: ERRORS.CREATE.APPOINTMENT,
    };
  }
}
