import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Nemi AI brand palette
        "deep-space": "#07060B",
        "soft-grey": "#E6E6E9",
        violet: {
          900: "#1E1540",
          700: "#3A2878",
          500: "#513A9F",
          300: "#8A70C8",
          100: "#CEC3EC"
        }
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        nemi: "0.04em",
        "nemi-wide": "0.08em"
      },
      lineHeight: {
        body: "1.6"
      },
      backgroundImage: {
        "nemi-hero": "url('/nemi-ai-background.jpg')"
      },
      boxShadow: {
        violet: "0 0 0 1px rgba(206,195,236,0.12), 0 24px 60px -20px rgba(81,58,159,0.45)"
      }
    }
  },
  plugins: []
};

export default config;
