import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { TopAppBar } from '@/components/ui/TopAppBar';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <TopAppBar 
        title={
          <span className="flex items-center gap-xs justify-center">
            <span aria-hidden="true" className="material-symbols-outlined fill text-2xl">school</span>
            KBeca
          </span>
        }
        showBackButton={false}
        showHelpButton={false}
      />
      
      <main className="flex-grow flex flex-col items-center justify-center p-gutter text-center">
        <div className="text-center flex flex-col items-center">
          <span className="material-symbols-outlined text-[64px] text-primary mb-md">search_off</span>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-sm">{t("title")}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[448px] mb-8">
            {t("description")}
          </p>
          <Link href="/" className={buttonVariants({ variant: 'filled', size: 'lg' })}>
            {t('backToHome')}
          </Link>
        </div>
      </main>
    </div>
  );
}
