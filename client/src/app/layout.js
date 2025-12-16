// client/src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ENSA-Connect | Orientation & Carrière IA",
  description: "Plateforme d'orientation et d'insertion professionnelle pour les étudiants et diplômés ENSA Khouribga, propulsée par l'IA (RAG).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Ajout de suppressHydrationWarning pour éviter l'erreur des extensions */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        {children}
      </body>
    </html>
  );
}