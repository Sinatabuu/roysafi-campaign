// src/components/PollWidget.tsx
"use client";

import React, { useEffect, useState } from "react";

type PollOptionResult = {
  option: string;
  votes: number;
};

type PollResponse = {
  poll: {
    id: string;
    slug: string;
    question: string;
    options: string[];
    results: PollOptionResult[];
  } | null;
};

const wards = [
  "Roysambu Ward",
  "Githurai Ward",
  "Kahawa West Ward",
  "Zimmerman",
  "Kahawa Ward",
];

const PollWidget: React.FC = () => {
  const [data, setData] = useState<PollResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // simple per-browser flag (not secure, just UX)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const flag = window.localStorage.getItem("royPollVoted");
      if (flag === "yes") setHasVoted(true);
    }
  }, []);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch("/api/poll");
        const json: PollResponse = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch poll error:", err);
        setError("Failed to load poll.");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, []);

  const totalVotes =
    data?.poll?.results.reduce((sum, r) => sum + r.votes, 0) ?? 0;

  const handleSubmit = async () => {
    if (!data?.poll) return;
    if (selectedOption === null) {
      setError("Please select an option.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          choiceIndex: selectedOption,
          ward: selectedWard || null,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit vote.");
      }

      // mark as voted in localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem("royPollVoted", "yes");
      }
      setHasVoted(true);

      // refresh poll results
      const refreshed = await fetch("/api/poll");
      const json: PollResponse = await refreshed.json();
      setData(json);
    } catch (err: any) {
      console.error("Vote error:", err);
      setError(err.message || "Failed to submit vote.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-sm text-gray-600">
        Loading community poll…
      </div>
    );
  }

  if (!data?.poll) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-sm text-gray-600">
        No active poll at the moment. Check back soon.
      </div>
    );
  }

  const poll = data.poll;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-[#2B27AB] mb-2">
        Roysambu Community Poll
      </h3>
      <p className="text-sm text-gray-700 mb-4">{poll.question}</p>

      {/* Ward selector */}
      <div className="mb-3">
        <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1">
          Your ward (optional)
        </label>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2B27AB] focus:border-[#2B27AB]"
        >
          <option value="">Select ward (optional)</option>
          {wards.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {poll.options.map((opt, idx) => {
          const result = poll.results[idx];
          const votes = result?.votes ?? 0;
          const pct = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
          const isSelected = selectedOption === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left rounded-xl border px-3 py-2 text-xs sm:text-sm transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
                isSelected
                  ? "border-[#2B27AB] bg-[#2B27AB]/10"
                  : "border-gray-200 hover:border-[#2B27AB]/60 hover:bg-gray-50"
              }`}
            >
              <span>{opt}</span>
              <span className="text-[10px] sm:text-xs text-gray-600">
                {votes} votes {totalVotes > 0 && `(${pct}%)`}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mb-2 text-[11px] sm:text-xs text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting || hasVoted || selectedOption === null}
        className="w-full rounded-full bg-[#2B27AB] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#221f84] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {hasVoted ? "Thank you for voting" : submitting ? "Submitting…" : "Submit your vote"}
      </button>

      <p className="mt-3 text-[10px] sm:text-xs text-gray-500">
        Total votes: <span className="font-semibold">{totalVotes}</span>. Data
        will help guide ward-level priorities for roads, water, Wi-Fi, and youth
        projects.
      </p>
    </div>
  );
};

export default PollWidget;
