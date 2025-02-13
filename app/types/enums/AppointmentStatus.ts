export enum AppointmentStatus {
  WAITING = 'WAITING',
  PASSED = 'PASSED',
  CANCELED = 'CANCELED'
}

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.WAITING]: 'Waiting',
  [AppointmentStatus.PASSED]: 'Passed',
  [AppointmentStatus.CANCELED]: 'Canceled'
}
