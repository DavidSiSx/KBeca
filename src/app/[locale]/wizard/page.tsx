"use client";

import { useEffect } from "react";
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
  const { step, prevStep, reset } = useWizardStore();
  const t = useTranslations("Wizard.page");

  useEffect(() => {
    // Si el wizard se monta (el usuario entra), nos aseguramos de que inicie limpio.
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        title="KBeca"
        onBackClick={handleBack}
        onHelpClick={() =>
          alert(
            "KBeca te guía paso a paso para encontrar becas compatibles con tu perfil. Asegúrate de contestar con honestidad."
          )
        }
      />

      <main className="flex-grow px-4 md:px-8 py-8 md:py-12 max-w-[1140px] mx-auto w-full flex flex-col gap-6 md:gap-10">
        {/* Barra de progreso brutalista con detalle cómic */}
        <div className="w-full mb-2 md:mb-6 flex flex-col gap-3 relative">
          {/* Tag de cómic rotado */}
          <div className="absolute -top-6 left-2 bg-[#99601d] text-white px-3 py-1 border-[3px] border-on-background font-display-md font-black uppercase tracking-widest text-xs md:text-sm -rotate-3 shadow-[3px_3px_0px_0px_#1c1c18] z-10">
            ¡PASO {step}!
          </div>
          
          <div className="w-full h-8 border-[3px] border-on-background bg-surface-container-lowest shadow-[4px_4px_0px_0px_#1c1c18] relative overflow-hidden flex items-center">
            {/* Fondo halftone ligero (detalle de cómic) */}
            <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px]" />
            
            {/* Relleno de progreso */}
            <div 
              className="h-full bg-primary border-r-[3px] border-on-background transition-all duration-500 ease-out relative"
              style={{ width: `${(step / 5) * 100}%` }}
            >
              {/* Halftone sobre el relleno para darle textura */}
              <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center font-display-md font-black text-sm md:text-base tracking-widest mix-blend-difference text-white pointer-events-none">
              {step} DE 5
            </div>
          </div>
        </div>

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
