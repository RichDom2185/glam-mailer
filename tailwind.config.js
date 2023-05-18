/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

// Comment out in development to save on compile time
// const safelist = [/.+/];
const safelist = [/bg-.+/, /font-.+/, /text-.+/];

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,yaml}"],
  theme: {
    extend: { ...defaultTheme },
  },
  plugins: [],
  prefix: "tw-",
  safelist: safelist.map((regex) => ({ pattern: regex })),
};
