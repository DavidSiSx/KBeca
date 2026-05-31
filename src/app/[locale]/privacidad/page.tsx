import { TopAppBar } from "@/components/ui/TopAppBar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return {
    title: "Aviso de Privacidad | KBeca",
  };
}

export default async function PrivacidadPage() {
  const t = await getTranslations("Landing.nav");

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <TopAppBar 
        title={
          <span className="flex items-center gap-xs justify-center">
            <span aria-hidden="true" className="material-symbols-outlined fill text-2xl">school</span>
            KBeca
          </span>
        }
        showBackButton={true}
        showHelpButton={false}
      />

      <main className="flex-grow flex flex-col items-center w-full px-gutter md:px-container-margin py-xl">
        <article className="w-full max-w-3xl flex flex-col gap-md">
          <header className="mb-lg border-b border-outline-variant pb-md">
            <h1 className="font-headline-xl text-headline-xl md:text-[40px] font-bold text-on-surface mb-2">Aviso de Privacidad</h1>
            <p className="text-on-surface-variant font-body-lg"><strong>KBeca — Plataforma abierta de becas para México</strong></p>
            <p className="text-on-surface-variant font-body-sm mt-2">Fecha de última actualización: 2026</p>
            <p className="text-on-surface-variant font-body-sm mt-1 text-balance">
              Responsable: KBeca es un proyecto de software libre desarrollado de forma individual, sin personalidad jurídica constituida, con domicilio en Cancún, Quintana Roo, México. Para cualquier asunto relacionado con este aviso puede escribir a: <a href="mailto:davidsierrasosa01@gmail.com" className="text-primary hover:underline">davidsierrasosa01@gmail.com</a>
            </p>
          </header>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">I. Fundamento legal</h2>
            <p className="text-on-surface-variant">
              El presente aviso se emite en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), publicada en el Diario Oficial de la Federación el 5 de julio de 2010, y su Reglamento, publicado el 21 de diciembre de 2011. Asimismo, se observan los Lineamientos del Aviso de Privacidad emitidos por el INAI (antes IFAI), publicados el 17 de enero de 2013.
            </p>
            <p className="text-on-surface-variant">
              Los principios rectores aplicables son los establecidos en el artículo 6 de la LFPDPPP: licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.
            </p>
          </section>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">II. Datos personales que se recaban</h2>
            <p className="text-on-surface-variant">
              KBeca está diseñada bajo el principio de privacidad por diseño. El sistema no solicita nombre, correo electrónico, número de teléfono, CURP, ni ningún otro dato de identificación personal.
            </p>
            <p className="text-on-surface-variant">
              Los datos que el usuario ingresa en el formulario (edad, nivel académico, estado, municipio y grupos de vulnerabilidad) son procesados únicamente en memoria durante la sesión para generar los resultados de matching. Estos datos no se almacenan en ninguna base de datos, no se asocian a ningún identificador personal y se descartan de forma automática una vez que se entrega la respuesta.
            </p>
            <p className="text-on-surface-variant">
              Sin embargo, la plataforma opera sobre infraestructura de terceros (Vercel Inc.) que, como parte de su funcionamiento técnico ordinario, puede registrar de forma automatizada datos como la dirección IP del visitante, el navegador utilizado, la fecha y hora del acceso, y las rutas visitadas. Este registro es técnico, no editorial, y está sujeto a la Política de Privacidad de Vercel disponible en <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://vercel.com/legal/privacy-policy</a>. KBeca no accede, analiza ni comparte estos registros técnicos.
            </p>
          </section>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">III. Finalidades del tratamiento</h2>
            <p className="text-on-surface-variant">Los datos ingresados en el formulario se utilizan exclusivamente para:</p>
            <h3 className="font-label-lg font-bold text-on-surface mt-2">Finalidades primarias (necesarias para el servicio):</h3>
            <ul className="list-disc pl-6 text-on-surface-variant flex flex-col gap-1">
              <li>Ejecutar el motor de matching y devolver al usuario una lista de becas relevantes para su perfil.</li>
              <li>Generar una URL compartible con los parámetros de búsqueda, que permanece en el dispositivo del usuario y no se transmite a ningún servidor de almacenamiento.</li>
            </ul>
            <p className="text-on-surface-variant mt-2">
              KBeca no realiza ninguna finalidad secundaria. No se utilizan los datos para mercadotecnia, perfilamiento, análisis de comportamiento, venta a terceros ni ningún otro propósito distinto al descrito.
            </p>
          </section>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">IV. Transferencia de datos</h2>
            <p className="text-on-surface-variant">
              KBeca no transfiere datos personales a terceros con fines comerciales, publicitarios ni de ninguna otra índole. La única interacción con terceros es la infraestructura de hosting (Vercel Inc.) descrita en la sección II, que opera como encargada de procesamiento técnico y no como receptora de datos con fines propios.
            </p>
            <p className="text-on-surface-variant">
              No se realizan transferencias internacionales de datos personales por decisión editorial de KBeca. Los registros técnicos de Vercel pueden estar alojados en servidores fuera de México; dicha situación está regulada exclusivamente por los términos de servicio de Vercel.
            </p>
          </section>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">V. Derechos ARCO</h2>
            <p className="text-on-surface-variant">
              En términos del Capítulo IV de la LFPDPPP, usted tiene derecho a Acceder, Rectificar, Cancelar y Oponerse al tratamiento de sus datos personales (derechos ARCO).
            </p>
            <p className="text-on-surface-variant">
              Dado que KBeca no almacena datos personales identificables, el ejercicio de los derechos ARCO sobre los datos del formulario no es técnicamente aplicable: no existe ningún registro que recuperar, rectificar ni cancelar.
            </p>
            <p className="text-on-surface-variant">
              Para cualquier consulta relacionada con los registros técnicos de infraestructura, el responsable podrá orientarle sobre el procedimiento aplicable ante Vercel Inc. Puede escribir a: <a href="mailto:davidsierrasosa01@gmail.com" className="text-primary hover:underline">davidsierrasosa01@gmail.com</a>
            </p>
            <p className="text-on-surface-variant">
              El INAI es la autoridad competente para la protección de datos personales en México. Puede presentar quejas o consultas en <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.inai.org.mx</a>.
            </p>
          </section>

          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-md">VI. Cambios al aviso de privacidad</h2>
            <p className="text-on-surface-variant">
              KBeca se reserva el derecho de modificar el presente aviso en cualquier momento. Cualquier modificación será publicada en esta misma página con la fecha de actualización correspondiente. Se recomienda al usuario revisar periódicamente este aviso.
            </p>
          </section>
        </article>
      </main>

      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-xl py-lg text-center">
        <p className="text-on-surface-variant font-body-sm">
          &copy; {new Date().getFullYear()} KBeca. Proyecto Open Source.
        </p>
      </footer>
    </div>
  );
}
