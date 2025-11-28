// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

type Ward = {
  name: string;
  stats: string;
  focus: string;
};

const wardsData: Ward[] = [
  {
    name: "Roysambu Ward",
    stats: "Infrastructure: roads, drainage, and safe walkways.",
    focus:
      "In the next 5 years, we focus on safer pedestrian routes around TRM, upgraded estate roads, and better drainage to reduce flooding.",
  },
  {
    name: "Githurai Ward",
    stats: "Digital literacy & small business support.",
    focus:
      "We will create digital learning centers, support youth in online work, and organize market reforms so traders work in cleaner, safer spaces.",
  },
  {
    name: "Kahawa West Ward",
    stats: "Water, sanitation & clean estates.",
    focus:
      "We aim for more reliable water access, modern public toilets, and organized waste collection points within walking distance.",
  },
  {
    name: "Zimmerman",
    stats: "Youth engagement, creativity & safety.",
    focus:
      "We will invest in safe evening spaces, arts and music hubs, and community policing partnerships to reduce crime and idleness.",
  },
];

const InteractiveMap: React.FC = () => {
  const [activeWard, setActiveWard] = useState<Ward>(wardsData[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Map Area */}
      <div className="w-full lg:w-3/4 max-w-3xl mx-auto">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2B27AB] bg-gray-100">
          {/* 🔁 Real Google Maps embed for Roysambu */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.876788350298!2d36.882!3d-1.2185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f7f2b9b1c4f%3A0x0!2sRoysambu%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>

        {/* Ward chips BELOW the map — touch-friendly */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {wardsData.map((ward) => (
            <button
              key={ward.name}
              type="button"
              onClick={() => setActiveWard(ward)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border transition
                ${
                  activeWard.name === ward.name
                    ? "bg-[#2B27AB] text-white border-[#2B27AB]"
                    : "bg-white text-[#2B27AB] border-[#2B27AB]/50 hover:bg-[#2B27AB]/10"
                }`}
            >
              {ward.name}
            </button>
          ))}
        </div>
      </div>

      {/* Data Panel */}
      <div className="w-full lg:w-1/4 max-w-md mx-auto lg:mx-0 p-5 sm:p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-[#2B27AB] border-b pb-2 mb-4">
          Ward Focus (2025–2030)
        </h3>
        <p className="text-base font-semibold text-gray-800">{activeWard.name}</p>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Primary Focus: </span>
          {activeWard.stats}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">
            5-Year Development Direction
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {activeWard.focus}
          </p>
          <ul className="text-xs text-gray-600 mt-2 space-y-1">
            <li>• Youth jobs & training opportunities</li>
            <li>• Better services close to estates</li>
            <li>• Cleaner, safer neighborhoods</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: logo + text + bio */}
          <div className="text-center md:text-left">
            {/* Logo (KEEPING your original behavior) */}
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
              Sammy Maigwa Karuri is an ICT expert, mentor, and community developer
              with deep roots in Roysambu and years of experience in youth
              empowerment, TVET education.
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
            Zoom and move around the map to see your estate and neighborhood in
            Roysambu. Then tap on a ward below the map to see its 5-year
            development focus.
          </p>
        </div>

        <InteractiveMap />
      </section>
    </main>
  );
}
