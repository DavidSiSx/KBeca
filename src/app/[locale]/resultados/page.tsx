"use client";

import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { fetchMatches } from "@/app/actions/getMatches";
import { useTranslations } from "next-intl";

function ResultadosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Resultados");

  const estado = searchParams.get('state') || "";
  const nivelAcademico = searchParams.get('level') || "";

  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!estado || !nivelAcademico) {
      router.push("/wizard");
    }
  }, [estado, nivelAcademico, router]);

  useEffect(() => {
    async function loadMatches() {
      if (!estado || !nivelAcademico) return;
      setIsSearching(true);
      setError(null);
      try {
        const gender = (searchParams.get('gender') || "Otro") as 'Femenino' | 'Masculino' | 'Otro';
        const age = parseInt(searchParams.get('age') || "18");
        const hasChildren = searchParams.get('hasChildren') === 'true';
        const isPregnant = searchParams.get('isPregnant') === 'true';
        const groups = searchParams.getAll('groups');

        const res = await fetchMatches({
          state: estado,
          academicLevel: nivelAcademico,
          gender,
          age,
          hasChildren,
          isPregnant,
          groups
        });

        if (res.success && res.data) {
          setResults(res.data);
        } else {
          setError(res.error || t("errorGeneric"));
        }
      } catch (err) {
        setError(t("errorUnexpected"));
      } finally {
        setIsSearching(false);
      }
    }
    loadMatches();
  }, [estado, nivelAcademico, searchParams]);

  if (!estado || !nivelAcademico) return null;

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md flex flex-col pb-safe md:pb-0">
      
      {/* Header unificado (mismo diseño que Wizard) */}
      <TopAppBar 
        title={t("title")} 
        onBackClick={() => router.push("/wizard")}
        onHelpClick={() => alert("Los resultados mostrados se basan en la coincidencia entre tu perfil y los requisitos de cada convocatoria. Las de mayor coincidencia aparecen primero.")}
      />

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-container-margin md:px-gutter mt-lg">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-sm">
          <h2 aria-live="polite" className="font-body-lg text-body-lg text-on-surface-variant">
            {isSearching ? (
              <span>{t("searching")}</span>
            ) : error ? (
              <span className="text-error">{error}</span>
            ) : (
              <span>{t("foundStart")}<span className="font-bold text-primary">{results.length}{t("foundMiddle")}</span>{t("foundEnd")}</span>
            )}
          </h2>
          <Button variant="tonal" aria-expanded="false" className="gap-xs">
            <span className="material-symbols-outlined">tune</span>
            {t("filter")}
          </Button>
        </div>

        {isSearching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" role="list">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} role="listitem" className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex flex-col gap-sm animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-6 bg-surface-container-high rounded-full"></div>
                  <div className="w-8 h-8 bg-surface-container-high rounded-full"></div>
                </div>
                <div className="w-3/4 h-6 bg-surface-container-high rounded mt-xs"></div>
                <div className="w-1/2 h-4 bg-surface-container-high rounded"></div>
                <div className="flex gap-2 mt-2">
                  <div className="w-24 h-6 bg-surface-container-high rounded-md"></div>
                </div>
                <div className="mt-auto pt-sm border-t border-outline-variant flex flex-col gap-xs">
                  <div className="w-1/3 h-4 bg-surface-container-high rounded"></div>
                  <div className="w-full h-12 bg-surface-container-high rounded-lg mt-xs"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !error && results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" role="list">
            {results.map((beca) => (
              <article key={beca.id} className="scholarship-card bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex flex-col gap-sm hover:bg-surface-container-low transition-colors relative" role="listitem" tabIndex={0}>
                <div className="flex justify-between items-start">
                  <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-1 rounded-full">{t("statusOpen")}</span>
                  <Button variant="icon" size="icon" aria-label={t("saveScholarship")}>
                    <span className="material-symbols-outlined">bookmark_border</span>
                  </Button>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mt-xs">{beca.title}</h3>
                <p className="font-body-md text-body-md text-on-surface flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  {beca.institutionName}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {beca.academicLevels?.map((lvl: string) => (
                    <p key={lvl} className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-1 rounded-md inline-block self-start">{lvl}</p>
                  ))}
                </div>
                
                <div className="mt-auto pt-sm border-t border-outline-variant flex flex-col gap-xs">
                  {beca.deadline && (
                    <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {t("closingDate")}<strong className="text-error">{new Date(beca.deadline).toLocaleDateString()}</strong>
                    </p>
                  )}
                  <Link href={`/beca/${beca.id}`} aria-label={`${t("viewDetails")} ${beca.title}`} className={buttonVariants({ variant: "filled", className: "w-full mt-xs gap-xs after:absolute after:inset-0" })}>
                    {t("viewDetails")}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {results.length > 9 && (
          <div className="mt-lg flex justify-center pb-xl">
            <Button variant="ghost">
                {t("loadMore")}
            </Button>
          </div>
        )}
      </main>

    </div>
  );
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background"></div>}>
      <ResultadosContent />
    </Suspense>
  );
}
