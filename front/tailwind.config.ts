import type { Config } from "tailwindcss";
import { pentatrionTw } from "pentatrion-design/tailwind";

const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",

    // "./node_modules/pentatrion-design/lib/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/components/**/*.js",
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
      animation: {
        swing: "swing 0.5s linear",
        "short-pulse": "short-pulse 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    pentatrionTw({
      vars: false,
    }),
  ],
};
export default config;
