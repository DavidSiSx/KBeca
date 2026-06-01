import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Typewriter } from "@/components/ui/typewriter";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("Landing");
  const typewriterWords = t.raw("hero.typewriter") as string[];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Navigation (Desktop/Tablet) */}
      <header className="hidden md:flex justify-between items-center h-16 px-lg w-full max-w-[1140px] mx-auto sticky top-0 bg-surface z-50 border-b border-outline-variant">
        <div className="flex items-center gap-xs">
          <span aria-hidden="true" className="material-symbols-outlined fill text-primary text-2xl">school</span>
          <span className="font-headline-lg text-headline-lg text-primary">KBeca</span>
        </div>
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-lg">
            <li><a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors py-2" href="#como-funciona">{t("nav.howItWorks")}</a></li>
            <li><a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors py-2" href="#beneficios">{t("nav.benefits")}</a></li>
            <li>
              <Link className={buttonVariants({ variant: "filled", size: "sm", className: "flex items-center gap-xs" })} href="/wizard">
                {t("nav.startSearch")} <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* TopAppBar (Mobile) */}
      <header className="md:hidden w-full top-0 sticky bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-gutter z-50">
        <div className="flex items-center gap-xs">
          <span aria-hidden="true" className="material-symbols-outlined fill text-primary text-2xl">school</span>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">KBeca</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full px-gutter md:px-container-margin">
        <div className="w-full max-w-[1140px] flex flex-col gap-xl py-xl">
          {/* Hero Section */}
          <section className="flex flex-col items-center text-center gap-lg py-xl lg:py-24 relative overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant">
            {/* Abstract decorative background element */}
            <div className="absolute inset-0 opacity-10 pointer-events-none hero-bg-gradient"></div>
            <div className="z-10 max-w-3xl flex flex-col items-center gap-md px-md">
              <span className="inline-flex items-center gap-xs px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm border border-secondary/20">
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">lock_open</span>
                {t("hero.badge")}
              </span>
              <h1 className="text-[40px] leading-[1.1] md:text-[64px] md:leading-[1.05] font-black tracking-tight text-on-surface text-balance">
                {t("hero.titlePart1")} <Typewriter words={typewriterWords} />
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance">{t("hero.description")}</p>
              <Link className={buttonVariants({ variant: "filled", size: "lg", className: "mt-sm min-h-[48px] shadow-lg ring-2 ring-primary/30" })} href="/wizard">
                {t("hero.startSearch")}
              </Link>
            </div>
          </section>

          {/* How it works (Bento-ish Grid) */}
          <section className="flex flex-col gap-lg w-full" id="como-funciona" aria-labelledby="how-it-works-title">
            <header className="text-center mb-md">
              <h2 id="how-it-works-title" className="font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-on-surface">{t("howItWorks.title")}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs">{t("howItWorks.subtitle")}</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Step 1 */}
              <article className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex flex-col items-center text-center gap-md relative overflow-hidden group hover:border-secondary transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-sm">
                  <span className="font-headline-lg text-headline-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{t("howItWorks.step1Title")}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t("howItWorks.step1Desc")}</p>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl text-surface-container-highest opacity-50 group-hover:text-primary-fixed-dim/20 transition-colors z-0">map</span>
              </article>
              {/* Step 2 */}
              <article className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex flex-col items-center text-center gap-md relative overflow-hidden group hover:border-secondary transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-sm">
                  <span className="font-headline-lg text-headline-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{t("howItWorks.step2Title")}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t("howItWorks.step2Desc")}</p>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl text-surface-container-highest opacity-50 group-hover:text-primary-fixed-dim/20 transition-colors z-0">person_search</span>
              </article>
              {/* Step 3 */}
              <article className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex flex-col items-center text-center gap-md relative overflow-hidden group hover:border-secondary transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                  <span className="font-headline-lg text-headline-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{t("howItWorks.step3Title")}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t("howItWorks.step3Desc")}</p>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl text-surface-container-highest opacity-50 group-hover:text-secondary-fixed-dim/20 transition-colors z-0">task_alt</span>
              </article>
            </div>
          </section>

          {/* Features / Benefits */}
          <section className="bg-surface-container rounded-xl p-lg md:p-xl flex flex-col md:flex-row gap-xl items-center border border-outline-variant" id="beneficios">
            <div className="w-full md:w-1/2 flex flex-col gap-lg">
              <div>
                <h2 className="font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-on-surface mb-xs">{t("benefits.title")}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">{t("benefits.subtitle")}</p>
              </div>
              <ul className="flex flex-col gap-md">
                <li className="flex items-start gap-sm">
                  <span aria-hidden="true" className="material-symbols-outlined fill text-secondary mt-1">shield_lock</span>
                  <div>
                    <strong className="font-label-md text-label-md text-on-surface block text-base">{t("benefits.privacyTitle")}</strong>
                    <span className="font-body-md text-body-md text-on-surface-variant">{t("benefits.privacyDesc")}</span>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <span aria-hidden="true" className="material-symbols-outlined fill text-secondary mt-1">accessibility_new</span>
                  <div>
                    <strong className="font-label-md text-label-md text-on-surface block text-base">{t("benefits.accessibilityTitle")}</strong>
                    <span className="font-body-md text-body-md text-on-surface-variant">{t("benefits.accessibilityDesc")}</span>
                  </div>
                </li>
                <li className="flex items-start gap-sm">
                  <span aria-hidden="true" className="material-symbols-outlined fill text-secondary mt-1">fact_check</span>
                  <div>
                    <strong className="font-label-md text-label-md text-on-surface block text-base">{t("benefits.dataTitle")}</strong>
                    <span className="font-body-md text-body-md text-on-surface-variant">{t("benefits.dataDesc")}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-surface rounded-lg p-md border border-outline-variant shadow-sm relative">
              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs font-semibold">{t("exampleCard.badge")}</span>
                  <span className="text-on-surface-variant text-sm">{t("exampleCard.dueDate")}</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{t("exampleCard.title")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{t("exampleCard.description")}</p>
                <div className="h-12 w-full bg-surface-container-high rounded mt-2 flex items-center justify-center text-on-surface-variant font-label-md">{t("exampleCard.button")}</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-label-sm shadow-sm border border-tertiary-container/20 flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">g_translate</span> {t("exampleCard.language")}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-xl">
        <div className="max-w-[1140px] mx-auto px-gutter md:px-container-margin py-lg flex flex-col md:flex-row md:justify-between items-start gap-8">
          <div className="flex flex-col gap-4 w-full md:max-w-[400px]">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined fill text-primary text-2xl">school</span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">KBeca</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm text-balance">
              {t("footer.disclaimer")}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">accessible</span>
              {t("footer.accessibility")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-auto pt-6 md:pt-0 border-t border-outline-variant/30 md:border-0 md:items-center">
            <Link className="font-label-md text-label-md text-primary hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-secondary rounded transition-all" href="/terminos">{t("footer.help")}</Link>
            <Link className="font-label-md text-label-md text-primary hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-secondary rounded transition-all" href="/privacidad">{t("footer.privacy")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
