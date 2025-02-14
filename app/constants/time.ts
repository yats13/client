export const BUSINESS_HOURS = {
  start: '09:00:00',
  end: '18:00:00',
} as const;

export const APPOINTMENT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const TIME_ZONE = 'Europe/Warsaw' as const; 