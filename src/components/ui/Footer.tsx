import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Landing");

  return (
    <footer className="w-full bg-primary text-on-primary border-t-[6px] border-on-background mt-auto relative">
      
      {/* Wrapper para el fondo Halftone sin afectar el overflow del logo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Halftone denso */}
        <div className="absolute inset-0 opacity-[0.5] bg-[radial-gradient(circle,#000_1.5px,transparent_1.5px)] bg-[length:6px_6px] [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_90%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Logo Gigante Centrado Verticalmente */}
        <div className="w-full md:w-[40%] flex justify-center md:justify-center items-center">
          <Link 
            href="/" 
            className="group block relative w-[280px] md:w-[380px] -rotate-[20deg] hover:-rotate-[15deg] transition-transform duration-300 ease-out"
            aria-label="Ir a inicio de KBeca"
          >
            <Image 
              src="/kbeca-logo-clean.svg" 
              alt="KBeca Logo" 
              width={500} 
              height={500} 
              className="w-full h-auto object-contain brightness-0 invert drop-shadow-[4px_4px_0px_#1c1c18]" 
              priority
            />
          </Link>
        </div>

        {/* Panel de Texto y Enlaces (más compacto) */}
        <div className="w-full md:w-[60%] flex flex-col gap-5 md:gap-6 mb-4 md:mb-6">
          
          {/* Globo de texto (Panel Brutalista) */}
          <div className="bg-background text-on-background border-[4px] border-on-background shadow-[8px_8px_0px_0px_#1c1c18] p-5 md:p-8 relative">
            {/* Adorno de cinta cómic */}
            <div className="absolute -top-5 left-6 bg-[#99601d] text-white px-3 py-1 border-[4px] border-on-background font-display-md font-black uppercase tracking-widest text-sm md:text-base rotate-[-6deg] shadow-[4px_4px_0px_0px_#1c1c18]">
              Aviso
            </div>
            <p className="font-body-md text-lg md:text-xl font-bold leading-relaxed max-w-prose mt-2 text-balance">
              {t("footer.disclaimer")}
            </p>
          </div>

          {/* Enlaces de Acción Brutalistas compactos */}
          <div className="flex flex-col sm:flex-row gap-4 items-start mt-2">
            <Link
              className="bg-[#99601d] text-white border-[4px] border-on-background font-label-bold text-sm md:text-base px-6 py-2.5 shadow-[4px_4px_0px_0px_#1c1c18] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c18] active:translate-y-2 active:translate-x-2 active:shadow-[0px_0px_0px_0px_#1c1c18] transition-all w-full sm:w-auto text-center"
              href="/privacidad"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              className="bg-[#3c6b41] text-white border-[4px] border-on-background font-label-bold text-sm md:text-base px-6 py-2.5 shadow-[4px_4px_0px_0px_#1c1c18] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c18] active:translate-y-2 active:translate-x-2 active:shadow-[0px_0px_0px_0px_#1c1c18] transition-all w-full sm:w-auto text-center"
              href="/terminos"
            >
              {t("footer.help")}
            </Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
