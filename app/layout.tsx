import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "GenOS | Provenance, mémoire et preuve avant promotion",
  description:
    "GenOS V3 est une runtime agentique biomimétique pour exécuter, comparer, valider et promouvoir des décisions d’IA avec traçabilité et sécurité.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050d0b] text-white">
        {children}
      </body>
    </html>
  );
}
