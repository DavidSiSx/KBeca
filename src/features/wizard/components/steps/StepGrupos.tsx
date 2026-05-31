import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GRUPOS } from "@/config/grupos";

export function StepGrupos() {
  const { 
    estado, nivelAcademico, gender, age, hasChildren, isPregnant, groups, 
    setGroups, prevStep 
  } = useWizardStore();
  const t = useTranslations("Wizard.StepGrupos");
  
  const router = useRouter();

  const handleToggle = (groupId: string) => {
    if (groups.includes(groupId)) {
      setGroups(groups.filter(g => g !== groupId));
    } else {
      setGroups([...groups, groupId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams({
      state: estado || '',
      level: nivelAcademico || '',
      gender: gender || '',
      age: age ? age.toString() : '',
      hasChildren: hasChildren !== null ? hasChildren.toString() : '',
    });
    
    if (isPregnant !== null) {
      params.append('isPregnant', isPregnant.toString());
    }
    
    groups.forEach(g => params.append('groups', g));

    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full content-start">
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-base">{t("title")}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t("description")}</p>
      </div>

      <fieldset className="flex-grow mb-xl border-0 p-0 m-0">
        <legend className="sr-only">{t("accessibilityDesc")}</legend>
        <div className="flex flex-col gap-sm flex-grow md:grid md:grid-cols-2 md:gap-gutter content-start">
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
                <div className="p-gutter rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex items-center gap-sm peer-checked:border-secondary peer-checked:bg-surface-container-low peer-focus-visible:ring-2 peer-focus-visible:ring-secondary peer-focus-visible:ring-offset-2">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'border-secondary bg-secondary text-on-secondary' : 'border-outline-variant bg-transparent'}`}>
                    {isChecked && (
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    )}
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">{grupo.label}</span>
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
            <div className="p-gutter rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex items-center gap-sm peer-checked:border-secondary peer-checked:bg-surface-container-low peer-focus-visible:ring-2 peer-focus-visible:ring-secondary peer-focus-visible:ring-offset-2">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${groups.length === 0 ? 'border-secondary bg-secondary text-on-secondary' : 'border-outline-variant bg-transparent'}`}>
                {groups.length === 0 && (
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                )}
              </div>
              <span className="font-label-md text-label-md text-on-surface">{t("noneOption")}</span>
            </div>
          </label>
        </div>
      </fieldset>

      <div className="mt-auto pt-lg pb-safe flex justify-center w-full md:mt-xl md:justify-end">
        <Button 
          type="submit" 
          className="w-full md:w-auto shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-full"
        >
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}
