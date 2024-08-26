import type { Config } from "tailwindcss";
import { pentatrionTw } from "pentatrion-design/tailwind";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",

    // "./node_modules/pentatrion-design/lib/**/*.{ts,tsx}",
    // "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        segoe: "var(--font-segoe)",
        "segoe-bl": "var(--font-segoe-black)",
      },
      colors: {
        drh: {
          100: "#f8e3ba",
          200: "#f5d25e",
          300: "#f3ad42",
          400: "#e98219",
          500: "#e2590e",
          600: "#95130a",
          700: "#771204",
          800: "#5b0e00",
          900: "#908a29",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [
    pentatrionTw({
      vars: false,
    }),
    typography,
  ],
};
export default config;
