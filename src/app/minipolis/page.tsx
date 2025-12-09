// src/app/minipolis/page.tsx
"use client";

import React from "react";
import MiniPolisScene from "../../components/MiniPolisScene";


export default function MiniPolisPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-[#2B27AB] mb-3">
          RoySafi Mini-Polis
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-3xl">
          This is our 3D, low-poly vision of a modern Roysambu — showing roads,
          estates, markets, bodaboda stages, and youth hubs from a bird’s-eye
          view. As the assets are finalized in Blender, this page will become
          the main window into the future city.
        </p>

        <MiniPolisScene />
      </section>
    </main>
  );
}
