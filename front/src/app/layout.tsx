import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/style/index.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
