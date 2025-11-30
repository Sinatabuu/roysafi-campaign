// src/app/admin/insights/page.tsx
"use client";

import React, { useEffect, useState } from "react";

type WardKey =
  | "Roysambu Ward"
  | "Githurai Ward"
  | "Zimmerman Ward"
  | "Kahawa West Ward"
  | "Kahawa Ward";

type TagKey =
  | "roads"
  | "drainage"
  | "security"
  | "wifi"
  | "youth_jobs"
  | "schools"
  | "health"
  | "markets";

type WardStats = {
  ward: WardKey;
  totalResponses: number;
  tagCounts: Record<TagKey, number>;
  topWishlistExamples: string[];
};

const MOCK_STATS: WardStats[] = [
  {
    ward: "Roysambu Ward",
    totalResponses: 42,
    tagCounts: {
      roads: 28,
      drainage: 19,
      security: 7,
      wifi: 15,
      youth_jobs: 12,
      schools: 6,
      health: 4,
      markets: 5,
    },
    topWishlistExamples: [
      "Fix drainage around TRM and Seasons so we don't flood every rain.",
      "Safe walkways from estates to Thika Road and TRM.",
      "Free Wi-Fi zones for students studying in the evening.",
    ],
  },
  {
    ward: "Githurai Ward",
    totalResponses: 35,
    tagCounts: {
      roads: 10,
      drainage: 8,
      security: 21,
      wifi: 12,
      youth_jobs: 18,
      schools: 5,
      health: 3,
      markets: 9,
    },
    topWishlistExamples: [
      "More lights and security patrols near the stage and railway.",
      "Digital skills and small business support for youth.",
      "Organised markets, not chaos on the road.",
    ],
  },
  // Add Zimmerman, Kahawa West, Kahawa entries later…
];

export default function AdminInsightsPage() {
  const [selectedWard, setSelectedWard] = useState<WardKey>("Roysambu Ward");
  const active = MOCK_STATS.find((w) => w.ward === selectedWard) ?? MOCK_STATS[0];

  // Later: replace MOCK_STATS with data fetched from an API/Supabase
  useEffect(() => {
    // Example future hook:
    // fetch("/api/admin/insights").then(...)
  }, []);

  const tagsDisplay: { key: TagKey; label: string }[] = [
    { key: "roads", label: "Roads" },
    { key: "drainage", label: "Drainage" },
    { key: "security", label: "Security" },
    { key: "wifi", label: "Wi-Fi & Digital" },
    { key: "youth_jobs", label: "Youth Jobs" },
    { key: "schools", label: "Schools" },
    { key: "health", label: "Health" },
    { key: "markets", label: "Markets" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
            RoySafi · Internal Dashboard
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Ward Wishlist Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            This page helps the core RoySafi team see what residents are asking
            for in each ward, grouped by theme. Use it to prepare meetings,
            church visits, youth forums and project proposals.
          </p>
        </header>

        {/* Ward selector */}
        <div className="flex flex-wrap gap-2">
          {MOCK_STATS.map((ward) => (
            <button
              key={ward.ward}
              onClick={() => setSelectedWard(ward.ward)}
              className={`px-3 py-1.5 rounded-full text-xs border ${
                ward.ward === active.ward
                  ? "bg-emerald-500 text-slate-950 border-emerald-400"
                  : "bg-slate-900 border-slate-600 hover:bg-slate-800"
              }`}
            >
              {ward.ward}
            </button>
          ))}
        </div>

        {/* Main grid: tag summary + examples */}
        <div className="grid gap-6 md:grid-cols-[1.4fr,1fr] items-start">
          {/* Tag bars */}
          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
            <div className="flex justify-between items-baseline mb-3">
              <h2 className="text-sm font-semibold">
                Themes in {active.ward} wishlists
              </h2>
              <span className="text-[11px] text-slate-400">
                {active.totalResponses} poll responses analysed
              </span>
            </div>

            <div className="space-y-2">
              {tagsDisplay.map((t) => {
                const count = active.tagCounts[t.key] ?? 0;
                const ratio =
                  active.totalResponses > 0
                    ? Math.min(count / active.totalResponses, 1)
                    : 0;
                const width = `${Math.max(ratio * 100, 4)}%`; // keep a tiny bar even if small

                return (
                  <div key={t.key} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{t.label}</span>
                      <span>
                        {count}{" "}
                        <span className="text-slate-500">
                          ({Math.round(ratio * 100)}%)
                        </span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[11px] text-slate-400">
              Later, this can be driven by AI that tags wishlist text into
              themes like roads, drainage, security, youth jobs, Wi-Fi, markets,
              schools and healthcare.
            </p>
          </div>

          {/* Example wishlists & AI summary spot */}
          <div className="space-y-3">
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-xs font-semibold mb-2">
                Sample wishlist lines from {active.ward}
              </h3>
              <ul className="space-y-1.5">
                {active.topWishlistExamples.map((ex, idx) => (
                  <li
                    key={idx}
                    className="text-[11px] text-slate-200 bg-slate-900 rounded-lg px-3 py-2 border border-slate-800"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-xs font-semibold mb-2">
                AI summary (future)
              </h3>
              <p className="text-[11px] text-slate-300">
                Here we will plug in an AI-generated summary:{" "}
                <em>
                  “In {active.ward}, residents are mainly asking for better
                  drainage near estates, safe walkways to stages, and reliable
                  Wi-Fi for students. Youth jobs and small business support also
                  appear strongly.”
                </em>
              </p>
              <p className="mt-2 text-[11px] text-slate-500">
                For now this is mock text. Later we&apos;ll connect it to an API
                that reads real wishlists from Supabase and asks the AI to
                summarise them per ward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
