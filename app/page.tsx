import AboutSection from "./components/sections/home/AboutSection";
import ContactSection from "./components/sections/home/ContactSection";
import HeroSection from "./components/sections/home/HeroSection";
import ServicesSection from "./components/sections/home/ServicesSection";

export const metadata = {
  title: "Главная | Психолог Онлайн",
  description: "Консультации психолога онлайн. Саморазвитие, решение конфликтов, поддержка.",
  keywords: "психолог онлайн, консультация психолога, саморазвитие, психология",
  authors: [{ name: "Имя психолога" }],
  robots: "index, follow",
  openGraph: {
    title: "Главная | Психолог Онлайн",
    description: "Психологическая поддержка онлайн. Найдите гармонию в жизни.",
    url: "https://mirados.co",
    type: "website",
    images: [{ url: "/images/psychology-banner.jpg" }]
  }
};

export default function Page() {
  return (
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
  );
}
