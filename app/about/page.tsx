import PageTitle from '../components/page-titile'
import TextSection from '../components/sections/about/TextSection'
import Psychologists from '@/app/components/sections/about/Psychologists'

export const metadata = {
    title: "О нас | Психолог Онлайн",
    description: "Узнайте больше о нашем психологическом центре и методах работы.",
    robots: "index, follow",
    openGraph: {
        title: "О нас | Психолог Онлайн",
        description: "О нашей миссии, опыте и методах работы.",
        url: "https://mirados.co/about",
        type: "website",
        images: [{ url: "/images/about.jpg" }]
    }
};

export default function Page() {
    return (
        <main className='relative'>
            <PageTitle text="О нас"/>
            <TextSection/>
            <Psychologists/>
        </main>
    );
}
