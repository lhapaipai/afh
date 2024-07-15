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
      typography: {},
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
