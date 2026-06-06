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

const defaultHelpClick = () => {
  alert(
    "KBeca te ayuda a encontrar becas basadas en tu perfil. Si la plataforma parece no actualizarse, intenta cambiar un dato para refrescar la búsqueda.",
  );
};

export function TopAppBar({
  title,
  showBackButton = true,
  showHelpButton = true,
  onHelpClick,
  onBackClick,
}: TopAppBarProps) {
  const router = useRouter();
  const t = useTranslations("Beca");

  return (
    <header className="w-full top-0 sticky z-40 bg-background border-b-4 border-on-background">
      <div className="flex justify-between items-center h-20 px-4 md:px-20 w-full max-w-[1280px] mx-auto">
        <div className="w-12 flex justify-start">
          {showBackButton && (
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center bg-background border-2 border-on-background shadow-[2px_2px_0px_0px_#1c1c18] hover:bg-surface-variant active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all cursor-pointer"
              onClick={onBackClick || (() => router.back())}
              aria-label={t("backButton")}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-on-background font-bold">
                arrow_back
              </span>
            </button>
          )}
        </div>

        <h1 className="font-display-md text-headline-md md:text-headline-lg font-black text-on-background m-0 text-center flex-1 tracking-tighter">
          {title}
        </h1>

        <div className="w-12 flex justify-end">
          {showHelpButton && (
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center bg-background border-2 border-on-background shadow-[2px_2px_0px_0px_#1c1c18] hover:bg-surface-variant active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all cursor-pointer"
              onClick={onHelpClick || defaultHelpClick}
              aria-label="Ayuda"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-on-background font-bold">
                help
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
