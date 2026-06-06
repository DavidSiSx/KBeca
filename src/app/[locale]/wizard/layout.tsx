import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Wizard.page");
  return {
    title: `Buscador de Becas | KBeca`,
    description: "Encuentra becas compatibles con tu perfil en México.",
  };
}

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
