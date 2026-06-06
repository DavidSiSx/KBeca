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
    <div className="antialiased min-h-screen flex flex-col font-body-lg bg-background text-on-background pb-16">
      {/* TopAppBar */}
      <TopAppBar title={t("titleDetail")} />

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-[1140px] mx-auto px-4 py-8 pb-12 md:grid md:grid-cols-12 md:gap-8 relative">
        <div className="md:col-span-8 md:col-start-3 flex flex-col gap-10 relative z-10">
          {/* Hero / Header Section */}
          <section
            aria-labelledby="scholarship-title"
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <span
                className={`inline-block font-display-md font-bold text-xs md:text-sm uppercase tracking-wider px-3 py-1 border-[3px] border-on-background shadow-[3px_3px_0px_0px_#1c1c18] -rotate-2 ${isOpen ? "bg-[#3c6b41] text-white" : "bg-surface-variant text-on-surface-variant"}`}
              >
                {statusText}
              </span>
              {beca.deadline && (
                <span className="font-display-md font-bold text-xs md:text-sm uppercase tracking-wider text-on-background bg-[#f5d9d9] px-3 py-1 border-[3px] border-on-background shadow-[3px_3px_0px_0px_#1c1c18] rotate-1">
                  Cierre: {new Date(beca.deadline).toLocaleDateString()}
                </span>
              )}
            </div>

            <h1
              className="font-display-md text-4xl md:text-5xl leading-[1.1] font-[900] text-on-background uppercase tracking-widest"
              id="scholarship-title"
            >
              {beca.title}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 bg-surface-container-lowest border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] flex items-center justify-center flex-shrink-0 -rotate-3">
                <span className="material-symbols-outlined text-on-background text-3xl stroke-[3]">
                  account_balance
                </span>
              </div>
              <div>
                <h2 className="font-display-md text-xl font-bold text-on-background uppercase tracking-wide">
                  {beca.institutionName}
                </h2>
                <p className="font-body-md text-on-surface-variant font-bold">
                  {beca.academicLevels.join(" / ")}
                </p>
              </div>
            </div>
          </section>

          {/* Quick Info Cards (Bento Style Brutalista) */}
          <section
            aria-label="Información rápida"
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            <div className="group bg-surface-container-lowest border-[3px] border-on-background rounded-sm p-5 md:p-6 flex flex-col gap-2 shadow-[6px_6px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18] transition-all relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] bg-[radial-gradient(circle,#000_2px,transparent_2px)] bg-[length:8px_8px] pointer-events-none transition-opacity duration-300" />
              <div className="flex items-center gap-2 text-primary relative z-10">
                <span aria-hidden="true" className="material-symbols-outlined stroke-[3]">
                  school
                </span>
                <h3 className="font-display-md font-bold uppercase tracking-wide text-sm md:text-base">
                  {t("targetAudience")}
                </h3>
              </div>
              <p className="font-display-md font-bold text-lg md:text-2xl text-on-background leading-tight relative z-10 mt-1">
                {beca.targetGroups && beca.targetGroups.length > 0
                  ? beca.targetGroups[0]
                  : t("generalPublic")}
              </p>
              <p className="font-body-sm text-on-surface-variant font-bold mt-auto relative z-10">
                {t("mainRequirement")}
              </p>
            </div>
            <div className="group bg-surface-container-lowest border-[3px] border-on-background rounded-sm p-5 md:p-6 flex flex-col gap-2 shadow-[6px_6px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18] transition-all relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] bg-[radial-gradient(circle,#000_2px,transparent_2px)] bg-[length:8px_8px] pointer-events-none transition-opacity duration-300" />
              <div className="flex items-center gap-2 text-primary relative z-10">
                <span aria-hidden="true" className="material-symbols-outlined stroke-[3]">
                  calendar_today
                </span>
                <h3 className="font-display-md font-bold uppercase tracking-wide text-sm md:text-base">
                  {t("closingDate")}
                </h3>
              </div>
              <p className="font-display-md font-bold text-lg md:text-2xl text-on-background relative z-10 mt-1">
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
              className="bg-[#f2e6ff] text-on-background p-6 md:p-8 border-[3px] border-on-background shadow-[6px_6px_0px_0px_#1c1c18] relative overflow-hidden"
            >
              {/* Detalle cómic sutil */}
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle,#000_1.5px,transparent_1.5px)] bg-[length:6px_6px] pointer-events-none" />
              <div className="flex items-start gap-4 relative z-10">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined mt-1 text-[28px] stroke-[3]"
                >
                  record_voice_over
                </span>
                <div>
                  <h2
                    className="font-display-md font-bold text-xl uppercase tracking-wider mb-2"
                    id="accessibility-summary"
                  >
                    {t("description")}
                  </h2>
                  <p className="font-body-lg font-bold leading-relaxed text-on-background/90">
                    {beca.description}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Primary Action */}
          <div className="mt-4 pb-8">
            <a
              href={beca.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("apply")}. Este enlace abrirá una nueva pestaña o aplicación externa.`}
              className="font-display-md text-lg md:text-xl uppercase tracking-wider font-[900] bg-primary text-on-primary border-[3px] border-on-background px-8 py-5 shadow-[6px_6px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all w-full flex items-center justify-center gap-3"
            >
              <span>{t("apply")}</span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined stroke-[3]"
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
