// utils/handle-submit.ts
import {PsychologistProps} from "@/app/types/props/PsychologistProps";

export const handleBookingSubmit = (
    selectedDate: Date | null,
    selectedTime: string | null,
    selectedSpecialist: PsychologistProps | null
) => {
    if (selectedDate && selectedTime && selectedSpecialist !== null) {
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
        console.log('Selected Specialist:', selectedSpecialist);
        alert('Booking successfully submitted!');
    } else {
        alert('Please select all fields to submit.');
    }
};
