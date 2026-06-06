import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Resultados");
  return {
    title: `Resultados | KBeca`,
    description: "Resultados de becas para ti",
  };
}

export default function ResultadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
