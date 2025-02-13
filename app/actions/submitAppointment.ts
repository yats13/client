'use server';

import { prisma } from '@/app/lib/prisma';
import { FormState, AppointmentResponse } from './types';

export async function submitAppointment(
    formData: FormData
): Promise<FormState> {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const selectedDateStr = formData.get('selectedDate') as string;
        const selectedTime = formData.get('selectedTime') as string;
        const psychologistSlug = formData.get('psychologistSlug') as string;

        if (!name || !email || !phone || !selectedDateStr || !selectedTime || !psychologistSlug) {
            return {
                success: false,
                error: 'Все поля обязательны для заполнения',
                appointment: undefined
            };
        }

        // Combine date and time
        const selectedDate = new Date(selectedDateStr);
        const [hours, minutes] = selectedTime.split(':');
        selectedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const savedAppointment = await prisma.appointment.create({
            data: {
                name,
                email,
                phone,
                dateTime: selectedDate,
                psychologistSlug,
            }
        });

        return {
            success: true,
            appointment: {
                ...savedAppointment,
                createdAt: new Date()
            }
        };

    } catch (error) {
        console.error('Error creating appointment:', error);
        return {
            success: false,
            error: 'Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.',
            appointment: undefined
        };
    }
}
