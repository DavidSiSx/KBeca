"use client";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <head></head>
      <body className="font-body bg-background flex items-center justify-center min-h-screen m-0">
        <div className="text-center">
          <h1 className="text-6xl font-headline font-bold text-primary mb-4">
            404
          </h1>
          <p className="text-lg text-on-background mb-8">
            La página que buscas no existe o fue movida.
          </p>
          <Link
            href="/es"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
