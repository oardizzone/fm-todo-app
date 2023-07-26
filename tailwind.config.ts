import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
		sans: ["'Josefin Sans'", ...defaultTheme.fontFamily.sans]
	  },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
