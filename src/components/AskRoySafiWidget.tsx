"use client";

import React, { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function buildPrompt(history: ChatMessage[], newUserInput: string): string {
  const lines: string[] = [];

  for (const msg of history) {
    if (msg.role === "user") {
      lines.push(`Resident: ${msg.content}`);
    } else {
      lines.push(`RoySafi: ${msg.content}`);
    }
  }

  // add the new user message
  lines.push(`Resident: ${newUserInput}`);

  // small hint to the model
  lines.push(
    "Please answer as RoySafi, continuing this conversation in a helpful, practical way for Roysambu."
  );

  return lines.join("\n");
}

export function AskRoySafiWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // add user message to local state
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      // build FULL prompt from history + new user message
      const question = buildPrompt(messages, trimmed);

      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Ask RoySafi error:", res.status, text);
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const reply: ChatMessage = {
        role: "assistant",
        content: data.answer ?? "Samahani, sina jibu sahihi sasa hivi.",
      };

      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* Chat window */}
      <div className="
        border rounded 
        p-2 sm:p-3 
        h-48 sm:h-64 lg:h-80 
        overflow-y-auto 
        bg-white/60 
        text-xs sm:text-sm lg:text-base
      ">
        {messages.length === 0 && (
          <p className="text-gray-500">
            Ask RoySafi anything about improving Roysambu.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-2 py-1 rounded ${
                m.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Ask RoySafi a question about Roysambu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-green-700 text-white text-sm"
          disabled={loading}
        >
          {loading ? "Inafikiria…" : "Tuma"}
        </button>
      </form>
    </div>
  );
}
