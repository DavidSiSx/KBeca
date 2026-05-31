import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { UserCircle, Users, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

export function StepTarget() {
  const { target, setTarget, nextStep } = useWizardStore();
  const t = useTranslations("Wizard.StepTarget");

  const handleSelect = (selectedTarget: 'myself' | 'child' | 'other') => {
    setTarget(selectedTarget);
    // Give a tiny delay for visual feedback of the click before advancing
    setTimeout(() => {
      nextStep();
    }, 150);
  };

  const options = [
    {
      id: 'myself' as const,
      label: t("options.myself"),
      icon: <UserCircle className="w-8 h-8 md:w-10 md:h-10 text-primary mb-sm" />
    },
    {
      id: 'child' as const,
      label: t("options.child"),
      icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-primary mb-sm" />
    },
    {
      id: 'other' as const,
      label: t("options.other"),
      icon: <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-primary mb-sm" />
    }
  ];

  return (
    <div className="flex flex-col flex-grow h-full content-start">
      <div className="mb-lg text-center md:text-left">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-base">
          {t("title")}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {t("description")}
        </p>
      </div>

      <div className="flex-grow flex flex-col gap-base md:flex-row md:justify-center md:gap-gutter pt-md">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`flex flex-col items-center justify-center p-xl md:p-2xl border-2 rounded-2xl transition-all duration-200 flex-1 w-full md:max-w-[280px] hover:bg-surface-container-low hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
              target === option.id 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-outline-variant bg-surface-container-lowest'
            }`}
          >
            {option.icon}
            <span className="font-label-lg text-label-lg text-on-surface mt-xs text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
