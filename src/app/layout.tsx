import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Admin e site: Apfel Grotezk (fonte da marca, arquivos locais).
const apfel = localFont({
  src: [
    { path: "./fonts/apfel-grotezk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/apfel-grotezk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-apfel",
  display: "swap",
});

// Pagina da proposta (linguagem do deck): Poppins, usada via classe .deck.
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Retrieve",
  description: "Propostas comerciais da Retrieve",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${apfel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
