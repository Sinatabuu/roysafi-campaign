// src/app/page.tsx
"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import PollWidget from "../components/PollWidget";
import { AskRoySafiWidget } from "../components/AskRoySafiWidget";
import { JobsTeaser } from "../components/JobsTeaser";
import { ManifestoBanner } from "../components/ManifestoBanner";


const WardMap = dynamic(
  () => import("../components/WardMap").then((mod) => mod.WardMap),
  { ssr: false }
);

export default function HomePage() {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const sendVisit = async () => {
      try {
        const res = await fetch("/api/site/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/" }),
        });
        const data = await res.json();
        if (data?.total !== undefined) {
          setVisitCount(data.total);
        }
      } catch (e) {
        console.error("Visit tracking failed", e);
      }
    };

    sendVisit();
  }, []);

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

            <p className="text-xs font-semibold tracking-wide uppercase text-white/80">
              RoySafi • Youth • Tech • Community
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Roy Safi for Roysambu
            </h1>

            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light max-w-xl md:max-w-2xl mx-auto md:mx-0">
              A 5-Year Master Plan for Roysambu — youth, jobs, safe estates, and
              dignified living in every ward.
            </p>
            <ManifestoBanner />
            {/* Mini bio line in hero */}
            <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-xl md:max-w-2xl mx-auto md:mx-0">
              I&apos;m <span className="font-semibold">Sammy Maigwa Karuri</span>, a
              community organizer and tech builder. RoySafi is our space to
              listen to residents, map real needs, and turn your ideas into
              projects that actually touch the ground.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center">
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
                🗳️ Take the Roysambu People’s Poll
              </a>
              <a
                href="/jobs"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-yellow-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition"
              >
                💼 Jobs & Opportunities
              </a>
              <a
                href="/get-involved"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition"
              >
                Get Involved
              </a>
            </div>

            {/* Visitor counter under CTAs */}
            {visitCount !== null && (
              <p className="mt-3 text-xs text-white/80">
                👥{" "}
                <span className="font-semibold">
                  {visitCount.toLocaleString()}
                </span>{" "}
                visitors have checked in on this site.
              </p>
            )}
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

      {/* Mini Bio Strip – 3 equal cards (Poll removed from inside) */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-5 md:grid-cols-3 text-sm">
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h3 className="text-[#2B27AB] font-semibold text-sm mb-1">
              Community Rooted
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm">
              Born out of Roysambu life — from TRM to Githurai — my heartbeat is
              to turn everyday frustrations into concrete plans for safer
              estates, better roads, and services that respect people.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h3 className="text-[#2B27AB] font-semibold text-sm mb-1">
              Tech & Youth Focused
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm">
              RoySafi uses maps, live polls, and soon free Wi-Fi to give young
              people real tools: digital literacy, innovation spaces, and clear
              pathways into work and entrepreneurship.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h3 className="text-[#2B27AB] font-semibold text-sm mb-1">
              Listening Before Planning
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm">
              Every ward plan starts with what residents say — through this
              site, street conversations, and future video interviews — so the
              5-year master plan reflects real people, not just speeches.
            </p>
          </div>
        </div>
      </section>

      {/* Map + Ask RoySafi + Poll + Jobs in one balanced grid */}
      <section
        id="map"
        className="py-16 bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[2fr,1fr] items-start">
          {/* Left: Map + explainer */}
          <div>
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-3xl font-bold text-[#2B27AB]">
                See Your Hood on the Map
              </h2>
              <p className="mt-3 text-gray-700 max-w-3xl text-sm sm:text-base mx-auto lg:mx-0">
                Zoom and move around the map to see your estate and neighborhood
                in Roysambu. Tap a ward button or search TRM, Seasons, Githurai
                44, Zimmerman, or Kahawa to explore the 5-year development focus
                for your area.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <WardMap />
            </div>
          </div>

          {/* Right: stacked interaction cards – Ask, Poll, Jobs */}
          <div className="space-y-5">
            {/* Ask RoySafi card */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-[#2B27AB] mb-2">
                Ask RoySafi Anything
              </h3>
              <p className="text-xs text-gray-700 mb-3">
                Share a concern, an idea, or a question about your ward. RoySafi
                helps turn resident feedback into real plans.
              </p>
              <AskRoySafiWidget />
            </div>

            {/* Poll card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-[#2B27AB] mb-2">
                Roysambu Live Poll
              </h3>
              <p className="text-xs text-gray-700 mb-3">
                Vote on what matters most right now — roads, security, Wi-Fi,
                jobs, or clean estates.
              </p>
              <PollWidget />
            </div>

            {/* Jobs teaser card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-[#2B27AB] mb-2">
              Jobs & Opportunities Board
            </h3>
            <p className="text-xs text-gray-700 mb-3">
              See local jobs, gigs, and youth opportunities around Roysambu —
              updated as we grow the network.
            </p>
            <JobsTeaser />
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
