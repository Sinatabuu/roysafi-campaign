"use client";

import React from "react";
import Link from "next/link";

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header section */}
      <header className="bg-gradient-to-br from-[#2B27AB] to-[#52C4CF] text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            RoySambu Development Manifesto
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
            A forward-looking, community-centered blueprint for a safer, modern,
            and opportunity-rich Roysambu. Powered by residents. Delivered
            through data, maps, youth energy, and shared vision — not politics.
          </p>
        </div>
      </header>

      {/* Main content wrapper */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Vision */}
        <section>
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            1. Our Community Vision
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Roysambu deserves cleaner estates, safer neighborhoods, visible job
            pathways for youth, organized public spaces, and a roadmap residents
            participate in. This manifesto is a development framework — not a
            campaign — shaped by feedback, maps, live polls, and real daily
            experiences from TRM to Githurai.
          </p>
        </section>

        {/* Pillars */}
        <section>
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            2. Guiding Pillars for Development
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mt-5">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg text-[#2B27AB]">
                Pillar 1: Safety & Clean Estates
              </h3>
              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Lighting of estates and public walkways</li>
                <li>• Flooding and drainage fixes</li>
                <li>• Organized waste collection</li>
                <li>• Boda boda discipline + safer staging zones</li>
                <li>• CCTV + community safety watch zones</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg text-[#2B27AB]">
                Pillar 2: Youth Empowerment
              </h3>
              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Digital skills labs in all wards</li>
                <li>• Entrepreneurship & gig work support</li>
                <li>• Safe youth spaces (arts, music, sports)</li>
                <li>• Mentorship programs</li>
                <li>• Internship pipelines with local SMEs</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg text-[#2B27AB]">
                Pillar 3: Modern Infrastructure
              </h3>
              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Estate roads & walkways upgrade</li>
                <li>• Drainage modernization</li>
                <li>• Better signage & public spaces</li>
                <li>• Flood-free seasonal roads</li>
                <li>• Safer footpaths around TRM & Seasons</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg text-[#2B27AB]">
                Pillar 4: Digital Roysambu
              </h3>
              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Free Wi-Fi zones</li>
                <li>• Community dashboards (polls, safety, jobs)</li>
                <li>• RoySafi app for reporting & ideas</li>
                <li>• Innovation & co-working hubs</li>
                <li>• Youth tech & media studios</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg text-[#2B27AB]">
                Pillar 5: Economic Uplift
              </h3>
              <ul className="mt-3 text-sm space-y-2 text-gray-700">
                <li>• Modern ward markets</li>
                <li>• Local business directory & visibility</li>
                <li>• Boda training & certification</li>
                <li>• Community tourism & culture mapping</li>
                <li>• Rapid job listings through RoySafi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ward blueprint */}
        <section>
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            3. Ward-by-Ward 5-Year Blueprint
          </h2>

          <div className="space-y-10 mt-6">
            {/* Roysambu Ward */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-[#2B27AB]">
                Roysambu Ward (TRM, Mirema, Thome)
              </h3>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                A rapidly developing, youthful area with heavy pedestrian &
                commercial activity.
              </p>
              <ul className="mt-3 text-sm space-y-1 text-gray-700">
                <li>• Safer TRM & Mirema walkways</li>
                <li>• Lighting for estates & alleys</li>
                <li>• Clean drainage for Seasons & Lumumba Dr</li>
                <li>• Youth digital hub and co-working space</li>
                <li>• Flood-free estate redesign</li>
              </ul>
            </div>

            {/* Zimmerman Ward */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-[#2B27AB]">Zimmerman Ward</h3>
              <ul className="mt-3 text-sm space-y-1 text-gray-700">
                <li>• Zimmerman clean estates program</li>
                <li>• Safer boda zones + traffic reorganization</li>
                <li>• Improved estate lighting</li>
                <li>• Modernized business corridor</li>
                <li>• Market upgrades</li>
              </ul>
            </div>

            {/* Githurai Ward */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-[#2B27AB]">Githurai Ward</h3>
              <ul className="mt-3 text-sm space-y-1 text-gray-700">
                <li>• Modern Githurai market plan</li>
                <li>• Cleaner interchange pedestrian flow</li>
                <li>• Security & flood control</li>
                <li>• Youth entrepreneurship centers</li>
              </ul>
            </div>

            {/* Kahawa West Ward */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-[#2B27AB]">
                Kahawa West Ward
              </h3>
              <ul className="mt-3 text-sm space-y-1 text-gray-700">
                <li>• Estate roads & grading improvements</li>
                <li>• Safe estate lighting grid</li>
                <li>• Youth tech & talent hub</li>
                <li>• Sanitation & waste program</li>
              </ul>
            </div>

            {/* Kahawa Ward */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-bold text-[#2B27AB]">
                Kahawa Ward
              </h3>
              <ul className="mt-3 text-sm space-y-1 text-gray-700">
                <li>• Water & sanitation improvement</li>
                <li>• Road access upgrading</li>
                <li>• Youth mentorship centers</li>
                <li>• Clean water & drainage resilience</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Master Projects */}
        <section>
          <h2 className="text-3xl font-bold text-[#2B27AB]">
            4. Flagship Projects (2027–2032)
          </h2>

          <ul className="mt-4 text-sm space-y-3 text-gray-700">
            <li>
              <strong>• Infrastructure Upgrade Program:</strong> 40–60km of
              estate road improvements + drainage modernization.
            </li>
            <li>
              <strong>• Ward Lighting Grid:</strong> Map-based lighting fixes
              for all estates.
            </li>
            <li>
              <strong>• Youth Skills Network:</strong> Digital labs, Wi-Fi
              zones, innovation hubs.
            </li>
            <li>
              <strong>• Clean Estates Initiative:</strong> Waste management,
              sanitation, and flood-free estates.
            </li>
            <li>
              <strong>• Safety & Order Program:</strong> Cameras, watch groups,
              safer stages, walkways.
            </li>
          </ul>
        </section>

        {/* Footer / Back button */}
        <section className="text-center pt-8">
          <Link
            href="/"
            className="inline-block bg-[#2B27AB] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#241f88] transition"
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
