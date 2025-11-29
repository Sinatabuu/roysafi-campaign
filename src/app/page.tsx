// src/app/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import PollWidget from "../components/PollWidget";

const WardMap = dynamic(
  () => import("../components/WardMap").then((mod) => mod.WardMap),
  { ssr: false }
);


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.3fr,1fr] gap-10 items-center">
          {/* Left: text + logo */}
          <div className="text-center md:text-left">
            {/* Logo */}
            <div className="flex justify-center md:justify-start mb-4">
              <Image
                src="/Safilogo.png"
                alt="Roy Safi logo"
                width={72}
                height={72}
                className="rounded-full shadow-lg border-2 border-white/70"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Roy Safi for Roysambu
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light max-w-xl md:max-w-2xl mx-auto md:mx-0">
              A 5-Year Master Plan for Roysambu — youth, jobs, safe estates, and
              dignified living in every ward.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#map"
                className="bg-white text-[#2B27AB] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
              >
                View Ward Plans
              </a>
              <a
              href="/roysambu"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700 transition"
            >
              Take the Roysambu People’s Poll
            </a>
              <a
                href="/get-involved"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition"
              >
                Get Involved
              </a>
            </div>
          </div>

          {/* Right: candidate photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/70 bg-black/10">
              <Image
                src="/HonKaruri.png"
                alt="Hon. Sammy Karuri"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 320px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map + Ward Focus */}
      <section
        id="map"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            See Your Hood on the Map
          </h2>
          <p className="mt-3 text-gray-700 max-w-4xl mx-auto text-sm sm:text-base">
            Zoom and move around the satellite map to see your estate and
            neighborhood in Roysambu. Tap a ward button or search TRM, Seasons,
            Githurai 44, Zimmerman, or Kahawa to explore the 5-year development
            focus for your area.
          </p>
        </div>

        {/* ✅ Only ONE map component here */}
        <WardMap />
      </section>

      {/* Community Poll Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2B27AB] mb-3">
              Help Set Roysambu’s Priorities
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              This live community poll helps us understand what matters most in
              your ward. Your input will guide the 5-year plan for roads,
              water, free Wi-Fi, youth jobs, and safety in Roysambu Ward,
              Githurai, Kahawa West, Kahawa, and Zimmerman.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              We will publish anonymised ward-level summaries so residents can
              see what their neighbours are saying and how that shapes real
              projects.
            </p>
          </div>

          {/* ✅ Only ONE PollWidget here */}
          <PollWidget />
        </div>
      </section>
    </main>
  );
}
