import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { ArrowRight } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

import { ESTADOS } from "@/config/estados";

export function StepEstado() {
  const { estado, setEstado, nextStep, target } = useWizardStore();
  const t = useTranslations("Wizard.StepEstado");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (estado) nextStep();
  };

  const targetKey =
    target === "myself"
      ? "title_myself"
      : target === "child"
        ? "title_child"
        : "title_other";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
      <div className="mb-lg">
        <h2
          className="font-display-md text-[32px] md:text-[40px] leading-[1.1] font-[700] text-on-background mb-sm"
          id="estado-heading"
        >
          {t("title", { target: t(targetKey) })}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-prose">
          {t("description")}
        </p>
      </div>

      <div
        role="group"
        aria-labelledby="estado-heading"
        className="border-0 p-0 m-0 mb-xl flex-grow w-full flex flex-col"
      >
        <span className="sr-only">{t("listTitle")}</span>
        <div className="relative w-full max-w-md">
          <CustomSelect
            options={ESTADOS}
            value={estado}
            onChange={setEstado}
            placeholder={t("placeholder")}
          />
          <div id="estado-desc" className="sr-only">
            {t("accessibilityDesc")}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-lg pb-safe flex justify-center w-full md:mt-xl md:justify-end">
        <button
          type="submit"
          disabled={!estado}
          aria-disabled={!estado}
          className="w-full md:w-auto font-display-md text-lg uppercase tracking-wider font-bold bg-primary text-on-primary border-[3px] border-on-background px-8 py-4 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {t("continue")}
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </form>
  );
}
