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

      <fieldset className="flex-grow mb-xl border-0 p-0 m-0 flex flex-col gap-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <div className="flex flex-col gap-2 w-full sm:w-[400px] md:pt-[23px]">
            <label
              className="font-display-md text-lg font-bold text-on-surface uppercase tracking-wide"
              htmlFor="gender-select"
            >
              {t("gender")}
            </label>
            <div className="relative w-full z-20">
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

          {gender === "Femenino" && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-left-8 duration-500 ease-out bg-secondary-container text-on-secondary-container border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] p-5 rounded-sm relative max-w-full">
              {/* Comic detail on the extra box */}
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />
              <span className="font-display-md text-lg font-bold uppercase tracking-wide relative z-10">
                {t("pregnant", {
                  target: t(
                    `pregnant_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
                  ),
                })}
              </span>
              <div className="flex gap-4 mt-4 relative z-10 w-full sm:w-[400px]">
                <label className="relative flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="isPregnant"
                    checked={isPregnant === true}
                    onChange={() => setIsPregnant(true)}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center py-3 border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] bg-background text-on-background peer-checked:bg-on-background peer-checked:text-background peer-focus-visible:ring-4 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background transition-all peer-checked:translate-x-[2px] peer-checked:translate-y-[2px] peer-checked:shadow-[2px_2px_0px_0px_#1c1c18]">
                    <span className="font-display-md font-bold uppercase tracking-wider">
                      {t("yes")}
                    </span>
                  </div>
                </label>
                <label className="relative flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="isPregnant"
                    checked={isPregnant === false}
                    onChange={() => setIsPregnant(false)}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center py-3 border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] bg-background text-on-background peer-checked:bg-on-background peer-checked:text-background peer-focus-visible:ring-4 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background transition-all peer-checked:translate-x-[2px] peer-checked:translate-y-[2px] peer-checked:shadow-[2px_2px_0px_0px_#1c1c18]">
                    <span className="font-display-md font-bold uppercase tracking-wider">
                      {t("no")}
                    </span>
                  </div>
                </label>
              </div>
              <p className="font-body-md font-bold text-sm mt-2 relative z-10 opacity-90">
                {t("maternitySupport")}
              </p>
            </div>
          )}
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
            className="w-full sm:w-[400px] h-[56px] px-4 py-2 border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] font-display-md font-bold text-xl text-on-surface bg-surface-container-lowest placeholder-on-surface-variant outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#1c1c18] transition-all"
          />
          {age !== null && (age < 10 || age > 99) && (
            <span className="text-error font-body-md font-bold mt-1 bg-[#f5d9d9] px-2 py-1 border-[2px] border-error w-fit shadow-[2px_2px_0px_0px_#ba1a1a]">
              {t("ageError")}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-display-md text-lg font-bold text-on-surface uppercase tracking-wide">
            {t("hasChildren", {
              target: t(
                `hasChildren_${target === "myself" ? "myself" : target === "child" ? "child" : "other"}`,
              ),
            })}
          </span>
          <div className="flex gap-4 mt-2 w-full sm:w-[400px]">
            <label className="relative flex-1 cursor-pointer">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === true}
                onChange={() => setHasChildren(true)}
                className="peer sr-only"
              />
              <div className="flex items-center justify-center py-3 border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] bg-surface-container-lowest text-on-surface peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background transition-all peer-checked:translate-x-[2px] peer-checked:translate-y-[2px] peer-checked:shadow-[2px_2px_0px_0px_#1c1c18]">
                <span className="font-display-md font-bold uppercase tracking-wider">
                  {t("yes")}
                </span>
              </div>
            </label>
            <label className="relative flex-1 cursor-pointer">
              <input
                type="radio"
                name="hasChildren"
                checked={hasChildren === false}
                onChange={() => setHasChildren(false)}
                className="peer sr-only"
              />
              <div className="flex items-center justify-center py-3 border-[3px] border-on-background shadow-[4px_4px_0px_0px_#1c1c18] bg-surface-container-lowest text-on-surface peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background transition-all peer-checked:translate-x-[2px] peer-checked:translate-y-[2px] peer-checked:shadow-[2px_2px_0px_0px_#1c1c18]">
                <span className="font-display-md font-bold uppercase tracking-wider">
                  {t("no")}
                </span>
              </div>
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-auto pt-lg pb-safe flex flex-col md:flex-row gap-4 w-full md:mt-xl md:justify-end">
        <Button
          type="button"
          onClick={prevStep}
          variant="tonal"
          size="lg"
          className="hidden md:flex"
        >
          {t("back")}
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid}
          variant="filled"
          size="lg"
          className="w-full md:w-auto"
        >
          {t("continue")}
        </Button>
      </div>
    </form>
  );
}
