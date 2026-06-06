import { TopAppBar } from "@/components/ui/TopAppBar";
import { Footer } from "@/components/ui/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return {
    title: "Aviso de Privacidad | KBeca",
  };
}

export default async function PrivacidadPage() {
  const t = await getTranslations("Landing.nav");

  return (
    <div className="bg-surface-container-low text-on-background font-body-md min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      <TopAppBar
        title={
          <span className="flex items-center gap-xs justify-center font-black">
            <span
              aria-hidden="true"
              className="material-symbols-outlined fill text-3xl text-primary"
            >
              policy
            </span>
            Aviso de Privacidad
          </span>
        }
        showBackButton={true}
        showHelpButton={false}
      />

      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-20 py-12 md:py-24">
        <article className="w-full max-w-4xl flex flex-col gap-8 bg-background border-4 border-on-background p-8 md:p-16 shadow-[8px_8px_0px_0px_#1c1c18]">
          <header className="mb-4 border-b-4 border-on-background pb-8">
            <h1 className="font-headline-xl text-headline-xl md:text-[40px] font-bold text-on-background mb-2">
              Aviso de Privacidad
            </h1>
            <p className="text-on-background/80 font-body-lg">
              <strong>KBeca — Plataforma abierta de becas para México</strong>
            </p>
            <p className="text-on-background/80 font-body-sm mt-2">
              Fecha de última actualización: 2026
            </p>
            <p className="text-on-background/80 font-body-sm mt-1 text-balance">
              Responsable: KBeca es un proyecto de software libre desarrollado
              de forma individual, sin personalidad jurídica constituida, con
              domicilio en Cancún, Quintana Roo, México. Para cualquier asunto
              relacionado con este aviso puede escribir a:{" "}
              <a
                href="mailto:davidsierrasosa01@gmail.com"
                className="font-bold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-on-primary transition-colors px-1"
              >
                davidsierrasosa01@gmail.com
              </a>
            </p>
          </header>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              I. Fundamento legal
            </h2>
            <p className="text-on-background/80">
              El presente aviso se emite en cumplimiento de la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares
              (LFPDPPP), publicada en el Diario Oficial de la Federación el 5 de
              julio de 2010, y su Reglamento, publicado el 21 de diciembre de
              2011. Asimismo, se observan los Lineamientos del Aviso de
              Privacidad emitidos por el INAI (antes IFAI), publicados el 17 de
              enero de 2013.
            </p>
            <p className="text-on-background/80">
              Los principios rectores aplicables son los establecidos en el
              artículo 6 de la LFPDPPP: licitud, consentimiento, información,
              calidad, finalidad, lealtad, proporcionalidad y responsabilidad.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              II. Datos personales que se recaban
            </h2>
            <p className="text-on-background/80">
              KBeca está diseñada bajo el principio de privacidad por diseño. El
              sistema no solicita nombre, correo electrónico, número de
              teléfono, CURP, ni ningún otro dato de identificación personal.
            </p>
            <p className="text-on-background/80">
              Los datos que el usuario ingresa en el formulario (edad, nivel
              académico, estado, municipio y grupos de vulnerabilidad) son
              procesados únicamente en memoria durante la sesión para generar
              los resultados de matching. Estos datos no se almacenan en ninguna
              base de datos, no se asocian a ningún identificador personal y se
              descartan de forma automática una vez que se entrega la respuesta.
            </p>
            <p className="text-on-background/80">
              Sin embargo, la plataforma opera sobre infraestructura de terceros
              (Vercel Inc.) que, como parte de su funcionamiento técnico
              ordinario, puede registrar de forma automatizada datos como la
              dirección IP del visitante, el navegador utilizado, la fecha y
              hora del acceso, y las rutas visitadas. Este registro es técnico,
              no editorial, y está sujeto a la Política de Privacidad de Vercel
              disponible en{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-on-primary transition-colors px-1"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              . KBeca no accede, analiza ni comparte estos registros técnicos.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              III. Finalidades del tratamiento
            </h2>
            <p className="text-on-background/80">
              Los datos ingresados en el formulario se utilizan exclusivamente
              para:
            </p>
            <h3 className="font-label-lg font-bold text-on-background mt-2">
              Finalidades primarias (necesarias para el servicio):
            </h3>
            <ul className="list-disc pl-6 text-on-background/80 flex flex-col gap-1">
              <li>
                Ejecutar el motor de matching y devolver al usuario una lista de
                becas relevantes para su perfil.
              </li>
              <li>
                Generar una URL compartible con los parámetros de búsqueda, que
                permanece en el dispositivo del usuario y no se transmite a
                ningún servidor de almacenamiento.
              </li>
            </ul>
            <p className="text-on-background/80 mt-2">
              KBeca no realiza ninguna finalidad secundaria. No se utilizan los
              datos para mercadotecnia, perfilamiento, análisis de
              comportamiento, venta a terceros ni ningún otro propósito distinto
              al descrito.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              IV. Transferencia de datos
            </h2>
            <p className="text-on-background/80">
              KBeca no transfiere datos personales a terceros con fines
              comerciales, publicitarios ni de ninguna otra índole. La única
              interacción con terceros es la infraestructura de hosting (Vercel
              Inc.) descrita en la sección II, que opera como encargada de
              procesamiento técnico y no como receptora de datos con fines
              propios.
            </p>
            <p className="text-on-background/80">
              No se realizan transferencias internacionales de datos personales
              por decisión editorial de KBeca. Los registros técnicos de Vercel
              pueden estar alojados en servidores fuera de México; dicha
              situación está regulada exclusivamente por los términos de
              servicio de Vercel.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              V. Derechos ARCO
            </h2>
            <p className="text-on-background/80">
              En términos del Capítulo IV de la LFPDPPP, usted tiene derecho a
              Acceder, Rectificar, Cancelar y Oponerse al tratamiento de sus
              datos personales (derechos ARCO).
            </p>
            <p className="text-on-background/80">
              Dado que KBeca no almacena datos personales identificables, el
              ejercicio de los derechos ARCO sobre los datos del formulario no
              es técnicamente aplicable: no existe ningún registro que
              recuperar, rectificar ni cancelar.
            </p>
            <p className="text-on-background/80">
              Para cualquier consulta relacionada con los registros técnicos de
              infraestructura, el responsable podrá orientarle sobre el
              procedimiento aplicable ante Vercel Inc. Puede escribir a:{" "}
              <a
                href="mailto:davidsierrasosa01@gmail.com"
                className="font-bold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-on-primary transition-colors px-1"
              >
                davidsierrasosa01@gmail.com
              </a>
            </p>
            <p className="text-on-background/80">
              El INAI es la autoridad competente para la protección de datos
              personales en México. Puede presentar quejas o consultas en{" "}
              <a
                href="https://www.inai.org.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-on-primary transition-colors px-1"
              >
                www.inai.org.mx
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              VI. Cambios al aviso de privacidad
            </h2>
            <p className="text-on-background/80">
              KBeca se reserva el derecho de modificar el presente aviso en
              cualquier momento. Cualquier modificación será publicada en esta
              misma página con la fecha de actualización correspondiente. Se
              recomienda al usuario revisar periódicamente este aviso.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
