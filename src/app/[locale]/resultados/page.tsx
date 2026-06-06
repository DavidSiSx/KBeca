"use client";

import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense, useMemo } from "react";
import { fetchMatches } from "@/app/actions/getMatches";
import { useTranslations, useLocale } from "next-intl";

function ResultadosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Resultados");
  const locale = useLocale();

  const estado = searchParams.get("state") || "";
  const nivelAcademico = searchParams.get("level") || "";

  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estados del filtro Client-Side
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const [sortBy, setSortBy] = useState<"relevance" | "deadline" | "recent">(
    "relevance",
  );
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>(
    [],
  );

  if (!estado || !nivelAcademico) {
    redirect("/wizard");
  }

  useEffect(() => {
    async function loadMatches() {
      if (!estado || !nivelAcademico) return;
      setIsSearching(true);
      setError(null);
      try {
        const gender = (searchParams.get("gender") || "Otro") as
          | "Femenino"
          | "Masculino"
          | "Otro";
        const age = parseInt(searchParams.get("age") || "18");
        const hasChildren = searchParams.get("hasChildren") === "true";
        const isPregnant = searchParams.get("isPregnant") === "true";
        const groups = searchParams.getAll("groups");

        const res = await fetchMatches({
          state: estado,
          academicLevel: nivelAcademico,
          gender,
          age,
          hasChildren,
          isPregnant,
          groups,
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
  }, [estado, nivelAcademico, searchParams, t]);

  // Derived state: instituciones únicas
  const uniqueInstitutions = useMemo(() => {
    const insts = new Set(results.map((r) => r.institutionName));
    return Array.from(insts).filter(Boolean) as string[];
  }, [results]);

  // Derived state: resultados filtrados y ordenados
  const filteredResults = useMemo(() => {
    let filtered = [...results];

    if (selectedInstitutions.length > 0) {
      filtered = filtered.filter((r) =>
        selectedInstitutions.includes(r.institutionName),
      );
    }

    if (sortBy === "deadline") {
      filtered.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => {
        if (!a.callDate) return 1;
        if (!b.callDate) return -1;
        return new Date(b.callDate).getTime() - new Date(a.callDate).getTime();
      });
    }

    return filtered;
  }, [results, selectedInstitutions, sortBy]);

  const toggleInstitution = (inst: string) => {
    setSelectedInstitutions((prev) =>
      prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst],
    );
  };

  if (!estado || !nivelAcademico) return null;

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md flex flex-col pb-safe md:pb-0">
      <TopAppBar
        title={t("title")}
        onBackClick={() => router.push("/wizard")}
        onHelpClick={() =>
          alert(
            "Los resultados mostrados se basan en la coincidencia entre tu perfil y los requisitos de cada convocatoria.",
          )
        }
      />

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-container-margin md:px-gutter mt-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-sm">
          <h2
            aria-live="polite"
            className="font-body-lg text-body-lg text-on-surface-variant"
          >
            {isSearching ? (
              <span>{t("searching")}</span>
            ) : error ? (
              <span className="text-error">{error}</span>
            ) : (
              <span>
                {t("foundStart")}
                <span className="font-bold text-primary">
                  {filteredResults.length}
                  {t("foundMiddle")}
                </span>
                {t("foundEnd")}
              </span>
            )}
          </h2>
          <button
            aria-expanded={isFilterOpen}
            aria-controls="filter-modal"
            className="font-display-md text-sm md:text-base uppercase tracking-wider font-bold bg-surface-variant text-on-surface border-[3px] border-on-background px-4 py-2 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            onClick={() => setIsFilterOpen(true)}
          >
            <span className="material-symbols-outlined stroke-[3]">tune</span>
            {t("filter")}
          </button>
        </div>

        {isSearching ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li
                key={i}
                className="bg-surface-container-lowest border-[3px] border-on-background p-6 flex flex-col gap-4 animate-pulse shadow-[6px_6px_0px_0px_#1c1c18]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-20 h-8 bg-surface-container-high border-[2px] border-on-background" />
                </div>
                <div className="w-3/4 h-8 bg-surface-container-high border-[2px] border-on-background mt-2" />
                <div className="w-1/2 h-5 bg-surface-container-high border-[2px] border-on-background" />
                <div className="flex gap-2 mt-2">
                  <div className="w-24 h-8 bg-surface-container-high border-[2px] border-on-background" />
                </div>
                <div className="mt-auto pt-4 border-t-[3px] border-on-background flex flex-col gap-2">
                  <div className="w-1/3 h-5 bg-surface-container-high border-[2px] border-on-background" />
                  <div className="w-full h-12 bg-surface-container-high border-[2px] border-on-background mt-2" />
                </div>
              </li>
            ))}
          </ul>
        ) : !error && filteredResults.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.slice(0, visibleCount).map((beca) => (
              <li
                key={beca.id}
                className="group scholarship-card bg-surface-container-lowest border-[3px] border-on-background p-6 flex flex-col gap-4 hover:bg-surface-container-low transition-all relative shadow-[6px_6px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18]"
              >
                {/* Comic Detail: Halftone background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] bg-[radial-gradient(circle,#000_1.5px,transparent_1.5px)] bg-[length:6px_6px] pointer-events-none transition-opacity duration-300" />
                
                <div className="flex justify-between items-start relative z-10">
                  <span className="bg-[#3c6b41] text-white font-display-md font-bold text-xs md:text-sm px-3 py-1 border-[3px] border-on-background shadow-[3px_3px_0px_0px_#1c1c18] uppercase tracking-wider -rotate-2">
                    {t("statusOpen")}
                  </span>
                </div>
                
                <h3 className="font-display-md text-2xl md:text-3xl leading-[1.1] font-[900] text-on-background mt-2 relative z-10">
                  {beca.title}
                </h3>
                
                <p className="font-body-lg font-bold text-on-surface-variant flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined stroke-[3]">
                    account_balance
                  </span>
                  {beca.institutionName}
                </p>
                
                {beca.requiresEnrollment && (
                  <p className="font-display-md font-bold text-xs uppercase tracking-wide text-on-background bg-[#e8a341] px-2 py-1 border-[3px] border-on-background shadow-[3px_3px_0px_0px_#1c1c18] flex items-center gap-2 w-fit relative z-10">
                    <span className="material-symbols-outlined text-[16px] stroke-[3]">
                      school
                    </span>
                    Solo inscritos
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                  {beca.academicLevels?.map((lvl: string) => (
                    <p
                      key={lvl}
                      className="font-display-md font-bold text-xs uppercase tracking-wide text-on-background bg-surface-variant px-2 py-1 border-[2px] border-on-background shadow-[2px_2px_0px_0px_#1c1c18] inline-block self-start"
                    >
                      {lvl}
                    </p>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t-[3px] border-on-background flex flex-col gap-3 relative z-10">
                  {beca.deadline && (
                    <p className="font-display-md text-sm font-bold text-on-surface-variant flex items-center gap-2 uppercase">
                      <span className="material-symbols-outlined text-[18px] stroke-[3]">
                        calendar_today
                      </span>
                      {t("closingDate")}{" "}
                      <strong className="text-error bg-[#f5d9d9] px-2 py-0.5 border-[2px] border-error ml-1 -rotate-1 shadow-[2px_2px_0px_0px_#ba1a1a]">
                        {new Date(beca.deadline).toLocaleDateString()}
                      </strong>
                    </p>
                  )}
                  <Link
                    href={`/beca/${beca.id}`}
                    aria-label={`${t("viewDetails")} ${beca.title}`}
                    className="font-display-md font-bold text-lg uppercase tracking-wider text-center bg-primary text-on-primary border-[3px] border-on-background px-4 py-3 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all w-full flex justify-center items-center gap-2 mt-2"
                  >
                    {t("viewDetails")}
                    <span className="material-symbols-outlined stroke-[3]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-xl">
            {selectedInstitutions.length > 0 ? (
              <>
                <p className="text-on-surface-variant font-body-lg">
                  {t("noResultsFilters")}
                </p>
                <Button
                  variant="outline"
                  className="mt-md"
                  onClick={() => {
                    setSelectedInstitutions([]);
                    setSortBy("relevance");
                  }}
                >
                  {t("removeFilters")}
                </Button>
              </>
            ) : (
              <>
                <p className="text-on-surface-variant font-body-lg">
                  {t("noResultsProfile")}
                </p>
                <Button
                  variant="filled"
                  className="mt-md"
                  onClick={() => {
                    window.location.href = `/${locale}`;
                  }}
                >
                  {t("modifyProfile")}
                </Button>
              </>
            )}
          </div>
        )}

        {filteredResults.length > visibleCount && (
          <div className="mt-lg flex justify-center pb-xl">
            <Button variant="ghost" onClick={() => setVisibleCount((prev) => prev + 9)}>
              {t("loadMore")}
            </Button>
          </div>
        )}
      </main>

      {/* Modal de Filtros Centrado (Glassmorphism + Sombras suaves) */}
      {isFilterOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm bg-transparent border-none w-full h-full m-0 max-w-none max-h-none"
          id="filter-modal"
          aria-labelledby="filter-modal-title"
        >
          {/* Halftone pattern en el fondo del modal (detalle cómic) */}
          <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle,#000_2px,transparent_2px)] bg-[length:8px_8px] pointer-events-none" />

          <div className="bg-surface-container-lowest border-[3px] border-on-background rounded-sm p-8 w-full max-w-[448px] shadow-[8px_8px_0px_0px_#1c1c18] animate-in fade-in zoom-in duration-200 relative z-10">
            <div className="flex justify-between items-center mb-6 border-b-[3px] border-on-background pb-4">
              <h2
                id="filter-modal-title"
                className="font-display-md text-3xl font-[900] text-on-background uppercase tracking-widest"
              >
                {t("filterTitle")}
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                aria-label={t("close")}
                className="w-10 h-10 border-[3px] border-on-background bg-error text-on-error flex items-center justify-center shadow-[2px_2px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <span className="material-symbols-outlined stroke-[3]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Sección Ordenar */}
              <section>
                <h3 className="font-display-md text-xl font-bold text-on-background uppercase tracking-wide mb-4">
                  {t("sortBy")}
                </h3>
                <div className="flex flex-col gap-3">
                  <label className="relative flex items-center cursor-pointer gap-4 group py-1">
                    <input
                      type="radio"
                      name="sortBy"
                      value="relevance"
                      checked={sortBy === "relevance"}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="peer sr-only"
                    />
                    <div
                      className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === "relevance" ? "border-primary bg-primary" : "border-on-background bg-background"}`}
                    >
                      {sortBy === "relevance" && (
                        <div className="w-2.5 h-2.5 bg-on-primary" />
                      )}
                    </div>
                    <span className={`font-body-lg font-bold transition-colors ${sortBy === "relevance" ? "text-primary" : "text-on-background"}`}>
                      {t("relevance")}
                    </span>
                  </label>
                  <label className="relative flex items-center cursor-pointer gap-4 group py-1">
                    <input
                      type="radio"
                      name="sortBy"
                      value="deadline"
                      checked={sortBy === "deadline"}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="peer sr-only"
                    />
                    <div
                      className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === "deadline" ? "border-primary bg-primary" : "border-on-background bg-background"}`}
                    >
                      {sortBy === "deadline" && (
                        <div className="w-2.5 h-2.5 bg-on-primary" />
                      )}
                    </div>
                    <span className={`font-body-lg font-bold transition-colors ${sortBy === "deadline" ? "text-primary" : "text-on-background"}`}>
                      {t("closingSoon")}
                    </span>
                  </label>
                  <label className="relative flex items-center cursor-pointer gap-4 group py-1">
                    <input
                      type="radio"
                      name="sortBy"
                      value="recent"
                      checked={sortBy === "recent"}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="peer sr-only"
                    />
                    <div
                      className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === "recent" ? "border-primary bg-primary" : "border-on-background bg-background"}`}
                    >
                      {sortBy === "recent" && (
                        <div className="w-2.5 h-2.5 bg-on-primary" />
                      )}
                    </div>
                    <span className={`font-body-lg font-bold transition-colors ${sortBy === "recent" ? "text-primary" : "text-on-background"}`}>
                      {t("recent")}
                    </span>
                  </label>
                </div>
              </section>

              {/* Sección Instituciones */}
              {uniqueInstitutions.length > 0 && (
                <section>
                  <h3 className="font-display-md text-xl font-bold text-on-background uppercase tracking-wide mb-4">
                    {t("institutions")}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {uniqueInstitutions.map((inst) => {
                      const isChecked = selectedInstitutions.includes(inst);
                      return (
                        <label
                          key={inst}
                          className="relative flex items-center cursor-pointer gap-4 group py-1"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleInstitution(inst)}
                            className="peer sr-only"
                          />
                          <div
                            className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? "border-primary bg-primary text-on-primary" : "border-on-background bg-background"}`}
                          >
                            {isChecked && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-4 h-4">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`font-body-lg font-bold transition-colors line-clamp-1 ${isChecked ? "text-primary" : "text-on-background"}`}
                            title={inst}
                          >
                            {inst}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-8 pt-6 border-t-[3px] border-on-background flex justify-end">
              <button
                className="w-full sm:w-auto font-display-md text-lg uppercase tracking-wider font-bold bg-primary text-on-primary border-[3px] border-on-background px-8 py-4 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
                onClick={() => setIsFilterOpen(false)}
              >
                {t("applyFilters")}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ResultadosContent />
    </Suspense>
  );
}
