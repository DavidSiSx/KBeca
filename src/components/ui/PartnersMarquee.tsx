"use client";

import { useTranslations } from "next-intl";

const PARTNERS_ROW_1 = [
  { name: "UNAM", domain: "unam.mx" },
  { name: "Santander", domain: "santander.com" },
  { name: "CONAHCYT", domain: "conacyt.mx" },
  { name: "Fundación Telmex", domain: "fundaciontelmextelcel.org" },
  { name: "IPN", domain: "ipn.mx" },
  { name: "SEP", domain: "sep.gob.mx" },
  { name: "Bécalos", domain: "becalos.mx" },
];

const PARTNERS_ROW_2 = [
  { name: "UAM", domain: "uam.mx" },
  { name: "Tec de Monterrey", domain: "tec.mx" },
  { name: "Fundación Chevening", domain: "chevening.org" },
  { name: "Fulbright Comexus", domain: "comexus.org.mx" },
  { name: "UANL", domain: "uanl.mx" },
  { name: "UDG", domain: "udg.mx" },
  { name: "Banxico", domain: "banxico.org.mx" },
];

const PARTNERS_ROW_3 = [
  { name: "INJUVE", domain: "injuve.cdmx.gob.mx" },
  { name: "Fundación Carlos Slim", domain: "fundacioncarlosslim.org" },
  { name: "OEA", domain: "oas.org" },
  { name: "AMEXCID", domain: "gob.mx" },
  { name: "Iberdrola", domain: "iberdrolamexico.com" },
  { name: "Fundación Lideres", domain: "lideresdelmanana.itesm.mx" },
  { name: "BBVA", domain: "bbva.mx" },
];

export default function PartnersMarquee() {
  const t = useTranslations("Index");
  
  // Duplicamos los arreglos para el scroll infinito fluido
  const row1 = [...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1];
  const row2 = [...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2];
  const row3 = [...PARTNERS_ROW_3, ...PARTNERS_ROW_3, ...PARTNERS_ROW_3];

  const renderLogoCard = (partner: {name: string, domain: string}, index: number) => (
    <div 
      key={`${partner.name}-${index}`} 
      className="flex-none w-auto min-w-[200px] h-32 px-8 bg-surface-container-lowest border-[3px] border-on-background flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_#1c1c18] group hover:bg-on-background transition-colors cursor-default"
    >
      {/* 
        TODO: Cuando tengas los logos SVG listos, colócalos en la carpeta /public/logos/ 
        y descomenta la línea de abajo, eliminando el <span> de texto.
        
        <img src={`/logos/${partner.domain}.svg`} alt={`Logo de ${partner.name}`} className="h-16 w-auto object-contain" />
      */}
      <span className="font-display-md text-xl md:text-2xl text-center text-on-background group-hover:text-surface-container-lowest font-[800] leading-tight transition-colors">
        {partner.name}
      </span>
    </div>
  );

  return (
    <section className="py-24 bg-background border-b-[4px] border-on-background overflow-hidden relative" aria-labelledby="partners-title">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20 mb-16 text-center">
        <h2 id="partners-title" className="font-display-md text-[32px] md:text-[48px] leading-[1.1] font-[700] text-on-background mb-4">
          Fuentes que consultamos
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Consultamos directamente los portales públicos de las principales instituciones educativas y organismos de financiamiento de México.
        </p>
      </div>

      <div className="flex flex-col gap-6 relative w-full overflow-hidden">
        {/* Fila 1 - Izquierda */}
        <div className="flex w-max animate-marquee-left pause-on-hover gap-6 pl-6">
          {row1.map(renderLogoCard)}
        </div>

        {/* Fila 2 - Derecha (Añadimos un offset negativo inicial para evitar gaps y usamos w-max) */}
        <div className="flex w-max animate-marquee-right pause-on-hover gap-6 -ml-[50vw]">
          {row2.map(renderLogoCard)}
        </div>

        {/* Fila 3 - Izquierda */}
        <div className="flex w-max animate-marquee-left pause-on-hover gap-6 pl-6">
          {row3.map(renderLogoCard)}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-20 mt-16 text-center relative z-10">
        <p className="font-body-md text-sm text-on-surface-variant max-w-4xl mx-auto">
          KBeca no está afiliada ni es representante oficial de ninguna de estas instituciones. La información se obtiene de sus portales públicos de acceso libre.
        </p>
      </div>

      {/* Degradado para los bordes de la pantalla y dar efecto infinito */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  );
}
