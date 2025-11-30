// src/components/AskRoySafiWidget.tsx
"use client";

import React, { useState } from "react";

const wards = [
  "Roysambu Ward",
  "Githurai Ward",
  "Zimmerman Ward",
  "Kahawa West Ward",
  "Kahawa Ward",
];

export default function AskRoySafiWidget() {
  const [question, setQuestion] = useState("");
  const [ward, setWard] = useState<string | "">(wards[0]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAsk = async () => {
    setErrorMsg(null);
    setAnswer(null);

    const trimmed = question.trim();
    if (!trimmed) {
      setErrorMsg("Please type a question first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, ward }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong. Try again.");
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 space-y-3">
      <h2 className="text-sm font-semibold text-[#2B27AB]">
        Ask RoySafi about your ward
      </h2>
      <p className="text-xs text-slate-600">
        Ask about roads, drainage, youth jobs, Wi-Fi, schools, markets or
        safety. The AI will answer in simple language – no politics, just
        development.
      </p>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-slate-700">
          Ward (optional but helps the answer)
        </label>
        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {wards.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
          <option value="">Not sure / general</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-slate-700">
          Your question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="E.g. Why is drainage so bad near TRM, and what can be done in the next 5 years?"
        />
      </div>

      <button
        onClick={handleAsk}
        disabled={loading}
        className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking…" : "Ask RoySafi"}
      </button>

      {errorMsg && (
        <p className="text-[11px] text-red-600 mt-1">{errorMsg}</p>
      )}

      {answer && (
        <div className="mt-2 border-t border-slate-200 pt-2">
          <p className="text-[11px] font-semibold text-slate-800 mb-1">
            Answer:
          </p>
          <p className="text-xs text-slate-700 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}
