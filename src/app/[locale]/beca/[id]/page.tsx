import { db } from "@/db/client";
import { scholarships } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) return { title: "Beca no encontrada | KBeca" };

  const [beca] = await db
    .select()
    .from(scholarships)
    .where(eq(scholarships.id, id))
    .limit(1);
  if (!beca) return { title: "Beca no encontrada | KBeca" };

  return {
    title: `${beca.title} | KBeca`,
    description: beca.description || "Detalles de la beca en KBeca.",
  };
}

export default async function BecaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const t = await getTranslations("Beca");

  if (isNaN(id)) {
    notFound();
  }

  const [beca] = await db
    .select()
    .from(scholarships)
    .where(eq(scholarships.id, id))
    .limit(1);

  if (!beca) {
    notFound();
  }

  const isOpen = beca.status === "active";
  const statusClass = isOpen
    ? "bg-secondary-container text-on-secondary-container"
    : "bg-surface-variant text-on-surface-variant";
  const statusText = isOpen ? t("statusOpen") : t("statusClosed");

  return (
    <div className="antialiased min-h-screen flex flex-col font-body-lg bg-background text-on-background">
      {/* TopAppBar */}
      <TopAppBar title={t("titleDetail")} />

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-[1140px] mx-auto px-gutter py-md pb-xl md:grid md:grid-cols-12 md:gap-gutter">
        <div className="md:col-span-8 md:col-start-3 flex flex-col gap-lg">
          {/* Hero / Header Section */}
          <section
            aria-labelledby="scholarship-title"
            className="flex flex-col gap-sm"
          >
            <div className="flex items-center gap-sm">
              <span
                className={`inline-block font-label-md text-label-md px-3 py-1 rounded-full ${statusClass}`}
              >
                {statusText}
              </span>
              {beca.deadline && (
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Cierre: {new Date(beca.deadline).toLocaleDateString()}
                </span>
              )}
            </div>

            <h1
              className="font-headline-xl text-headline-xl text-on-background"
              id="scholarship-title"
            >
              {beca.title}
            </h1>

            <div className="flex items-center gap-sm mt-xs">
              <div className="w-12 h-12 bg-surface-container-high rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-outline text-3xl">
                  account_balance
                </span>
              </div>
              <div>
                <h2 className="font-body-lg text-body-lg text-on-background font-semibold">
                  {beca.institutionName}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {beca.academicLevels.join(" / ")}
                </p>
              </div>
            </div>
          </section>

          {/* Quick Info Cards (Bento Style) */}
          <section
            aria-label="Información rápida"
            className="grid grid-cols-2 gap-sm"
          >
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm flex flex-col gap-xs">
              <div className="flex items-center gap-xs text-secondary">
                <span aria-hidden="true" className="material-symbols-outlined">
                  school
                </span>
                <h3 className="font-label-md text-label-md">
                  {t("targetAudience")}
                </h3>
              </div>
              <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-background leading-tight">
                {beca.targetGroups && beca.targetGroups.length > 0
                  ? beca.targetGroups[0]
                  : t("generalPublic")}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {t("mainRequirement")}
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm flex flex-col gap-xs">
              <div className="flex items-center gap-xs text-secondary">
                <span aria-hidden="true" className="material-symbols-outlined">
                  calendar_today
                </span>
                <h3 className="font-label-md text-label-md">
                  {t("closingDate")}
                </h3>
              </div>
              <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">
                {beca.deadline
                  ? new Date(beca.deadline).toLocaleDateString()
                  : t("notSpecified")}
              </p>
            </div>
          </section>

          {/* Accessibility Summary Section */}
          {beca.description && (
            <section
              aria-labelledby="accessibility-summary"
              className="bg-primary-fixed text-on-primary-fixed p-md rounded-xl border border-primary-fixed-dim"
            >
              <div className="flex items-start gap-sm">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined mt-1 fill-icon"
                >
                  record_voice_over
                </span>
                <div>
                  <h2
                    className="font-headline-lg-mobile text-headline-lg-mobile mb-xs"
                    id="accessibility-summary"
                  >
                    {t("description")}
                  </h2>
                  <p className="font-body-md text-body-md">
                    {beca.description}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Primary Action */}
          <div className="mt-md pb-xl">
            <a
              href={beca.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("apply")}. Este enlace abrirá una nueva pestaña o aplicación externa.`}
              className={buttonVariants({
                variant: "filled",
                size: "lg",
                className: "w-full rounded-full",
              })}
            >
              <span>{t("apply")}</span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined ml-2 text-[20px]"
              >
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
