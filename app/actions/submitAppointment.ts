'use server';

import { prisma } from '@/app/lib/prisma';
import { FormState } from './types';

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

        // Combine date and time in Warsaw timezone
        const selectedDate = new Date(selectedDateStr);
        const [hours, minutes] = selectedTime.split(':');
        
        // Create date with explicit Warsaw timezone offset
        const warsawDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            parseInt(hours),
            parseInt(minutes),
            0
        );
        
        // Convert to UTC for database storage
        const utcDate = new Date(warsawDate.toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }));
        const savedAppointment = await prisma.appointment.create({
            data: {
                name,
                email,
                phone,
                dateTime: utcDate,
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
