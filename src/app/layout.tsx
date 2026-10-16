import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Tratto — Contratos em minutos a partir dos seus modelos",
  description:
    "Crie contratos em minutos a partir dos seus modelos .docx, sem erro de preenchimento, e nunca mais perca um vencimento ou reajuste anual pelo IPCA.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#EBF2ED] text-[#0E1210] antialiased">
        {children}
      </body>
    </html>
  );
}
