"use client";

import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { TopAppBar } from "@/components/ui/TopAppBar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense, useMemo } from "react";
import { fetchMatches } from "@/app/actions/getMatches";
import { useTranslations, useLocale } from "next-intl";

function ResultadosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Resultados");
  const locale = useLocale();

  const estado = searchParams.get('state') || "";
  const nivelAcademico = searchParams.get('level') || "";

  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estados del filtro Client-Side
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'deadline' | 'recent'>('relevance');
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);

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
  }, [estado, nivelAcademico, searchParams, t]);

  // Derived state: instituciones únicas
  const uniqueInstitutions = useMemo(() => {
    const insts = new Set(results.map(r => r.institutionName));
    return Array.from(insts).filter(Boolean) as string[];
  }, [results]);

  // Derived state: resultados filtrados y ordenados
  const filteredResults = useMemo(() => {
    let filtered = [...results];
    
    if (selectedInstitutions.length > 0) {
      filtered = filtered.filter(r => selectedInstitutions.includes(r.institutionName));
    }
    
    if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortBy === 'recent') {
       filtered.sort((a, b) => {
         if (!a.callDate) return 1;
         if (!b.callDate) return -1;
         return new Date(b.callDate).getTime() - new Date(a.callDate).getTime();
       });
    }
    
    return filtered;
  }, [results, selectedInstitutions, sortBy]);

  const toggleInstitution = (inst: string) => {
    setSelectedInstitutions(prev => 
      prev.includes(inst) ? prev.filter(i => i !== inst) : [...prev, inst]
    );
  };

  if (!estado || !nivelAcademico) return null;

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md flex flex-col pb-safe md:pb-0">
      
      <TopAppBar 
        title={t("title")} 
        onBackClick={() => router.push("/wizard")}
        onHelpClick={() => alert("Los resultados mostrados se basan en la coincidencia entre tu perfil y los requisitos de cada convocatoria.")}
      />

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-container-margin md:px-gutter mt-lg">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-sm">
          <h2 aria-live="polite" className="font-body-lg text-body-lg text-on-surface-variant">
            {isSearching ? (
              <span>{t("searching")}</span>
            ) : error ? (
              <span className="text-error">{error}</span>
            ) : (
              <span>{t("foundStart")}<span className="font-bold text-primary">{filteredResults.length}{t("foundMiddle")}</span>{t("foundEnd")}</span>
            )}
          </h2>
          <Button 
            variant="tonal" 
            aria-expanded={isFilterOpen}
            aria-controls="filter-modal"
            className="gap-xs"
            onClick={() => setIsFilterOpen(true)}
          >
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
        ) : !error && filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" role="list">
            {filteredResults.map((beca) => (
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
        ) : (
          <div className="text-center py-xl">
            {selectedInstitutions.length > 0 ? (
              <>
                 <p className="text-on-surface-variant font-body-lg">{t("noResultsFilters")}</p>
                 <Button variant="outline" className="mt-md" onClick={() => { setSelectedInstitutions([]); setSortBy('relevance'); }}>{t("removeFilters")}</Button>
              </>
            ) : (
              <>
                 <p className="text-on-surface-variant font-body-lg">{t("noResultsProfile")}</p>
                 <Button variant="filled" className="mt-md" onClick={() => { window.location.href = `/${locale}`; }}>{t("modifyProfile")}</Button>
              </>
            )}
          </div>
        )}

        {filteredResults.length > 9 && (
          <div className="mt-lg flex justify-center pb-xl">
            <Button variant="ghost">
                {t("loadMore")}
            </Button>
          </div>
        )}
      </main>

      {/* Modal de Filtros Centrado (Glassmorphism + Sombras suaves) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="dialog" id="filter-modal" aria-modal="true" aria-labelledby="filter-modal-title">
          <div className="bg-surface-container-lowest dark:bg-on-background rounded-3xl p-lg w-full max-w-[448px] shadow-3xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-md border-b border-outline-variant dark:border-outline pb-sm">
              <h2 id="filter-modal-title" className="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed">{t("filterTitle")}</h2>
              <Button variant="icon" size="icon" onClick={() => setIsFilterOpen(false)} aria-label={t("close")}>
                <span className="material-symbols-outlined">close</span>
              </Button>
            </div>
            
            <div className="flex flex-col gap-lg max-h-[60vh] overflow-y-auto pr-2">
              {/* Sección Ordenar */}
              <section>
                <h3 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-sm">{t("sortBy")}</h3>
                <div className="flex flex-col gap-sm">
                  <label className="relative flex items-center cursor-pointer gap-3 group py-1">
                    <input type="radio" name="sortBy" value="relevance" checked={sortBy === 'relevance'} onChange={(e) => setSortBy(e.target.value as any)} className="peer sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === 'relevance' ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                      {sortBy === 'relevance' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="font-body-md text-on-surface dark:text-inverse-on-surface transition-colors">{t("relevance")}</span>
                  </label>
                  <label className="relative flex items-center cursor-pointer gap-3 group py-1">
                    <input type="radio" name="sortBy" value="deadline" checked={sortBy === 'deadline'} onChange={(e) => setSortBy(e.target.value as any)} className="peer sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === 'deadline' ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                      {sortBy === 'deadline' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="font-body-md text-on-surface dark:text-inverse-on-surface transition-colors">{t("closingSoon")}</span>
                  </label>
                  <label className="relative flex items-center cursor-pointer gap-3 group py-1">
                    <input type="radio" name="sortBy" value="recent" checked={sortBy === 'recent'} onChange={(e) => setSortBy(e.target.value as any)} className="peer sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${sortBy === 'recent' ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                      {sortBy === 'recent' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="font-body-md text-on-surface dark:text-inverse-on-surface transition-colors">{t("recent")}</span>
                  </label>
                </div>
              </section>

              {/* Sección Instituciones */}
              {uniqueInstitutions.length > 0 && (
                <section>
                  <h3 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-sm">{t("institutions")}</h3>
                  <div className="flex flex-col gap-sm">
                    {uniqueInstitutions.map(inst => {
                      const isChecked = selectedInstitutions.includes(inst);
                      return (
                        <label key={inst} className="relative flex items-center cursor-pointer gap-3 group py-1">
                          <input type="checkbox" checked={isChecked} onChange={() => toggleInstitution(inst)} className="peer sr-only" />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'border-primary bg-primary text-on-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                            {isChecked && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                          </div>
                          <span className="font-body-md text-on-surface dark:text-inverse-on-surface transition-colors line-clamp-1" title={inst}>{inst}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-xl pt-sm border-t border-outline-variant flex justify-end">
              <Button variant="filled" className="w-full sm:w-auto" onClick={() => setIsFilterOpen(false)}>
                {t("applyFilters")}
              </Button>
            </div>
          </div>
        </div>
      )}

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
