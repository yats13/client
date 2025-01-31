interface AppointmentFormState {
    name: string;
    email: string;
    phone: string;
    agree: boolean;
}

export function validateAppointment(formData: AppointmentFormState): string | null {
    const { name, email, phone, agree } = formData;

    if (!name.trim()) return 'Имя обязательно';
    if (!email.trim() || !email.includes('@')) return 'Введите корректный Email';
    if (!phone.trim() || phone.length < 9) return 'Введите корректный номер телефона';
    if (!agree) return 'Вы должны согласиться с обработкой данных';

    return null;
}
