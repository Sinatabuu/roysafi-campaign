// src/components/RoysambuPoll.tsx
"use client";

import React, { useState, useEffect } from "react";

type OptionColor = "blue" | "green" | "orange" | "red" | "purple";

type Option = {
  id: string;
  label: string;
  color: OptionColor;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What should be the first priority for your area?",
    options: [
      { id: "road_improvement", label: "Road improvement", color: "blue" },
      { id: "drainage", label: "Better drainage & flood control", color: "green" },
      { id: "lighting", label: "Street lighting & safety at night", color: "orange" },
      { id: "walkways", label: "Safe walkways / pedestrian paths", color: "red" },
      { id: "security", label: "Improved security patrols / CCTV", color: "purple" },
    ],
  },
  {
    id: "q2",
    text: "Which new community facility would help you most?",
    options: [
      { id: "markets", label: "More markets built", color: "blue" },
      { id: "schools", label: "More schools", color: "green" },
      { id: "healthcare", label: "More healthcare facilities", color: "orange" },
      { id: "libraries", label: "Libraries / digital learning centers", color: "red" },
      { id: "youth_centers", label: "Youth & recreation centers", color: "purple" },
    ],
  },
  {
    id: "q3",
    text: "What should we focus on for the youth?",
    options: [
      { id: "skills_labs", label: "Skills training labs (tech & trades)", color: "blue" },
      { id: "sports_arts", label: "Sports & arts development", color: "green" },
      { id: "small_business", label: "Support for small businesses / Jua Kali", color: "orange" },
      { id: "wifi", label: "Free / affordable public WiFi", color: "red" },
      { id: "mentorship", label: "Mentorship & spiritual programs", color: "purple" },
    ],
  },
  {
    id: "q4",
    text: "What support would most help your household?",
    options: [
      { id: "jobs", label: "Job placement & career programs", color: "blue" },
      { id: "loans", label: "Small business loans / grants", color: "green" },
      { id: "transport", label: "Cheaper / more reliable transport", color: "orange" },
      { id: "water", label: "Clean water & regular supply", color: "red" },
      { id: "waste", label: "Better waste / garbage management", color: "purple" },
    ],
  },
  {
    id: "q5",
    text: "Which big project should start first?",
    options: [
      { id: "housing", label: "Affordable housing", color: "blue" },
      { id: "tech_hubs", label: "Tech & innovation hubs", color: "green" },
      { id: "parks", label: "Green parks & play areas", color: "orange" },
      { id: "flood_control", label: "Strong flood mitigation systems", color: "red" },
      { id: "health_insurance", label: "Community health insurance support", color: "purple" },
    ],
  },
];

const WARDS = [
  "Roysambu Ward",
  "Githurai Ward",
  "Zimmerman Ward",
  "Kahawa West Ward",
  "Kahawa Ward",
];

type PollResults = {
  [questionId: string]: {
    [optionId: string]: number;
  };
};

const colorClassMap: Record<OptionColor, string> = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  red: "bg-red-500 hover:bg-red-600",
  purple: "bg-purple-500 hover:bg-purple-600",
};

export type RoysambuPollProps = {
  lockedWard?: string | null;
};

export const RoysambuPoll: React.FC<RoysambuPollProps> = ({ lockedWard }) => {
  const [selectedWard, setSelectedWard] = useState<string>(lockedWard ?? "");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<PollResults | null>(null);
  const [loadingResults, setLoadingResults] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lockedWard) {
      setSelectedWard(lockedWard);
    }
  }, [lockedWard]);

  const currentQuestion = QUESTIONS[currentIndex];

  const allAnswered =
    QUESTIONS.length > 0 &&
    QUESTIONS.every((q) => answers[q.id] && answers[q.id].length > 0);

  const handleOptionClick = (questionId: string, optionId: string) => {
    if (answers[questionId]) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const qIndex = QUESTIONS.findIndex((q) => q.id === questionId);
    if (qIndex < QUESTIONS.length - 1) {
      setCurrentIndex(qIndex + 1);
    }
  };

  const fetchResults = async (ward: string) => {
    setLoadingResults(true);
    try {
      const res = await fetch(`/sambu-poll/results?ward=${encodeURIComponent(ward)}`);
      if (!res.ok) throw new Error("Failed to load results.");
      const data = await res.json();
      setResults(data.results as PollResults);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not load community results.");
    } finally {
      setLoadingResults(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedWard) {
      setError("Please select your ward before submitting.");
      return;
    }
    if (!allAnswered) {
      setError("Please answer all 5 questions first.");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const payload = {
        ward: selectedWard,
        answers,
        wishlist,
      };

      const res = await fetch("/sambu-poll/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save your response.");
      }

      setSubmitted(true);
      setSaving(false);

      await fetchResults(selectedWard);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Roysambu People’s Development Poll
      </h2>
      <p className="text-gray-600">
        Answer 5 quick questions (1 tap per question). After that, you can write your
        personal wish list and see what most people in your ward want.
      </p>

      {/* Ward selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Which ward do you live in?
        </label>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
          disabled={!!lockedWard}
        >
          <option value="">Select your ward</option>
          {WARDS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        {lockedWard && (
          <p className="text-xs text-gray-500">
            Ward selected from map: <strong>{lockedWard}</strong>
          </p>
        )}
      </div>

      {!submitted && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </h3>
            <span className="text-sm text-gray-500">
              {Object.keys(answers).length} / {QUESTIONS.length} answered
            </span>
          </div>

          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <p className="font-medium text-gray-800">{currentQuestion.text}</p>
            <div className="grid gap-3">
              {currentQuestion.options.map((opt) => {
                const chosen = answers[currentQuestion.id] === opt.id;
                const alreadyAnswered = !!answers[currentQuestion.id];

                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      handleOptionClick(currentQuestion.id, opt.id)
                    }
                    disabled={alreadyAnswered && !chosen}
                    className={`w-full text-left px-4 py-2 rounded-md text-white 
                      ${colorClassMap[opt.color]} 
                      disabled:opacity-60 disabled:cursor-not-allowed
                    `}
                  >
                    <span className="font-semibold">{opt.label}</span>
                    {chosen && <span className="ml-2">✔</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((i) => (i > 0 ? i - 1 : i))
              }
              className="text-sm text-gray-600 underline disabled:opacity-40"
              disabled={currentIndex === 0}
            >
              ← Previous question
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((i) =>
                  i < QUESTIONS.length - 1 ? i + 1 : i
                )
              }
              className="text-sm text-gray-600 underline disabled:opacity-40"
              disabled={currentIndex === QUESTIONS.length - 1}
            >
              Next question →
            </button>
          </div>

          {allAnswered && (
            <div className="space-y-3 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Your personal wish list
              </h3>
              <p className="text-sm text-gray-600">
                In your own words, what is your biggest wish for your ward or for Roysambu?
              </p>
              <textarea
                value={wishlist}
                onChange={(e) => setWishlist(e.target.value)}
                rows={4}
                className="w-full border rounded-md px-3 py-2"
                placeholder="E.g. Safe walkways for children, more youth centers in Githurai..."
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="mt-2 px-4 py-2 rounded-md bg-black text-white font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Submit my answers"}
              </button>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}

      {submitted && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Asante sana! 🙏
          </h3>
          <p className="text-gray-700">
            Your answers and wish list have been recorded for {selectedWard}.
            Below is what most people in your ward are saying.
          </p>

          {loadingResults && <p>Loading community results...</p>}

          {results && (
            <div className="space-y-4">
              {QUESTIONS.map((q) => {
                const total =
                  Object.values(results[q.id] || {}).reduce(
                    (sum, count) => sum + count,
                    0
                  ) || 0;

                return (
                  <div key={q.id} className="border rounded-md p-3 bg-gray-50">
                    <p className="font-medium text-gray-800 mb-2">{q.text}</p>
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const count = results[q.id]?.[opt.id] || 0;
                        const percentage =
                          total > 0
                            ? Math.round((count / total) * 100)
                            : 0;

                        return (
                          <div key={opt.id} className="text-sm">
                            <div className="flex justify-between">
                              <span>{opt.label}</span>
                              <span>
                                {count} ({percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: "rgba(34, 197, 94, 0.9)",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default RoysambuPoll;
