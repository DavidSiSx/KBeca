import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { ArrowRight } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

import { ESTADOS } from "@/config/estados";

export function StepEstado() {
  const { estado, setEstado, nextStep } = useWizardStore();
  const t = useTranslations("Wizard.StepEstado");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (estado) nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
      <div className="mb-lg">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-sm" id="estado-heading">{t("title")}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">{t("description")}</p>
      </div>

      <fieldset aria-labelledby="estado-heading" className="border-0 p-0 m-0 mb-xl flex-grow">
        <legend className="sr-only">{t("listTitle")}</legend>
        <div className="relative">
          <CustomSelect 
            options={ESTADOS} 
            value={estado} 
            onChange={setEstado} 
            placeholder={t("placeholder")}
          />
          <div id="estado-desc" className="sr-only">{t("accessibilityDesc")}</div>
        </div>
      </fieldset>

      <div className="fixed md:static bottom-0 left-0 w-full p-gutter bg-surface md:bg-transparent border-t border-outline-variant md:border-0 z-30 pb-safe md:pb-0">
        <Button 
          type="submit" 
          disabled={!estado}
          aria-disabled={!estado}
          className="w-full md:w-auto md:min-w-[200px] md:ml-auto h-[56px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-full"
        >
          {t("continue")}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
