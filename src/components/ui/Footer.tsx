import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Landing");

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-16 gap-6 md:gap-8 w-full bg-primary text-on-primary border-t-4 border-on-background mt-auto">
      <div className="flex flex-col items-center md:items-start gap-4">
        <Link href="/" className="flex items-center gap-3 font-headline-md text-headline-md font-black tracking-tighter hover:opacity-90 transition-opacity">
          <Image src="/kbeca-logo-clean.svg" alt="KBeca Logo" width={48} height={48} className="w-12 h-12 object-contain bg-background rounded-md border-2 border-on-background" />
          KBeca
        </Link>
        <p className="font-body-sm text-body-sm text-on-primary/80 text-center md:text-left max-w-xl">
          {t("footer.disclaimer")}
        </p>
      </div>
      <div className="flex gap-6 mt-4 md:mt-0">
        <Link
          className="font-label-bold text-label-bold text-on-primary/80 hover:text-on-primary p-1 transition-colors"
          href="/privacidad"
        >
          {t("footer.privacy")}
        </Link>
        <Link
          className="font-label-bold text-label-bold text-on-primary/80 hover:text-on-primary p-1 transition-colors"
          href="/terminos"
        >
          {t("footer.help")}
        </Link>
      </div>
    </footer>
  );
}
