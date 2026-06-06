"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function BackButton() {
  const router = useRouter();
  const t = useTranslations("Beca");

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={t("backButton")}
      className="text-primary dark:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest p-2 rounded-full active:scale-95 transition-transform duration-200 inline-flex items-center"
    >
      <span aria-hidden="true" className="material-symbols-outlined">
        arrow_back
      </span>
    </button>
  );
}
