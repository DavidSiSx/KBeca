"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TopAppBarProps {
  title: React.ReactNode;
  showBackButton?: boolean;
  showHelpButton?: boolean;
  helpText?: string;
  onBackClick?: () => void;
}

export function TopAppBar({
  title,
  showBackButton = true,
  showHelpButton = true,
  helpText,
  onBackClick,
}: TopAppBarProps) {
  const router = useRouter();
  const t = useTranslations("Beca");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const textToShow = helpText || "KBeca te ayuda a encontrar becas basadas en tu perfil. Si la plataforma parece no actualizarse, intenta cambiar un dato para refrescar la búsqueda.";

  return (
    <>
      <header className="w-full top-0 sticky z-40 bg-background border-b-4 border-on-background">
        <div className="flex justify-between items-center h-20 px-4 md:px-20 w-full max-w-[1280px] mx-auto">
          <div className="w-12 flex justify-start">
            {showBackButton && (
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 shadow-[2px_2px_0px_0px_#1c1c18] border-2 rounded-none p-0 flex items-center justify-center hover:translate-x-0 hover:translate-y-0"
                onClick={onBackClick || (() => router.back())}
                aria-label={t("backButton")}
              >
                <span aria-hidden="true" className="material-symbols-outlined text-on-background font-bold">
                  arrow_back
                </span>
              </Button>
            )}
          </div>

          <h1 className="font-display-md text-headline-md md:text-headline-lg font-black text-on-background m-0 text-center flex-1 tracking-tighter">
            {title}
          </h1>

          <div className="w-12 flex justify-end">
            {showHelpButton && (
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 shadow-[2px_2px_0px_0px_#1c1c18] border-2 rounded-none p-0 flex items-center justify-center hover:translate-x-0 hover:translate-y-0"
                onClick={() => setIsHelpOpen(true)}
                aria-label="Ayuda"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-on-background font-bold">
                  help
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Modal de Ayuda (Glassmorphism + Neo-Brutalismo) */}
      {isHelpOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm bg-transparent border-none w-full h-full m-0 max-w-none max-h-none"
          aria-labelledby="help-modal-title"
        >
          <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle,#000_2px,transparent_2px)] bg-[length:8px_8px] pointer-events-none" />
          <div className="bg-surface-container-lowest border-[3px] border-on-background rounded-sm p-8 w-full max-w-[400px] shadow-[8px_8px_0px_0px_#1c1c18] animate-in fade-in zoom-in duration-200 relative z-10 flex flex-col gap-6 text-center">
            <div className="w-16 h-16 bg-primary mx-auto border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-4xl stroke-[3]">
                info
              </span>
            </div>
            
            <h2 id="help-modal-title" className="font-display-md text-2xl font-black uppercase tracking-wider text-on-background m-0">
              Información
            </h2>
            
            <p className="font-body-lg font-bold text-on-surface-variant leading-relaxed">
              {textToShow}
            </p>
            
            <Button 
              variant="filled" 
              size="lg" 
              className="w-full mt-2" 
              onClick={() => setIsHelpOpen(false)}
            >
              Entendido
            </Button>
          </div>
        </dialog>
      )}
    </>
  );
}
