import localFont from "next/font/local";
import type { Metadata } from "next";

import '../_styles/globals.scss';
import { TransitionProvider } from "./_context/TransitionContext";
import { PageTransition } from "./_components/ui";
import { Header, Footer } from "./_components/sections";

export const halcom = localFont({
  src: [
    {
      path: "../_fonts/Halcom-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../_fonts/Halcom-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../_fonts/Halcom-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../_fonts/Halcom-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-halcom",
});

const tenez = localFont({
  src: [
    {
      path: "../_fonts/Tenez-Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ],
  variable: "--font-tenez"
});

export const metadata: Metadata = {
  title: "David Barros | Product Designer • UX/UI • Conversão (CRO & AIO)",
  description: "Designer com mais de 12 anos de experiência criando produtos digitais, interfaces e soluções focadas na experiência do usuário.",
  icons: {
    icon: "/brand/icon.png",
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html 
      lang="pt-BR"
      className={`${halcom.variable} ${tenez.variable}`}
    >
      <body>
        <TransitionProvider>
          <PageTransition />
          <Header />
          {children}
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  )
}
