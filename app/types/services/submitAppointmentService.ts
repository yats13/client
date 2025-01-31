'use server';

import { PrismaClient } from '@prisma/client';
import { parseDateTime } from '@/app/types/services/appointmentService';
import {log} from "node:util";

const prisma = new PrismaClient();

export async function submitAppointment(formData: FormData) {
    try {
        const name = formData.get('name') as string | null;
        const email = formData.get('email') as string | null;
        const phone = formData.get('phone') as string | null;
        const date = formData.get('date') as string | null;
        const time = formData.get('time') as string | null;
        const psychologistSlug = formData.get('psychologistSlug') as string | null;

        if (!name || !email || !phone || !date || !time || !psychologistSlug) {
            return { success: false, error: 'Все поля обязательны' };
        }

        // Парсим существующую дату
        const dateTime = new Date(date);
        if (isNaN(dateTime.getTime())) {
            return { success: false, error: `Некорректный формат даты: ${date}` };
        }

        // Разбираем время
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) {
            return { success: false, error: `Некорректный формат времени: ${time}` };
        }

        // Устанавливаем новые часы и минуты
        dateTime.setUTCHours(hours, minutes, 0, 0); // Устанавливаем в UTC

        const appointment = await prisma.appointment.create({
            data: {
                name,
                email,
                phone,
                dateTime,
                psychologistSlug,
            },
        });

        return { success: true, appointment };
    } catch (error) {
        console.error('Ошибка создания записи:', error instanceof Error ? error.stack : error);
        return { success: false, error: 'Ошибка сервера. Попробуйте позже.' };
    }
}
