import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { RadioCard } from "../RadioCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { NIVELES } from "@/config/niveles";

export function StepNivel() {
  const { nivelAcademico, setNivelAcademico, prevStep, nextStep, target } = useWizardStore();
  const t = useTranslations("Wizard.StepNivel");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nivelAcademico) {
      nextStep();
    }
  };

  const isMyself = target === 'myself';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full content-start" id="academicLevelForm">
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-base">
          {t("title", { target: isMyself ? t("title_myself") : t("title_other") })}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-sm flex-grow md:grid md:grid-cols-2 md:gap-gutter content-start">
        {NIVELES.map((nivel) => (
          <label key={nivel.id} className="relative cursor-pointer group w-full">
            <input
              type="radio"
              name="academic_level"
              className="peer sr-only"
              value={nivel.id}
              checked={nivelAcademico === nivel.id}
              onChange={() => setNivelAcademico(nivel.id)}
            />
            <div className="p-gutter rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex items-center gap-sm peer-checked:border-secondary peer-checked:bg-surface-container-low">
              <div className={`w-5 h-5 rounded-full border-2 radio-indicator flex-shrink-0 relative ${nivelAcademico === nivel.id ? 'border-secondary' : 'border-outline-variant'}`}>
                {nivelAcademico === nivel.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-secondary rounded-full"></div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">{nivel.label}</span>
                <span className="font-body-md text-label-sm text-on-surface-variant mt-xs">{nivel.desc}</span>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-auto pt-lg pb-safe flex justify-center w-full md:mt-xl md:justify-end">
        <Button 
          type="submit" 
          disabled={!nivelAcademico}
          className="w-full md:w-auto shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-full"
        >
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}
