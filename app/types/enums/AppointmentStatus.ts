export const AppointmentStatus = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  PASSED: 'PASSED',
  CANCELED: 'CANCELED',
} as const;

export type AppointmentStatus = typeof AppointmentStatus[keyof typeof AppointmentStatus];

export const AppointmentStatusLabels: Record<AppointmentStatus, string> = {
  WAITING: 'Ожидает',
  IN_PROGRESS: 'В процессе',
  PASSED: 'Завершен',
  CANCELED: 'Отменен',
};
