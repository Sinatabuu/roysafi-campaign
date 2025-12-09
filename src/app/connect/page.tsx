// app/connect/page.tsx or pages/connect.tsx
"use client";
import React, { useState } from "react";

export default function RoysafiPortalPage() {
  const [connected, setConnected] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleConnectClick = () => {
    // TODO: call backend to authorize device on router
    setConnected(true);
  };

  const handleAskRoysafi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    try {
      setLoadingAi(true);
      setAiAnswer(null);

      // TODO: replace with real /api/ai/ask call
      // const res = await fetch("/api/ai/ask", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ question: aiQuestion }),
      // });
      // const data = await res.json();
      // setAiAnswer(data.answer);

      // Temporary mock:
      setTimeout(() => {
        setAiAnswer(
          "Thanks for asking RoySafi! This is a demo answer – here you’ll see info about opportunities, events, or helpful guidance for your ward."
        );
        setLoadingAi(false);
      }, 700);
    } catch (err) {
      console.error(err);
      setAiAnswer("Sorry, something went wrong. Please try again.");
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/60">
              <span className="text-lg font-bold text-emerald-400">R</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide uppercase text-emerald-300">
                RoySafi WiFi
              </div>
              <div className="text-xs text-slate-400">
                Free Community Network · Roysambu
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs">
            <button className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ward: Roysambu</span>
              <span className="text-slate-500">▾</span>
            </button>
            <span className="text-[10px] text-slate-500">
              Beta · For development & youth empowerment
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 md:py-10">
        {/* Connect card */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
                Connect to RoySafi WiFi
              </h1>
              <p className="mt-1 text-sm text-slate-400 md:max-w-xl">
                Stay online while getting updates on skills, jobs, and what’s
                happening in your area. This network is for community
                development, learning, and safe recreation.
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2 md:mt-0">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                  connected
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    connected ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {connected ? "Connected · 2h remaining" : "Status: Not connected"}
              </span>
            </div>
          </div>

          <button
            onClick={handleConnectClick}
            disabled={connected}
            className={`mt-2 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
              connected
                ? "cursor-default bg-emerald-500/20 text-emerald-200"
                : "bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
            }`}
          >
            {connected ? "You’re Online with RoySafi" : "Continue & Go Online"}
          </button>

          <p className="mt-2 text-[11px] text-slate-500">
            By tapping continue, you agree to our Fair Use & Community
            Guidelines. No politics · No hate speech · Respect others.
          </p>
        </section>

        {/* Three-column feature grid */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Ask RoySafi card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-50">
                Ask RoySafi <span className="text-xs text-emerald-300">AI</span>
              </h2>
              <span className="text-[11px] text-slate-500">
                Try: “Any IT trainings this week?”
              </span>
            </div>

            <p className="mb-3 text-xs text-slate-400">
              Ask about opportunities, events, safety, or how to get involved in
              your ward.
            </p>

            <form
              onSubmit={handleAskRoysafi}
              className="mt-auto space-y-2 text-xs"
            >
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask RoySafi…"
                  className="w-full bg-transparent text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loadingAi}
                  className="rounded-lg bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-emerald-950 hover:bg-emerald-400 disabled:opacity-60"
                >
                  {loadingAi ? "…" : "Send"}
                </button>
              </div>

              {aiAnswer && (
                <div className="mt-2 rounded-lg border border-slate-700 bg-slate-950/80 p-2">
                  <div className="text-[11px] text-emerald-300 mb-1">
                    RoySafi says:
                  </div>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    {aiAnswer}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Opportunities card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
            <h2 className="mb-2 text-sm font-semibold text-slate-50">
              Opportunities & Skills
            </h2>
            <p className="mb-3 text-xs text-slate-400">
              Discover trainings, youth mentorship, and business opportunities
              near you.
            </p>
            <ul className="mb-4 space-y-1 text-xs text-slate-300">
              <li>• Digital skills labs & coding clubs</li>
              <li>• Small business & side-hustle clinics</li>
              <li>• Youth mentorship & faith-based grounding</li>
            </ul>
            <button className="mt-auto w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-[11px] font-semibold text-slate-100 hover:border-emerald-500 hover:text-emerald-300">
              View all opportunities
            </button>
          </div>

          {/* Report an issue card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
            <h2 className="mb-2 text-sm font-semibold text-slate-50">
              Report an Issue
            </h2>
            <p className="mb-3 text-xs text-slate-400">
              Help us track broken lights, drainage, unsafe paths, or other
              concerns in your area.
            </p>
            <div className="mb-3 flex flex-wrap gap-2 text-[11px]">
              {["Roads", "Drainage", "Security", "Streetlights", "Other"].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 hover:border-emerald-500 hover:text-emerald-300"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
            <button className="mt-auto w-full rounded-xl bg-emerald-500 px-3 py-2 text-[11px] font-semibold text-emerald-950 hover:bg-emerald-400">
              Report now
            </button>
          </div>
        </section>

        {/* Today on RoySafi */}
        <section className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-50">
            Today on RoySafi
          </h2>
          <div className="space-y-2 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="text-[11px] text-emerald-300 mb-1">
                🧑🏽‍💻 Digital Skills Training
              </div>
              <p className="text-slate-200">
                Basic ICT & online safety class this Saturday, 10am at XYZ
                Centre (Githurai). Free for youth 15–25.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="text-[11px] text-emerald-300 mb-1">
                ⚽ Youth Tournament
              </div>
              <p className="text-slate-200">
                Ward-level football finals this weekend at TRM Grounds. Teams
                from all estates welcome to register.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="text-[11px] text-emerald-300 mb-1">
                🌧️ Weather & Safety
              </div>
              <p className="text-slate-200">
                Light rains expected this evening. Avoid known flood-prone
                footpaths and report blocked drainage.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} RoySafi</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 md:inline-block" />
            <button className="underline-offset-2 hover:underline">
              Guidelines
            </button>
            <button className="underline-offset-2 hover:underline">
              Privacy
            </button>
            <button className="underline-offset-2 hover:underline">
              About
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>Language:</span>
            <button className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]">
              English
            </button>
            <button className="rounded-full border border-slate-800 bg-transparent px-2 py-1 text-[11px] text-slate-400">
              Swahili
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
