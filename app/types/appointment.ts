import type { AppointmentStatus } from './enums/AppointmentStatus';
import type { Psychologist as PrismaPhysician } from '@prisma/client';

export type Psychologist = {
  id: number;
  name: string;
  slug: string;
}

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    email: string;
    phone: string;
    status: AppointmentStatus;
    psychologistId: number;
    psychologist: Psychologist;
  };
}

export interface AppointmentResponse {
  name: string;
  email: string;
  phone: string;
  psychologist: Psychologist;
  id: number;
  dateTime: Date;
  createdAt: Date;
}

export interface FormState {
  success: boolean;
  error?: string;
  appointment?: AppointmentResponse;
} 