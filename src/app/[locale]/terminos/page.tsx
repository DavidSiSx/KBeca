import { TopAppBar } from "@/components/ui/TopAppBar";
import { Footer } from "@/components/ui/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return {
    title: "Términos y Condiciones | KBeca",
  };
}

export default function TerminosPage() {
  return (
    <div className="bg-surface-container-low text-on-background font-body-md min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      <TopAppBar
        title={
          <span className="flex items-center gap-xs justify-center font-black">
            <span
              aria-hidden="true"
              className="material-symbols-outlined fill text-3xl text-primary"
            >
              gavel
            </span>
            Términos y Condiciones
          </span>
        }
        showBackButton={true}
        showHelpButton={false}
      />

      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-20 py-12 md:py-24">
        <article className="w-full max-w-4xl flex flex-col gap-8 bg-background border-4 border-on-background p-8 md:p-16 shadow-[8px_8px_0px_0px_#1c1c18]">
          <header className="mb-4 border-b-4 border-on-background pb-8">
            <h1 className="font-headline-xl text-headline-xl md:text-[40px] font-bold text-on-background mb-2">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-on-background/80 font-body-lg">
              <strong>KBeca — Plataforma abierta de becas para México</strong>
            </p>
            <p className="text-on-background/80 font-body-sm mt-2">
              Fecha de última actualización: 2026
            </p>
          </header>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              I. Aceptación de los términos
            </h2>
            <p className="text-on-background/80">
              El acceso y uso de la plataforma KBeca (en adelante &quot;la
              Plataforma&quot;) implica la aceptación plena y sin reservas de
              los presentes Términos y Condiciones. Si el usuario no está de
              acuerdo con alguna de las disposiciones aquí contenidas, deberá
              abstenerse de utilizar la Plataforma.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              II. Naturaleza del servicio
            </h2>
            <p className="text-on-background/80">
              KBeca es una plataforma de información pública que agrega y
              presenta datos sobre convocatorias de becas educativas disponibles
              en México, provenientes de fuentes públicas y privadas. KBeca es
              un proyecto de software libre sin fines de lucro, desarrollado y
              mantenido de forma individual.
            </p>
            <p className="text-on-background/80 mt-2 font-bold">
              KBeca no es:
            </p>
            <ul className="list-disc pl-6 text-on-background/80 flex flex-col gap-1">
              <li>Una institución educativa ni organismo gubernamental.</li>
              <li>
                Una agencia de gestión de becas ni intermediario oficial de
                ningún programa.
              </li>
              <li>Un servicio de asesoría legal, académica ni financiera.</li>
              <li>
                Representante ni agente de ninguna de las instituciones cuyas
                becas aparecen en la Plataforma.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              III. Alcance y limitaciones de la información
            </h2>
            <p className="text-on-background/80">
              La información publicada en KBeca proviene de fuentes públicas y
              se actualiza de forma periódica mediante procesos automatizados.
              No obstante, KBeca no garantiza que la información sea completa,
              exacta, vigente ni que refleje en todo momento el estado oficial
              de las convocatorias.
            </p>
            <p className="text-on-background/80">
              Las condiciones, requisitos, montos y períodos de aplicación de
              cada beca son determinados exclusivamente por las instituciones
              que las otorgan. Cualquier discrepancia entre la información
              presentada en KBeca y la publicada en los sitios oficiales de las
              instituciones debe resolverse consultando la fuente oficial, cuyo
              enlace se proporciona en cada resultado.
            </p>
            <p className="text-on-background/80">
              El usuario asume la responsabilidad de verificar directamente con
              la institución correspondiente la vigencia y los requisitos de
              cualquier beca de su interés antes de iniciar un proceso de
              solicitud.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              IV. Exención de responsabilidad
            </h2>
            <p className="text-on-background/80">
              En la máxima extensión permitida por la legislación mexicana
              aplicable, KBeca y su desarrollador quedan exentos de
              responsabilidad por:
            </p>
            <ul className="list-disc pl-6 text-on-background/80 flex flex-col gap-1">
              <li>
                Decisiones tomadas por el usuario con base en la información
                presentada en la Plataforma.
              </li>
              <li>
                Errores, omisiones o desactualizaciones en los datos de las
                becas publicadas.
              </li>
              <li>
                La disponibilidad, continuidad o resultado de los procesos de
                solicitud de becas ante las instituciones correspondientes.
              </li>
              <li>
                Daños directos, indirectos, incidentales o consecuentes
                derivados del uso o imposibilidad de uso de la Plataforma.
              </li>
              <li>
                Interrupciones del servicio por mantenimiento, fallas técnicas o
                causas de fuerza mayor.
              </li>
            </ul>
            <p className="text-on-background/80 mt-2">
              La Plataforma se proporciona &quot;tal como está&quot; (as-is),
              sin garantías de ningún tipo, expresas ni implícitas.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              V. Propiedad intelectual y licencia de software
            </h2>
            <p className="text-on-background/80">
              El código fuente de KBeca se distribuye bajo licencia MIT. Esta
              licencia permite el uso, copia, modificación y distribución del
              código, sujeto a las condiciones de la licencia correspondiente.
            </p>
            <p className="text-on-background/80">
              Los datos de becas presentados en la Plataforma provienen de
              fuentes públicas. KBeca no reclama derechos de propiedad
              intelectual sobre dichos datos.
            </p>
            <p className="text-on-background/80">
              Los logotipos, marcas y denominaciones de las instituciones que
              otorgan becas son propiedad de sus respectivos titulares. Su
              aparición en KBeca tiene un propósito informativo y no implica
              afiliación, patrocinio ni respaldo por parte de dichas
              instituciones.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              VI. Conducta del usuario
            </h2>
            <p className="text-on-background/80">
              Al utilizar la Plataforma, el usuario se compromete a no realizar
              acciones que puedan interferir con su funcionamiento, incluyendo
              pero no limitado a: ataques de denegación de servicio, scraping
              masivo no autorizado, inyección de código malicioso o cualquier
              actividad que contravenga la legislación mexicana vigente, en
              particular la Ley Federal de Telecomunicaciones y Radiodifusión y
              el Código Penal Federal en su capítulo de delitos informáticos.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              VII. Legislación aplicable y jurisdicción
            </h2>
            <p className="text-on-background/80">
              Los presentes Términos y Condiciones se rigen por las leyes de los
              Estados Unidos Mexicanos. Para cualquier controversia derivada de
              su interpretación o cumplimiento, las partes se someten a la
              jurisdicción de los tribunales competentes de la ciudad de Cancún,
              Quintana Roo, renunciando expresamente a cualquier otro fuero que
              pudiera corresponderles por razón de sus domicilios presentes o
              futuros.
            </p>
          </section>

          <section className="flex flex-col gap-4 mb-8">
            <h2 className="font-display-sm font-black uppercase text-primary border-l-8 border-primary pl-4 mb-2 text-headline-md font-bold text-on-background mt-md">
              VIII. Modificaciones
            </h2>
            <p className="text-on-background/80">
              KBeca se reserva el derecho de modificar los presentes Términos y
              Condiciones en cualquier momento. Las modificaciones entrarán en
              vigor desde su publicación en la Plataforma. El uso continuado de
              la Plataforma tras la publicación de modificaciones constituirá la
              aceptación de las mismas.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
