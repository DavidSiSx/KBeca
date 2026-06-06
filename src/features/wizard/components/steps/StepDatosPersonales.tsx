import { useWizardStore } from "@/features/wizard/store/wizard-store";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
const GENDER_OPTIONS = [
  { value: "Femenino", label: "Femenino" },
  { value: "Masculino", label: "Masculino" },
  { value: "Otro", label: "Otro / Prefiero no decirlo" },
];

import { useState } from "react";
export function StepDatosPersonales() {
  const {
    gender,
    setGender,
    age,
    setAge,
    hasChildren,
    setHasChildren,
    isPregnant,
    setIsPregnant,
    prevStep,
    nextStep,
    target,
  } = useWizardStore();
  const t = useTranslations("Wizard.StepDatosPersonales");
  const [isAgeApprox, setIsAgeApprox] = useState(false);
  const isMyself = target === "myself";

  const genderOptions = [
    { value: "Femenino", label: t("genders.female") },
    { value: "Masculino", label: t("genders.male") },
    { value: "Otro", label: t("genders.other") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      gender &&
      age !== null &&
      age >= 10 &&
      age <= 99 &&
      hasChildren !== null
    ) {
      if (gender === "Femenino" && isPregnant === null) return;
      nextStep();
    }
  };

  const isFormValid =
    gender !== null &&
    age !== null &&
    age >= 10 &&
    age <= 99 &&
    hasChildren !== null &&
    (gender !== "Femenino" || isPregnant !== null);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-grow h-full content-start"
    >
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-base">
          {t("title")}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {t("description")}
        </p>
      </div>

      <fieldset className="flex-grow mb-xl border-0 p-0 m-0 flex flex-col gap-lg">
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface"
            htmlFor="gender-select"
          >
            {t("gender")}
          </label>
          <CustomSelect
            id="gender-select"
            options={genderOptions}
            value={gender}
            onChange={(val) =>
              setGender(val as "Femenino" | "Masculino" | "Otro")
            }
            placeholder={t("genderPlaceholder")}
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label
            className="font-label-md text-label-md text-on-surface"
            htmlFor="age-input"
          >
            {isAgeApprox ? t("ageApprox") : t("age")}
          </label>
          {!isMyself && (
            <label className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={isAgeApprox}
                onChange={(e) => setIsAgeApprox(e.target.checked)}
                className="w-4 h-4 text-secondary border-outline-variant focus:ring-secondary focus:ring-offset-2 rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {t("ageUnknown")}
              </span>
            </label>
          )}
          <input
            id="age-input"
            type="number"
            min="10"
            max="99"
            value={age || ""}
            onChange={(e) => setAge(parseInt(e.target.value))}
            placeholder={t("agePlaceholder")}
            className="w-[120px] h-[56px] px-4 py-2 border-2 border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary rounded-lg font-body-lg text-body-lg text-on-surface bg-surface-container-lowest placeholder-on-surface-variant outline-none hover:border-outline transition-colors"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <span className="font-label-md text-label-md text-on-surface">
            {t("hasChildren", {
              target: t(
                `hasChildren_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
              ),
            })}
          </span>
          <div className="flex gap-4 mt-2">
            <label className="relative flex items-center cursor-pointer gap-2">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === true}
                onChange={() => setHasChildren(true)}
                className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary focus:ring-offset-2"
              />
              <span className="font-body-md text-body-md text-on-surface">
                {t("yes")}
              </span>
            </label>
            <label className="relative flex items-center cursor-pointer gap-2 ml-4">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === false}
                onChange={() => setHasChildren(false)}
                className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary focus:ring-offset-2"
              />
              <span className="font-body-md text-body-md text-on-surface">
                {t("no")}
              </span>
            </label>
          </div>
        </div>

        {gender === "Femenino" && (
          <div className="flex flex-col gap-xs animate-in fade-in slide-in-from-top-4 duration-300 bg-surface-container p-4 rounded-lg mt-2">
            <span className="font-label-md text-label-md text-on-surface">
              {t("pregnant", {
                target: t(
                  `pregnant_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
                ),
              })}
            </span>
            <div className="flex gap-4 mt-2">
              <label className="relative flex items-center cursor-pointer gap-2">
                <input
                  type="radio"
                  name="isPregnant"
                  checked={isPregnant === true}
                  onChange={() => setIsPregnant(true)}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary focus:ring-offset-2"
                />
                <span className="font-body-md text-body-md text-on-surface">
                  {t("yes")}
                </span>
              </label>
              <label className="relative flex items-center cursor-pointer gap-2 ml-4">
                <input
                  type="radio"
                  name="isPregnant"
                  checked={isPregnant === false}
                  onChange={() => setIsPregnant(false)}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary focus:ring-offset-2"
                />
                <span className="font-body-md text-body-md text-on-surface">
                  {t("no")}
                </span>
              </label>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
              {t("maternitySupport")}
            </p>
          </div>
        )}
      </fieldset>

      <div className="fixed md:static bottom-0 left-0 w-full p-gutter bg-surface md:bg-transparent border-t border-outline-variant md:border-0 z-30 pb-safe md:pb-0 flex flex-col md:flex-row gap-4 mt-auto md:mt-xl md:justify-end">
        <Button
          type="button"
          variant="tonal"
          onClick={prevStep}
          className="hidden md:flex h-[56px] rounded-full"
        >
          {t("back")}
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid}
          className="w-full md:w-auto h-[56px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-full"
        >
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}
