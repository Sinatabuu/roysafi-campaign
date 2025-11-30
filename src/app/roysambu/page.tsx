"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import RoysambuPoll from "../../components/RoysambuPoll";
import AskRoySafiWidget from "../../components/AskRoySafiWidget";


const WardMap = dynamic(
  () => import("../../components/WardMap").then((mod) => mod.WardMap),
  { ssr: false }
);

export default function RoysambuPage() {
  const [activeWard, setActiveWard] = useState<string | null>("Roysambu Ward");

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <header className="rounded-2xl bg-emerald-700 text-white px-4 py-5 shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">
            Roysambu People’s Development Poll
          </h1>
          <p className="mt-2 text-sm md:text-base text-emerald-100">
            Tap your ward on the map, answer 5 quick questions, write your wish list, 
            and see what your neighbours are asking for. No politics – just priorities.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs md:text-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="mr-1">①</span> Choose your ward
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="mr-1">②</span> Take the 5-question poll
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="mr-1">③</span> See what most people want
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Map */}
          <section className="bg-white rounded-2xl shadow-md p-3">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              1. Tap your ward on the map
            </h2>
            <WardMap
              activeWard={activeWard}
              onWardSelect={(wardName: string) => setActiveWard(wardName)}
            />
          </section>
          {/* Poll + Ask RoySafi */}
            <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* left: text + poll intro, right: PollWidget */}
                {/* ...your existing poll section code... */}
              </div>

              {/* New Ask RoySafi row */}
              <div className="mt-10">
                <AskRoySafiWidget />
              </div>
            </section>

          {/* Poll */}
          <section className="bg-white rounded-2xl shadow-md p-3">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              2 & 3. Answer the poll and see results
            </h2>
            <RoysambuPoll lockedWard={activeWard} />
          </section>
        </div>
      </div>
    </main>
  );
}
