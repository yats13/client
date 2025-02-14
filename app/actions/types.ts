export interface AppointmentResponse {
    name: string;
    email: string;
    phone: string;
    psychologistId: number;
    id: string;
    dateTime: Date;
    meetLink?: string;
    createdAt: Date;
}

export type FormState = {
    success: boolean;
    error?: string;
    appointment?: AppointmentResponse;
}

export const initialState: FormState = {
    success: false,
    error: '',
    appointment: undefined
};
