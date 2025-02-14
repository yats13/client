'use server';

import { prisma } from '@/app/lib/prisma';
import type { FormState, AppointmentResponse } from '@/app/types/appointment';
import { TIME_ZONE } from '@/app/constants/time';

type AppointmentInput = {
  name: string;
  email: string;
  phone: string;
  dateStr: string;
  time: string;
  psychologistId: string;
};

function validateInput(input: AppointmentInput): FormState | null {
  const { name, email, phone, dateStr, time, psychologistId } = input;

  if (!name || !email || !phone || !dateStr || !time || !psychologistId) {
    return {
      success: false,
      error: 'Все поля обязательны для заполнения',
    };
  }

  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return {
      success: false,
      error: 'Неверный формат времени',
    };
  }

  const parsedId = Number(psychologistId);
  if (Number.isNaN(parsedId)) {
    return {
      success: false,
      error: 'Неверный ID психолога',
    };
  }

  return null;
}

export async function submitAppointment(formData: FormData): Promise<FormState> {
  try {
    const input = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateStr: formData.get('selectedDate') as string,
      time: formData.get('selectedTime') as string,
      psychologistId: formData.get('psychologistId') as string,
    };

    const validationError = validateInput(input);
    if (validationError) return validationError;

    const selectedDate = new Date(input.dateStr);
    const [hours, minutes] = input.time.split(':').map(Number);
    
    const localDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes,
    );
    
    const utcDate = new Date(
      localDate.toLocaleString('en-US', { timeZone: TIME_ZONE }),
    );

    const savedAppointment = await prisma.appointment.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        dateTime: utcDate,
        psychologistId: Number(input.psychologistId),
      },
    });

    return {
      success: true,
      appointment: {
        ...savedAppointment,
        id: Number(savedAppointment.id),
        psychologistId: savedAppointment.psychologistId,
      },
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      success: false,
      error: 'Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.',
    };
  }
}
