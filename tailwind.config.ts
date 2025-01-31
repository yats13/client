import type { Config } from "tailwindcss";
import { Color } from './app/types/enums/Color'; 
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-section': "linear-gradient(180deg, rgba(163, 137, 187, 0.75) 0%, rgba(128, 217, 181, 0.25) 100%), url('/images/background-image.png')",
        'calendar-submit-section': "url('/images/wool.jpg')",
      },
      colors: {
        primary: Color.Primary,
        purple: Color.Purple,
        grey: Color.Grey,
        lightPurple: Color.LightPurple,
        mint: Color.Mint,
        lightGrey: Color.LightGrey,
      },
      fontFamily: {
        sansNarrow: ['"PT Sans Narrow"', 'sans-serif'], // For regular text
        serif: ['"PT Serif"', 'serif'], // For headers
      },
    },
  },
  plugins: [],
};
export default config;
