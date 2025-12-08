"use client";

import React, { useState } from "react";

type WardFilter = "all" | "roysambu" | "githurai" | "kahawa";
type TimeRange = "24h" | "7d" | "30d";

export default function AdminInsightsPage() {
  const [ward, setWard] = useState<WardFilter>("all");
  const [range, setRange] = useState<TimeRange>("7d");

  // TODO: Replace these mock stats by fetching from /api/admin/insights
  const stats = {
    onlineNow: 134,
    reportsThisRange: 27,
    aiQuestionsThisRange: 89,
    topCategory: "Drainage",
  };

  const categoryBreakdown = [
    { name: "Roads", percent: 42 },
    { name: "Drainage", percent: 33 },
    { name: "Security", percent: 18 },
    { name: "Other", percent: 7 },
  ];

  const mockReports = [
    {
      id: "rep_1",
      category: "Drainage",
      title: "Flooded path near XYZ primary",
      ward: "Roysambu",
      estate: "XYZ Estate",
      status: "new",
      createdAt: "2025-12-01 09:12",
    },
    {
      id: "rep_2",
      category: "Roads",
      title: "Potholes along TRM–XYZ road",
      ward: "Roysambu",
      estate: "TRM area",
      status: "in review",
      createdAt: "2025-12-01 11:30",
    },
    {
      id: "rep_3",
      category: "Security",
      title: "Poor lighting at footbridge",
      ward: "Githurai",
      estate: "Githurai 44",
      status: "resolved",
      createdAt: "2025-11-30 20:45",
    },
  ];

  const wishlistSummary = `
In the last 7 days, most reports and questions are about:
• Drainage problems near schools and market areas.
• Unsafe footpaths at night, especially around TRM and Githurai 44.
• Requests for more youth spaces: safe fields, study hubs, and WiFi access.

Suggested priorities:
1) Focus on drainage fixes near school routes.
2) Improve lighting and safety along main walking paths.
3) Expand youth-friendly spaces with WiFi and mentorship.
  `.trim();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">
              RoySafi Insights
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Live view of WiFi usage, community reports, and youth needs across
              the constituency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <FilterChip
              label="Ward"
              value={
                ward === "all"
                  ? "All wards"
                  : ward === "roysambu"
                  ? "Roysambu"
                  : ward === "githurai"
                  ? "Githurai"
                  : "Kahawa"
              }
            >
              <div className="mt-1 space-y-1">
                <FilterOption
                  active={ward === "all"}
                  onClick={() => setWard("all")}
                  label="All wards"
                />
                <FilterOption
                  active={ward === "roysambu"}
                  onClick={() => setWard("roysambu")}
                  label="Roysambu"
                />
                <FilterOption
                  active={ward === "githurai"}
                  onClick={() => setWard("githurai")}
                  label="Githurai"
                />
                <FilterOption
                  active={ward === "kahawa"}
                  onClick={() => setWard("kahawa")}
                  label="Kahawa"
                />
              </div>
            </FilterChip>

            <FilterChip
              label="Range"
              value={
                range === "24h"
                  ? "Last 24h"
                  : range === "7d"
                  ? "Last 7 days"
                  : "Last 30 days"
              }
            >
              <div className="mt-1 space-y-1">
                <FilterOption
                  active={range === "24h"}
                  onClick={() => setRange("24h")}
                  label="Last 24 hours"
                />
                <FilterOption
                  active={range === "7d"}
                  onClick={() => setRange("7d")}
                  label="Last 7 days"
                />
                <FilterOption
                  active={range === "30d"}
                  onClick={() => setRange("30d")}
                  label="Last 30 days"
                />
              </div>
            </FilterChip>

            <span className="hidden text-[11px] text-slate-500 md:inline">
              (These filters will apply to stats & charts once wired to the
              backend.)
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-8">
        {/* Stat cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Online now"
            value={stats.onlineNow.toString()}
            caption="People currently connected to RoySafi WiFi"
          />
          <StatCard
            label="Reports"
            value={stats.reportsThisRange.toString()}
            caption={
              range === "24h"
                ? "Issues reported in the last 24 hours"
                : range === "7d"
                ? "Issues reported in the last 7 days"
                : "Issues reported in the last 30 days"
            }
          />
          <StatCard
            label="AI questions"
            value={stats.aiQuestionsThisRange.toString()}
            caption="Ask RoySafi questions in this period"
          />
          <StatCard
            label="Top need"
            value={stats.topCategory}
            caption="Most common report category"
          />
        </section>

        {/* Middle: breakdown + wishlist summary */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Category breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Issue breakdown</h2>
              <span className="text-[11px] text-slate-500">
                {range === "24h"
                  ? "Last 24 hours"
                  : range === "7d"
                  ? "Last 7 days"
                  : "Last 30 days"}
              </span>
            </div>
            <p className="mb-3 text-xs text-slate-400">
              Shows the share of reports by category (roads, drainage, security,
              other). This is your quick “wishlist” view of what people are
              asking for.
            </p>

            <div className="space-y-3 text-xs">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <span className="text-slate-400">{cat.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist / AI summarizer */}
          <div className="rounded-2xl border border-emerald-700/60 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Wishlist & Priority Summary
              </h2>
              <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200">
                RoySafi AI (demo)
              </span>
            </div>
            <p className="mb-3 text-xs text-slate-400">
              This section summarises open-text reports and Ask RoySafi
              questions into clear priorities for action.
            </p>

            <div className="rounded-xl border border-emerald-700/40 bg-slate-950/80 p-3 text-[11px] leading-relaxed text-slate-100 whitespace-pre-line">
              {wishlistSummary}
            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              Later we’ll connect this to an API like{" "}
              <code className="rounded bg-slate-900 px-1">/api/admin/summarize</code>{" "}
              that regularly aggregates and summarises new input.
            </p>
          </div>
        </section>

        {/* Reports table */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent reports</h2>
            <button className="text-[11px] text-emerald-300 underline-offset-2 hover:underline">
              View all
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="min-w-full border-separate border-spacing-y-1">
              <thead>
                <tr className="text-[11px] text-slate-400">
                  <th className="px-3 py-1 text-left">Category</th>
                  <th className="px-3 py-1 text-left">Title</th>
                  <th className="px-3 py-1 text-left">Ward / Estate</th>
                  <th className="px-3 py-1 text-left">Status</th>
                  <th className="px-3 py-1 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {mockReports.map((r) => (
                  <tr
                    key={r.id}
                    className="rounded-xl bg-slate-950/80 hover:bg-slate-900/90"
                  >
                    <td className="px-3 py-2 align-top">
                      <span className={categoryBadgeClass(r.category)}>
                        {r.category}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-100">
                      {r.title}
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300">
                      {r.ward} ·{" "}
                      <span className="text-slate-400">{r.estate}</span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span className={statusBadgeClass(r.status)}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-400">
                      {r.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-[10px] text-slate-500">
            These are mock entries. Later, fetch from{" "}
            <code className="rounded bg-slate-900 px-1">
              /api/admin/reports
            </code>{" "}
            and include filters for ward, status, and date.
          </p>
        </section>
      </main>
    </div>
  );
}

/* Helper components */

function StatCard(props: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="text-[11px] text-slate-400">{props.label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-50">
        {props.value}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">{props.caption}</div>
    </div>
  );
}

function FilterChip(props: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[11px] text-slate-200"
      >
        <span className="text-slate-500">{props.label}:</span>
        <span>{props.value}</span>
        <span className="text-slate-500">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-40 rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-lg shadow-black/40">
          {props.children}
        </div>
      )}
    </div>
  );
}

function FilterOption(props: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`w-full rounded-lg px-2 py-1 text-left text-[11px] ${
        props.active
          ? "bg-emerald-500/20 text-emerald-200"
          : "text-slate-200 hover:bg-slate-800"
      }`}
    >
      {props.label}
    </button>
  );
}

function categoryBadgeClass(category: string) {
  if (category === "Roads") {
    return "inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-[11px] text-orange-300 border border-orange-500/40";
  }
  if (category === "Drainage") {
    return "inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-[11px] text-sky-300 border border-sky-500/40";
  }
  if (category === "Security") {
    return "inline-flex rounded-full bg-red-500/15 px-3 py-1 text-[11px] text-red-300 border border-red-500/40";
  }
  return "inline-flex rounded-full bg-slate-500/15 px-3 py-1 text-[11px] text-slate-200 border border-slate-500/40";
}

function statusBadgeClass(status: string) {
  if (status === "new") {
    return "inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-300 border border-emerald-500/40";
  }
  if (status === "in review") {
    return "inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-[11px] text-amber-300 border border-amber-500/40";
  }
  if (status === "resolved") {
    return "inline-flex rounded-full bg-slate-500/15 px-3 py-1 text-[11px] text-slate-200 border border-slate-500/40";
  }
  return "inline-flex rounded-full bg-slate-500/15 px-3 py-1 text-[11px] text-slate-200 border border-slate-500/40";
}
