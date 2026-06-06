"use client";

import React from "react";
import Image from "next/image";

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none" aria-hidden="true">
      {/* ─── Main Illustration (Anclada abajo y forzada al 100% de ancho) ─── */}
      <div className="absolute bottom-0 left-0 w-full z-0 flex flex-col justify-end">
        <Image
          src="/images/hero-bg-svg.svg"
          alt="Escena del Hero"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
