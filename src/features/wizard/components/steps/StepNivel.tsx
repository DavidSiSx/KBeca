import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { RadioCard } from "../RadioCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { NIVELES } from "@/config/niveles";

export function StepNivel() {
  const { nivelAcademico, setNivelAcademico, prevStep, nextStep, target } =
    useWizardStore();
  const t = useTranslations("Wizard.StepNivel");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nivelAcademico) {
      nextStep();
    }
  };

  const targetKey =
    target === "myself"
      ? "title_myself"
      : target === "child"
        ? "title_child"
        : "title_other";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-grow h-full content-start"
      id="academicLevelForm"
    >
      <div className="mb-lg">
        <h2 className="font-display-md text-[32px] md:text-[40px] leading-[1.1] font-[700] text-on-background mb-base">
          {t("title", { target: t(targetKey) })}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-prose">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-grow md:grid md:grid-cols-2 md:gap-6 content-start mt-2">
        {NIVELES.map((nivel) => (
          <label
            key={nivel.id}
            className="relative cursor-pointer group w-full"
          >
            <input
              type="radio"
              name="academic_level"
              className="peer sr-only"
              value={nivel.id}
              checked={nivelAcademico === nivel.id}
              onChange={() => setNivelAcademico(nivel.id)}
            />
            <div className={`p-5 md:p-6 rounded-sm border-[3px] border-on-background bg-surface-container-lowest transition-all duration-200 flex items-center gap-4 ${
                nivelAcademico === nivel.id
                  ? "bg-primary/10 shadow-none translate-x-[4px] translate-y-[4px]"
                  : "shadow-[6px_6px_0px_0px_#1c1c18] hover:bg-surface-container-low hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1c1c18]"
              }`}
            >
              {/* Halftone texture sutil en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none transition-opacity duration-300" />
              
              <div
                className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center flex-shrink-0 bg-background ${nivelAcademico === nivel.id ? "border-primary" : "border-on-background"}`}
              >
                {nivelAcademico === nivel.id && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                )}
              </div>
              <div className="flex flex-col relative z-10">
                <span className={`font-display-md font-bold text-lg ${nivelAcademico === nivel.id ? "text-primary" : "text-on-background"}`}>
                  {nivel.label}
                </span>
                <span className="font-body-md text-sm text-on-surface-variant mt-1 leading-snug">
                  {nivel.desc}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-auto pt-lg pb-safe flex justify-center w-full md:mt-xl md:justify-end">
        <Button
          type="submit"
          disabled={!nivelAcademico}
          variant="filled"
          size="lg"
          className="w-full md:w-auto"
        >
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}
