import PageTitle from "@/app/components/page-titile";
import prisma from '@/prisma/db';
import Calendar from "@/app/components/sections/calendar/Calendar";
import React from "react";

export const metadata = {
    title: "Запись на консультацию | Психолог Онлайн",
    description: "Выберите удобное время и специалиста для консультации.",
    keywords: "психолог, запись онлайн, консультация, терапия, психология",
    authors: [{ name: "Имя психолога" }],
    robots: "index, follow",
    openGraph: {
        title: "Запись на консультацию | Психолог Онлайн",
        description: "Выберите удобное время и специалиста для консультации.",
        url: "https://mirados.co/calendar",
        type: "website",
        images: [{ url: "/images/calendar-booking.jpg" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Запись на консультацию | Психолог Онлайн",
        description: "Запишитесь на консультацию к психологу онлайн.",
        images: ["/images/calendar-booking.jpg"]
    }
};
export default async function Page() {
    try {
        const psychologistsData = await prisma.psychologist.findMany();

        return (
                <main className="relative">
                    <PageTitle text="Календарь"/>
                    <Calendar psychologists={psychologistsData}/>
                </main>
        );
    } catch (error) {
        console.error("Error fetching psychologists:", error);
        return (
            <main className="relative">
                <PageTitle text="Календарь" />
                <p className="text-red-500 text-center">Ошибка загрузки данных</p>
            </main>
        );
    }
}
