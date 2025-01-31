import "@/app/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import ClientLayout from '@/app/components/ClientLayout';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PT_Serif, PT_Sans_Narrow } from "next/font/google";

const ptSansNarrow = PT_Sans_Narrow({
  weight: "400",
  subsets: ["latin-ext", "cyrillic-ext"],
  display: "swap",
});

const ptSerif = PT_Serif({
  weight: "400",
  subsets: ["latin-ext", "cyrillic-ext"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ru" className={ptSansNarrow.className} suppressHydrationWarning>
      <body className={`${ptSerif.className} flex flex-col justify-between min-h-screen`} suppressHydrationWarning>
      <Header />
      <ClientLayout />
      {children}
      <Footer />
      </body>
      </html>
  );
}
