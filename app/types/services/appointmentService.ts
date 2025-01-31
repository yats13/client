export function parseDateTime(date: string | null, time: string | null): Date | null {

    console.log('Дата:', date);
    console.log('Время:', time);

    if (!date || !time) return null;
    const dateTime = new Date(`${date}T${time}:00`);
    return isNaN(dateTime.getTime()) ? null : dateTime;
}
