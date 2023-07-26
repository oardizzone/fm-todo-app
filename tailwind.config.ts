import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-light-greyish-blue": "hsl(236, 33%, 92%)",
        "light-greyish-blue": "hsl(233, 11%, 84%)",
        "dark-greyish-blue": "hsl(236, 9%, 61%)",
        "very-dark-greyish-blue": "hsl(235, 19%, 35%)",
        "check-cyan": "hsl(192, 100%, 67%)",
        "check-magenta": "hsl(280, 87%, 65%)",
      },
      fontFamily: {
        sans: ["'Josefin Sans'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
