import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { HeroScene } from "@/components/ui/HeroScene";
import { Footer } from "@/components/ui/Footer";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Landing");
  return {
    title: t("hero.titlePart1") + " | KBeca",
    description: t("hero.description"),
  };
}

export default function LandingPage() {
  const t = useTranslations("Landing");

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      {/* ─── Header / Nav ─── */}
      <header className="flex justify-between items-center px-4 md:px-20 py-6 w-full border-b-4 border-on-background bg-background z-50">
        <Link
          href="/"
          className="flex items-center gap-2 font-display-lg text-headline-xl text-on-background font-black tracking-tighter"
          aria-label="KBeca - Inicio"
        >
          <Image src="/kbeca-logo-clean.svg" alt="KBeca Logo" width={40} height={40} className="w-10 h-10 object-contain" priority />
          KBeca
        </Link>

        <div className="hidden md:flex items-center gap-gutter">
          <a
            className="text-on-surface font-label-bold text-label-bold hover:text-secondary transition-colors duration-200"
            href="#como-funciona"
          >
            {t("nav.howItWorks")}
          </a>
          <a
            className="text-on-surface font-label-bold text-label-bold hover:text-secondary transition-colors duration-200"
            href="#por-que-kbeca"
          >
            {t("nav.benefits")}
          </a>
        </div>

        <Link
          className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 min-h-[48px] border-2 border-on-background hover:bg-surface-tint transition-colors"
          href="/wizard"
        >
          {t("nav.startSearch")}
        </Link>

        {/* Mobile Menu Button */}
        <Link
          href="/wizard"
          className="md:hidden p-2 text-on-background min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label={t("nav.startSearch")}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            aria-hidden="true"
          >
            search
          </span>
        </Link>
      </header>

      {/* ─── Main Content ─── */}
      <main id="main-content">
        {/* ─── Hero Section (Diorama Scene) ─── */}
        <section className="relative min-h-[90vh] flex items-center px-4 md:px-20 border-b-4 border-on-background w-full isolate overflow-hidden bg-background">
          <HeroScene />

          <div className="max-w-[1280px] w-full mx-auto relative z-20 py-16 md:py-24 pointer-events-none">
            <div className="max-w-2xl flex flex-col items-start pointer-events-auto">
              <span className="inline-flex items-center px-4 py-1 border-2 border-secondary text-secondary font-label-bold text-label-bold mb-6 bg-background uppercase tracking-wider shadow-[2px_2px_0px_0px_#1c1c18]">
                {t("hero.badge")}
              </span>

              <h1 className="font-display-lg text-[40px] leading-[1.1] md:text-[64px] md:leading-[1.05] font-[800] tracking-tight text-on-background mb-6">
                {t("hero.titlePart1")}
                <span className="rotating-text-wrapper h-[1.1em] align-top text-primary" aria-hidden="true">
                  <span className="rotating-text">
                    <span className="block h-[1.1em]">Bachillerato</span>
                    <span className="block h-[1.1em]">Universidad</span>
                    <span className="block h-[1.1em]">Posgrado</span>
                  </span>
                </span>
                <span className="sr-only"> Bachillerato, Universidad o Posgrado</span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-background mb-8 w-full max-w-[600px] font-medium">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full sm:w-auto mt-2">
                <Link
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 min-h-[48px] border-2 border-on-background hover:bg-surface-tint transition-colors shadow-[4px_4px_0px_0px_#1c1c18] active:shadow-[0px_0px_0px_0px_#1c1c18] active:translate-y-1 active:translate-x-1"
                  href="/wizard"
                >
                  {t("hero.startSearch")}
                </Link>
                <div className="w-full sm:w-auto inline-flex items-center justify-center bg-background px-8 py-4 min-h-[48px] border-2 border-on-background shadow-[4px_4px_0px_0px_#1c1c18]">
                  <p className="text-sm font-body-sm text-on-background flex items-center gap-2 font-bold m-0">
                    <span
                      className="material-symbols-outlined text-tertiary text-lg"
                      aria-hidden="true"
                    >
                      shield_lock
                    </span>
                    {t("hero.privacyNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section
          className="py-24 px-4 md:px-20 bg-surface-container-low border-b border-on-background"
          id="como-funciona"
          aria-labelledby="how-it-works-title"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2
                id="how-it-works-title"
                className="font-display-md text-[32px] md:text-[48px] leading-[1.1] font-[700] text-on-background mb-4"
              >
                {t("howItWorks.title")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                {t("howItWorks.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <article className="flex flex-col bg-background border-2 border-on-background relative hard-shadow-hover group">
                <div className="w-full aspect-[4/3] bg-surface-variant border-b-2 border-on-background relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-4 left-4 w-10 h-10 bg-secondary border-2 border-on-background flex items-center justify-center text-on-secondary font-display-md text-xl font-bold shadow-[2px_2px_0px_0px_#1c1c18] z-10">
                    1
                  </div>
                  {/* TODO: Reemplazar este contenido por tu SVG exportado de Canva (ej. <img src="/images/step1.svg" />) */}
                  <span className="font-label-bold text-on-surface-variant/50 flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" aria-hidden="true">image</span>
                    800x600px SVG
                  </span>
                </div>
                <div className="p-6 text-center flex flex-col items-center flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-3">
                    {t("howItWorks.step1Title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t("howItWorks.step1Desc")}
                  </p>
                </div>
              </article>

              {/* Step 2 */}
              <article className="flex flex-col bg-background border-2 border-on-background relative hard-shadow-hover group">
                <div className="w-full aspect-[4/3] bg-surface-variant border-b-2 border-on-background relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-4 left-4 w-10 h-10 bg-tertiary border-2 border-on-background flex items-center justify-center text-on-tertiary font-display-md text-xl font-bold shadow-[2px_2px_0px_0px_#1c1c18] z-10">
                    2
                  </div>
                  {/* TODO: Reemplazar este contenido por tu SVG exportado de Canva */}
                  <span className="font-label-bold text-on-surface-variant/50 flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" aria-hidden="true">image</span>
                    800x600px SVG
                  </span>
                </div>
                <div className="p-6 text-center flex flex-col items-center flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-3">
                    {t("howItWorks.step2Title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t("howItWorks.step2Desc")}
                  </p>
                </div>
              </article>

              {/* Step 3 */}
              <article className="flex flex-col bg-background border-2 border-on-background relative hard-shadow-hover group">
                <div className="w-full aspect-[4/3] bg-surface-variant border-b-2 border-on-background relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-4 left-4 w-10 h-10 bg-primary border-2 border-on-background flex items-center justify-center text-on-primary font-display-md text-xl font-bold shadow-[2px_2px_0px_0px_#1c1c18] z-10">
                    3
                  </div>
                  {/* TODO: Reemplazar este contenido por tu SVG exportado de Canva */}
                  <span className="font-label-bold text-on-surface-variant/50 flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" aria-hidden="true">image</span>
                    800x600px SVG
                  </span>
                </div>
                <div className="p-6 text-center flex flex-col items-center flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-3">
                    {t("howItWorks.step3Title")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t("howItWorks.step3Desc")}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── Benefits / Por que KBeca ─── */}
        <section
          className="py-24 px-4 md:px-20 bg-background border-b border-on-background"
          id="por-que-kbeca"
          aria-labelledby="benefits-title"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 w-full">
              <h2
                id="benefits-title"
                className="font-display-md text-[32px] md:text-[48px] leading-[1.1] font-[700] text-on-background flex-1"
              >
                {t("benefits.title")}
              </h2>
              <Link
                className="inline-flex items-center gap-2 font-label-bold text-label-bold text-primary hover:text-surface-tint border-b-2 border-primary pb-1 group transition-colors"
                href="/wizard"
              >
                {t("benefits.startSearchLink")}
                <span
                  className="material-symbols-outlined transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1: Privacy */}
              <div className="group border-2 border-on-background p-8 flex flex-col bg-surface-container-lowest hover:bg-secondary-fixed transition-colors duration-300">
                <div className="w-12 h-12 mb-6 border-2 border-on-background bg-secondary-container flex items-center justify-center rounded-sm">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-on-secondary-container text-2xl"
                  >
                    visibility_off
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                  {t("benefits.card1Title")}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  {t("benefits.card1Desc")}
                </p>
              </div>

              {/* Card 2: Updated Info */}
              <div className="group border-2 border-on-background p-8 flex flex-col bg-surface-container-lowest hover:bg-tertiary-fixed transition-colors duration-300">
                <div className="w-12 h-12 mb-6 border-2 border-on-background bg-tertiary-container flex items-center justify-center rounded-sm">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-on-tertiary-container text-2xl"
                  >
                    update
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                  {t("benefits.card2Title")}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  {t("benefits.card2Desc")}
                </p>
              </div>

              {/* Card 3: Accessibility */}
              <div className="group border-2 border-on-background p-8 flex flex-col bg-surface-container-lowest hover:bg-primary-fixed transition-colors duration-300">
                <div className="w-12 h-12 mb-6 border-2 border-on-background bg-primary-container flex items-center justify-center rounded-sm">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-on-primary-container text-2xl"
                  >
                    public
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-4">
                  {t("benefits.card3Title")}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                  {t("benefits.card3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
