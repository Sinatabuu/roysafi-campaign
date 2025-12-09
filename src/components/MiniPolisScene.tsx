"use client";

import React from "react";

export default function MiniPolisScene() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-slate-900/95 text-slate-100 p-6 flex flex-col items-center justify-center min-h-[260px]">
      <p className="text-xs uppercase tracking-wide text-emerald-300 mb-2">
        RoySafi Mini-Polis (Prototype)
      </p>
      <p className="text-sm text-center max-w-md">
        The interactive low-poly 3D view of Roysambu will appear here once the
        Blender scene and web integration are ready. For now, this is a
        placeholder so we can design the page and ship other features.
      </p>
    </div>
  );
}
