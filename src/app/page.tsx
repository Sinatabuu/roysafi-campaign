// src/app/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const WardMap = dynamic(() => import("../components/WardMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: logo + text + bio */}
          <div className="text-center md:text-left">
            {/* Logo (keeping your original behaviour) */}
            <div className="flex justify-center md:justify-start mb-4">
              <Image
                src="/Safilogo.png"
                alt="Roy Safi logo"
                width={72}
                height={72}
                className="rounded-full shadow-lg border-2 border-white/70"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              Roy Safi
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/80">
              Roysambu • Youth • Housing • Community Development
            </p>

            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light max-w-xl md:max-w-none">
              A 5-Year Master Plan for Roysambu — youth, jobs, safe estates, and
              dignified living for every ward.
            </p>

            {/* Sammy bio */}
            <p className="mt-4 text-sm sm:text-base text-white/90 max-w-xl md:max-w-none">
              Sammy Maigwa Karuri is a teacher, mentor, and community developer
              with deep roots in Roysambu and years of experience in youth
              empowerment, TVET education, and affordable housing projects in
              Kenya and abroad.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
              <a
                href="#map"
                className="bg-white text-[#2B27AB] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
              >
                View Ward Plans
              </a>
              <a
                href="/get-involved"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition"
              >
                Get Involved
              </a>
            </div>
          </div>

          {/* Right: Hon. Karuri portrait */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/70 bg-white/10">
              <Image
                src="/HonKaruri.png"
                alt="Hon. Sammy Karuri portrait"
                fill
                className="object-cover"
                priority
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
            Data-Driven Development: See Your Hood on the Map
          </h2>
          <p className="mt-3 text-gray-700 max-w-4xl mx-auto">
            Zoom, pan, and explore Roysambu. Tap a ward below the map to fly to
            that area and see its 5-year development focus.
          </p>
        </div>

        <WardMap />
      </section>
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
    <h3 className="text-xl sm:text-2xl font-bold text-[#2B27AB]">
      Polling Stations as Community Hubs
    </h3>
    <p className="mt-2 text-sm sm:text-base text-gray-700">
      We are using existing public data about polling stations in Roysambu to
      plan future community services like free Wi-Fi, civic education, youth
      programs, and emergency response hubs in every ward.
    </p>
    <p className="mt-2 text-xs sm:text-sm text-gray-500">
      Polling stations are not just about elections — they are trusted, well-known
      places close to where people live.
    </p>
    <div className="mt-4 flex flex-wrap gap-3">
      <a
        href="https://data.afro.co.ke/polling-stations/roysambu/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full bg-[#2B27AB] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#221f84] transition"
      >
        View Polling Stations Data (AfroData)
      </a>
      <a
        href="https://data.afro.co.ke/polling-stations/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full bg-white border border-[#2B27AB] px-4 py-2 text-xs sm:text-sm font-semibold text-[#2B27AB] hover:bg-[#2B27AB]/5 transition"
      >
        Explore Full Kenya Polling Stations Dataset
      </a>
    </div>
    <p className="mt-3 text-[11px] sm:text-xs text-gray-500">
      Data source: IEBC polling stations dataset, published on AfroData (CC BY 4.0).
    </p>
  </div>
</section>

    </main>
  );
}
