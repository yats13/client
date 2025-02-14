'use server';

import { prisma } from '@/prisma/db';
import type { AppointmentStatus } from '@/app/types/enums/AppointmentStatus';

type UpdateResponse = {
  success: boolean;
  error?: string;
};

export async function updateAppointmentStatus(
  appointmentId: number,
  status: AppointmentStatus,
): Promise<UpdateResponse> {
  if (!appointmentId || !status) {
    return {
      success: false,
      error: 'ID записи и статус обязательны',
    };
  }

  try {
    await prisma.appointment.update({
      where: { 
        id: BigInt(appointmentId),
      },
      data: { 
        status,
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return {
      success: false,
      error: 'Не удалось обновить статус записи',
    };
  }
}
