// src/components/ManifestoBanner.tsx
"use client";
import React from "react";
import Link from "next/link";

export function ManifestoBanner() {
  return (
    <div className="border-y border-[#2B27AB]/10 bg-[#F5F6FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] sm:text-xs text-gray-700 text-center sm:text-left">
          <span className="font-semibold uppercase tracking-wide text-[#2B27AB]">
            Roysambu 5-Year Plan ·{" "}
          </span>
        </p>

        <Link
          href="/manifesto"
          className="inline-flex items-center rounded-full bg-[#2B27AB] px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-white shadow hover:bg-[#241f88] transition"
        >
          Open Manifesto
          <span className="ml-1 text-xs sm:text-sm">→</span>
        </Link>
      </div>
    </div>
  );
}
