import PageTitle from "@/app/components/page-titile";

import Calendar from "@/app/components/sections/calendar/Calendar";
import React from "react";
import { ERRORS } from "@/app/constants/errors";
import { getPsychologist } from "@/app/actions/getPsychologist";

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
    const psychologists = await getPsychologist();
        return (
            <main className="relative">
                <PageTitle text="Календарь"/>
                {psychologists && <Calendar psychologists={psychologists}/>}
                {!psychologists && <p className="text-red-500 text-center">{ERRORS.GENERIC.LOADING}</p>}
            </main>
        );

}
