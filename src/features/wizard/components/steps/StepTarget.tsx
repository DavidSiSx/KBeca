import { useWizardUrl } from "@/features/wizard/hooks/useWizardUrl";
import { UserCircle, Users, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

export function StepTarget() {
  const { target, setTarget, nextStep } = useWizardUrl();
  const t = useTranslations("Wizard.StepTarget");

  const handleSelect = (selectedTarget: "myself" | "child" | "other") => {
    setTarget(selectedTarget);
    // Give a tiny delay for visual feedback of the click before advancing
    setTimeout(() => {
      nextStep();
    }, 150);
  };

  const options = [
    {
      id: "myself" as const,
      label: t("options.myself"),
      icon: (
        <UserCircle className="w-8 h-8 md:w-10 md:h-10 mb-2" />
      ),
    },
    {
      id: "child" as const,
      label: t("options.child"),
      icon: <Users className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
    },
    {
      id: "other" as const,
      label: t("options.other"),
      icon: <UserPlus className="w-8 h-8 md:w-10 md:h-10 mb-2" />,
    },
  ];

  return (
    <div className="flex flex-col flex-grow h-full content-start">
      <div className="mb-lg text-center md:text-left">
        <h2 className="font-display-md text-[32px] md:text-[40px] leading-[1.1] font-[700] text-on-background mb-base">
          {t("title")}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-prose mx-auto md:mx-0">
          {t("description")}
        </p>
      </div>

      <div className="flex-grow flex flex-col gap-4 md:flex-row md:justify-center md:gap-6 pt-4">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`group relative flex flex-col items-center justify-center p-6 md:p-8 border-[3px] border-on-background rounded-sm transition-all duration-200 flex-1 w-full md:max-w-[280px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary ${
              target === option.id
                ? "bg-primary text-on-primary shadow-none translate-x-[4px] translate-y-[4px]"
                : "bg-surface-container-lowest text-on-background shadow-[6px_6px_0px_0px_#1c1c18] hover:bg-primary hover:text-on-primary hover:shadow-[2px_2px_0px_0px_#1c1c18] hover:translate-x-[4px] hover:translate-y-[4px]"
            }`}
          >
            {/* Halftone texture sutil en hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.1] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none transition-opacity duration-300" />
            
            <div className={`transition-colors duration-200 ${target === option.id ? "text-on-primary" : "text-primary group-hover:text-on-primary"}`}>
              {option.icon}
            </div>
            <span className="font-display-md text-lg md:text-xl uppercase tracking-wider mt-4 text-center font-bold relative z-10">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
