export type CalendarGridProps = {
    daysInMonth: number;
    month: number;
    year: number;
    today: Date;
    selectedDay: number | null;
    onDateSelect: (day: number) => void;
}