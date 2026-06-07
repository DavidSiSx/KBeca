import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GRUPOS } from "@/config/grupos";

export function StepGrupos() {
  const {
    estado,
    nivelAcademico,
    gender,
    age,
    hasChildren,
    isPregnant,
    groups,
    setGroups,
    prevStep,
  } = useWizardStore();
  const t = useTranslations("Wizard.StepGrupos");

  const router = useRouter();

  const handleToggle = (groupId: string) => {
    if (groups.includes(groupId)) {
      setGroups(groups.filter((g) => g !== groupId));
    } else {
      setGroups([...groups, groupId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      state: estado || "",
      level: nivelAcademico || "",
      gender: gender || "",
      age: age ? age.toString() : "",
      hasChildren: hasChildren !== null ? hasChildren.toString() : "",
    });

    if (isPregnant !== null) {
      params.append("isPregnant", isPregnant.toString());
    }

    groups.forEach((g) => params.append("groups", g));

    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-grow h-full content-start"
    >
      <div className="mb-lg">
        <h2 className="font-display-md text-[32px] md:text-[40px] leading-[1.1] font-[700] text-on-background mb-sm">
          {t("title")}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-prose">
          {t("description")}
        </p>
      </div>

      <fieldset className="flex-grow mb-xl border-0 p-0 m-0">
        <legend className="sr-only">{t("accessibilityDesc")}</legend>
        <div className="flex flex-col gap-4 flex-grow md:grid md:grid-cols-2 md:gap-6 content-start mt-2">
          {GRUPOS.map((grupo) => {
            const isChecked = groups.includes(grupo.id);
            return (
              <label
                key={grupo.id}
                className="relative cursor-pointer group w-full"
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={() => handleToggle(grupo.id)}
                />
                <div className={`p-5 md:p-6 rounded-sm border-[3px] border-on-background bg-surface-container-lowest transition-all duration-200 flex items-center gap-4 ${
                  isChecked 
                    ? "bg-primary/10 shadow-none translate-x-[4px] translate-y-[4px]" 
                    : "shadow-[6px_6px_0px_0px_#1c1c18] hover:bg-surface-container-low hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18]"
                }`}>
                  {/* Halftone texture sutil en hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none transition-opacity duration-300" />
                  
                  <div
                    className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? "border-primary bg-primary text-on-primary" : "border-on-background bg-background"}`}
                  >
                    {isChecked && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-display-md font-bold text-lg leading-snug relative z-10 ${isChecked ? "text-primary" : "text-on-background"}`}>
                    {grupo.label}
                  </span>
                </div>
              </label>
            );
          })}

          <label className="relative cursor-pointer group w-full">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={groups.length === 0}
              onChange={() => setGroups([])}
            />
            <div className={`p-5 md:p-6 rounded-sm border-[3px] border-on-background bg-surface-container-lowest transition-all duration-200 flex items-center gap-4 ${
                  groups.length === 0 
                    ? "bg-primary/10 shadow-none translate-x-[4px] translate-y-[4px]" 
                    : "shadow-[6px_6px_0px_0px_#1c1c18] hover:bg-surface-container-low hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18]"
                }`}>
              {/* Halftone texture sutil en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none transition-opacity duration-300" />
              
              <div
                className={`w-6 h-6 border-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${groups.length === 0 ? "border-primary bg-primary text-on-primary" : "border-on-background bg-background"}`}
              >
                {groups.length === 0 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`font-display-md font-bold text-lg leading-snug relative z-10 ${groups.length === 0 ? "text-primary" : "text-on-background"}`}>
                {t("noneOption")}
              </span>
            </div>
          </label>
        </div>
      </fieldset>

      <div className="mt-auto pt-lg pb-safe flex justify-center w-full md:mt-xl md:justify-end">
        <Button
          type="submit"
          variant="filled"
          size="lg"
          className="w-full md:w-auto flex items-center justify-center gap-2"
        >
          {t("continue")}
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </Button>
      </div>
    </form>
  );
}
