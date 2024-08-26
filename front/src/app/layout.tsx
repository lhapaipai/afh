import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "~/style/index.css";

import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin for locales
import "dayjs/locale/fr";
dayjs.extend(isLeapYear);
dayjs.locale("fr");

const segoeui = localFont({
  src: "../style/fonts/segoeui.woff2",
  variable: "--font-segoe",
});

const segoeuiBlack = localFont({
  src: "../style/fonts/seguibl.woff2",
  variable: "--font-segoe-black",
});

export const metadata: Metadata = {
  title: "Drôles de rencontres du Hautbois",
  description: "Congrès de l'Association Française du Hautbois",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={clsx(
          segoeui.className,
          segoeuiBlack.variable,
          segoeui.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
