export interface CalendarDayProps {
  day: number;
  isSelected: boolean;
  isDisabled: boolean;
  onDateSelect: () => void;
}

export interface CalendarHeaderProps {
  month: number;
  year: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  today: Date;
}

export interface CalendarGridProps {
  daysInMonth: {
    totalDays: number;
    firstDayOfWeek: number;
  };
  month: number;
  year: number;
  today: Date;
  selectedDay: number | null;
  onDateSelect: (day: number) => void;
} 