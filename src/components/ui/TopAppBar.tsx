"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
interface TopAppBarProps {
  title: React.ReactNode;
  showBackButton?: boolean;
  showHelpButton?: boolean;
  onHelpClick?: () => void;
  onBackClick?: () => void;
}

export function TopAppBar({ title, showBackButton = true, showHelpButton = true, onHelpClick, onBackClick }: TopAppBarProps) {
  const router = useRouter();
  const t = useTranslations("Beca");

  const defaultHelpClick = () => {
    alert("KBeca te ayuda a encontrar becas basadas en tu perfil. Si la plataforma parece no actualizarse, intenta cambiar un dato para refrescar la búsqueda.");
  };

  return (
    <header className="w-full top-0 sticky z-40 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline">
      <div className="flex justify-between items-center h-16 px-gutter w-full max-w-[1140px] mx-auto">
        
        {/* Espacio para mantener el título centrado si no hay botón de atrás */}
        <div className="w-10">
          {showBackButton && (
            <Button 
              variant="icon"
              size="icon"
              onClick={onBackClick || (() => router.back())} 
              aria-label={t("backButton")} 
            >
              <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
            </Button>
          )}
        </div>

        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed m-0 text-center flex-1">
          {title}
        </h1>

        <div className="w-10 flex justify-end">
          {showHelpButton && (
            <Button 
              variant="icon"
              size="icon"
              onClick={onHelpClick || defaultHelpClick} 
              aria-label="Ayuda" 
            >
              <span aria-hidden="true" className="material-symbols-outlined">help</span>
            </Button>
          )}
        </div>

      </div>
    </header>
  );
}
