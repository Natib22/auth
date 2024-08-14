import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(0deg, #4640DE, #4640DE), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
      },
      colors: {
        semigray: "#515B6F",
        verylightpurple: "#D6DDEB",
        bluepurple: "#4640DE"
      },
      fontFamily: {
        epilogue: ['Epilogue'],
        poppins: ['Poppins'],
      },
     
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
