export interface PsychologistProps {
    id: number;
    name: string;
    slug: string;
    image: string;
    title: string;
    description: string;
    bg_color: string;
    visit_type: string;
    locale: string;
    userId: number;
    user: {
        email: string;
        phone: string;
    };
}