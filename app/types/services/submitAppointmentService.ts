import { submitAppointment as submitServerAppointment } from '@/app/actions/submitAppointment';

export async function submitAppointment(formData: FormData) {
    return submitServerAppointment(formData);
}
