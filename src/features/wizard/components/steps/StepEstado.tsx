import { useWizardUrl } from "@/features/wizard/hooks/useWizardUrl";
import { ArrowRight } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

import { ESTADOS } from "@/config/estados";

export function StepEstado() {
  const { estado, setEstado, nextStep, target } = useWizardUrl();
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
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full w-full">
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
        className="mb-xl flex-grow w-full block"
      >
        <span className="sr-only">{t("listTitle")}</span>
        <div className="relative w-full sm:w-[400px]">
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
        <Button
          type="submit"
          disabled={!estado}
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
