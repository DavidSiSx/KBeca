import type { Metadata } from "next";
import { Anybody, DM_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "material-symbols/outlined.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "KBeca - Buscador de Becas en Mexico",
  description:
    "Encuentra tu beca ideal entre mas de 500 programas en Mexico. Sin registro, sin cookies, 100% privado.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${anybody.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <head></head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
