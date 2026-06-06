"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TopAppBar } from "@/components/ui/TopAppBar";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Aplicación falló:", error);
  }, [error]);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <TopAppBar
        title={
          <span className="flex items-center gap-xs justify-center">
            <span
              aria-hidden="true"
              className="material-symbols-outlined fill text-2xl"
            >
              school
            </span>
            KBeca
          </span>
        }
        showBackButton={false}
        showHelpButton={false}
      />

      <main className="flex-grow flex flex-col items-center justify-center p-gutter text-center">
        <span className="material-symbols-outlined text-8xl text-error mb-6">
          warning
        </span>
        <h1 className="font-headline-xl text-headline-xl text-error mb-4">
          {t("title")}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[448px] mb-8">
          {t("description")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className={buttonVariants({ variant: "filled", size: "lg" })}
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t("backToHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}
