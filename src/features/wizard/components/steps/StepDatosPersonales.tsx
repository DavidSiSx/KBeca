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
        <h2 className="font-display-md text-[32px] md:text-[40px] leading-[1.1] font-[700] text-on-background mb-sm">
          {t("title")}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-prose">
          {t("description")}
        </p>
      </div>

      <fieldset className="flex-grow mb-xl border-0 p-0 m-0 flex flex-col gap-8 max-w-lg">
        <div className="flex flex-col gap-2">
          <label
            className="font-display-md text-lg font-bold text-on-surface uppercase tracking-wide"
            htmlFor="gender-select"
          >
            {t("gender")}
          </label>
          <div className="p-1 border-[3px] border-on-background bg-surface-container-lowest shadow-[6px_6px_0px_0px_#1c1c18]">
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
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-display-md text-lg font-bold text-on-surface uppercase tracking-wide"
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
                className="w-5 h-5 text-secondary border-[2px] border-on-background rounded-none focus:ring-secondary focus:ring-offset-2"
              />
              <span className="font-body-md font-bold text-on-surface-variant">
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
            className="w-[140px] h-[56px] px-4 py-2 border-[3px] border-on-background rounded-sm shadow-[4px_4px_0px_0px_#1c1c18] font-display-md font-bold text-xl text-on-surface bg-surface-container-lowest placeholder-on-surface-variant outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#1c1c18] transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display-md text-lg font-bold text-on-surface uppercase tracking-wide">
            {t("hasChildren", {
              target: t(
                `hasChildren_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
              ),
            })}
          </span>
          <div className="flex gap-6 mt-2">
            <label className="relative flex items-center cursor-pointer gap-3">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === true}
                onChange={() => setHasChildren(true)}
                className="w-6 h-6 text-primary border-[3px] border-on-background focus:ring-primary focus:ring-offset-2"
              />
              <span className="font-body-lg font-bold text-on-surface">
                {t("yes")}
              </span>
            </label>
            <label className="relative flex items-center cursor-pointer gap-3">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === false}
                onChange={() => setHasChildren(false)}
                className="w-6 h-6 text-primary border-[3px] border-on-background focus:ring-primary focus:ring-offset-2"
              />
              <span className="font-body-lg font-bold text-on-surface">
                {t("no")}
              </span>
            </label>
          </div>
        </div>

        {gender === "Femenino" && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300 bg-secondary-container text-on-secondary-container border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] p-5 rounded-sm mt-2 relative">
            {/* Comic detail on the extra box */}
            <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />
            <span className="font-display-md text-lg font-bold uppercase tracking-wide relative z-10">
              {t("pregnant", {
                target: t(
                  `pregnant_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
                ),
              })}
            </span>
            <div className="flex gap-6 mt-2 relative z-10">
              <label className="relative flex items-center cursor-pointer gap-3">
                <input
                  type="radio"
                  name="isPregnant"
                  checked={isPregnant === true}
                  onChange={() => setIsPregnant(true)}
                  className="w-6 h-6 text-on-background border-[3px] border-on-background focus:ring-on-background focus:ring-offset-2"
                />
                <span className="font-body-lg font-bold">
                  {t("yes")}
                </span>
              </label>
              <label className="relative flex items-center cursor-pointer gap-3">
                <input
                  type="radio"
                  name="isPregnant"
                  checked={isPregnant === false}
                  onChange={() => setIsPregnant(false)}
                  className="w-6 h-6 text-on-background border-[3px] border-on-background focus:ring-on-background focus:ring-offset-2"
                />
                <span className="font-body-lg font-bold">
                  {t("no")}
                </span>
              </label>
            </div>
            <p className="font-body-md font-bold text-sm mt-2 relative z-10 opacity-90">
              {t("maternitySupport")}
            </p>
          </div>
        )}
      </fieldset>

      <div className="mt-auto pt-lg pb-safe flex flex-col md:flex-row gap-4 w-full md:mt-xl md:justify-end">
        <button
          type="button"
          onClick={prevStep}
          className="hidden md:flex items-center justify-center font-display-md text-lg uppercase tracking-wider font-bold bg-surface-variant text-on-surface border-[3px] border-on-background px-8 py-4 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
        >
          {t("back")}
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full md:w-auto font-display-md text-lg uppercase tracking-wider font-bold bg-primary text-on-primary border-[3px] border-on-background px-8 py-4 shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] disabled:cursor-not-allowed"
        >
          {t("continue")}
        </button>
      </div>
    </form>
  );
}
