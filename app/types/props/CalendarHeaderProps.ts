export type CalendarHeaderProps = {
    month: number;
    year: number;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    today: Date;
}