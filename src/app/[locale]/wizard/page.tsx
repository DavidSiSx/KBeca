"use client";

import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { StepTarget } from "@/features/wizard/components/steps/StepTarget";
import { StepEstado } from "@/features/wizard/components/steps/StepEstado";
import { StepNivel } from "@/features/wizard/components/steps/StepNivel";
import { StepDatosPersonales } from "@/features/wizard/components/steps/StepDatosPersonales";
import { StepGrupos } from "@/features/wizard/components/steps/StepGrupos";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { TopAppBar } from "@/components/ui/TopAppBar";
export default function WizardPage() {
  const { step, prevStep } = useWizardStore();
  const t = useTranslations("Wizard.page");

  const handleBack = () => {
    if (step > 1) {
      prevStep();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-background text-on-background font-body-lg text-body-lg min-h-screen flex flex-col pb-[100px]">
      <TopAppBar 
        title={
          <>{t("step", { step })} <span className="opacity-60 text-sm align-middle">{t("of", { total: 5 })}</span></>
        } 
        onBackClick={handleBack} 
        onHelpClick={() => alert("KBeca te guía paso a paso para encontrar becas compatibles con tu perfil. Asegúrate de contestar con honestidad.")}
      />

      <main className="flex-grow px-gutter py-lg max-w-[1140px] mx-auto w-full flex flex-col">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex-grow flex flex-col">
          {step === 1 && <StepTarget />}
          {step === 2 && <StepEstado />}
          {step === 3 && <StepNivel />}
          {step === 4 && <StepDatosPersonales />}
          {step === 5 && <StepGrupos />}
        </div>
      </main>

    </div>
  );
}
