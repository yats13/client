export type TimeServiceParams = {
    selectedDate: Date;
    currentDateTime: Date;
    selectedTime?: string | null; // Optional
};

export const isTimeDisabled = (
    time: string,
    { selectedDate, selectedTime, currentDateTime }: TimeServiceParams
): boolean => {
    const now = new Date(currentDateTime); // Создаём копию, чтобы избежать мутаций
    const isToday = selectedDate.toDateString() === now.toDateString();

    // Рассчитываем время отсечения
    const cutoffTime = isToday
        ? new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getMinutes() > 0 ? now.getHours() + 1 : now.getHours(),
            0, 0, 0
        )
        : null;

    // Разбираем входное время
    const [hours, minutes] = time.split(':').map(Number);
    const timeDate = new Date(selectedDate);
    timeDate.setHours(hours, minutes, 0, 0);

    // Проверяем, запрещено ли это время
    const isDisabled = isToday && cutoffTime !== null && timeDate < cutoffTime;
    return isDisabled && selectedTime !== time;
};

export const getValidatedTimeSelection = (
    time: string,
    params: TimeServiceParams
): string | null | undefined => {
    return isTimeDisabled(time, params) ? params.selectedTime : time;
};
