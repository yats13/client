export enum AppointmentStatus {
  WAITING = 'WAITING',
  PASSED = 'PASSED',
  CANCELED = 'CANCELED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.WAITING]: 'Waiting',
  [AppointmentStatus.PASSED]: 'Passed',
  [AppointmentStatus.CANCELED]: 'Canceled',
  [AppointmentStatus.IN_PROGRESS]: 'In progress',
}
