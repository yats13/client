export const ERRORS = {
  FETCH: {
    APPOINTMENTS: 'Не удалось загрузить записи',
    PSYCHOLOGISTS: 'Не удалось загрузить список психологов',
  },
  UPDATE: {
    STATUS: 'Не удалось обновить статус',
  },
  GENERIC: {
    LOADING: 'Произошла ошибка при загрузке',
    VALIDATION: 'Все поля обязательны для заполнения',
    INVALID_TIME: 'Неверный формат времени',
    INVALID_ID: 'Неверный ID психолога',
  },
  CREATE: {
    APPOINTMENT: 'Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.',
  },
} as const; 