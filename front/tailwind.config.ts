import type { Config } from "tailwindcss";
import { pentatrionTw } from "pentatrion-design/tailwind";
import typography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

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
        neutral: {
          css: {
            "--tw-prose-invert-body": colors.white,
            "--tw-prose-invert-headings": colors.white,
            "--tw-prose-invert-lead": colors.neutral[100],
            "--tw-prose-invert-links": colors.white,
            "--tw-prose-invert-bold": colors.white,
            "--tw-prose-invert-counters": colors.neutral[100],
            "--tw-prose-invert-bullets": colors.neutral[200],
            "--tw-prose-invert-hr": colors.neutral[300],
            "--tw-prose-invert-quotes": colors.white,
            "--tw-prose-invert-quote-borders": colors.neutral[300],
            "--tw-prose-invert-captions": colors.neutral[100],
            "--tw-prose-invert-kbd": colors.white,
            "--tw-prose-invert-kbd-shadows": hexToRgb(colors.white),
            "--tw-prose-invert-code": colors.white,
            "--tw-prose-invert-pre-code": colors.white,
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": colors.neutral[200],
            "--tw-prose-invert-td-borders": colors.neutral[300],
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
