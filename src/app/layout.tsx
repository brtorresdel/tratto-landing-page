import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tratto.devtorres.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tratto — Seus contratos em 2 minutos e zero planilhas",
    template: "%s | Tratto",
  },
  description:
    "Crie contratos em menos de 2 minutos a partir dos seus próprios modelos .docx, sem erros de preenchimento, e nunca mais perca um vencimento ou reajuste anual pelo IPCA.",
  keywords: [
    "contratos",
    "modelos docx",
    "gestão de contratos",
    "automação de contratos",
    "reajuste IPCA",
    "assinatura eletrônica",
    "PMEs",
    "Tratto",
  ],
  authors: [{ name: "Bruno Torres", url: "https://www.devtorres.com.br" }],
  creator: "Bruno Torres",
  publisher: "Tratto",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tratto — Seus contratos em 2 minutos e zero planilhas",
    description:
      "Crie contratos em menos de 2 minutos a partir dos seus próprios modelos .docx, sem erros de preenchimento, e nunca mais perca um vencimento ou reajuste anual pelo IPCA.",
    url: "/",
    siteName: "Tratto",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tratto — Seus contratos em 2 minutos e zero planilhas",
    description:
      "Crie contratos em menos de 2 minutos a partir dos seus próprios modelos .docx, sem erros de preenchimento, e nunca mais perca um vencimento ou reajuste anual pelo IPCA.",
    creator: "@brtorresdel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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
      <body className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] antialiased transition-colors duration-300">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
