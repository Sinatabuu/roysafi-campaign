// src/app/api/ai/ask/route.ts
import { NextRequest, NextResponse } from "next/server";

// Optional: type for request body
type AskBody = {
  question: string;
  ward?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AskBody;
    const question = (body.question || "").trim();
    const ward = (body.ward || "").trim();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    // 🔑 TODO: set this in your .env.local
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY missing");
      return NextResponse.json(
        { error: "AI is not configured yet." },
        { status: 500 }
      );
    }

    const systemPrompt = [
      "You are 'RoySafi Assistant', a friendly local guide for Roysambu constituency in Nairobi.",
      "You focus on explaining development issues: roads, drainage, safety, youth jobs, Wi-Fi, schools, markets, healthcare, etc.",
      "You must stay neutral and must NOT tell people who to vote for, or push any party or candidate.",
      "You can reference wards like Roysambu Ward, Githurai, Zimmerman, Kahawa West, and Kahawa.",
      "Explain things in clear, simple language. You can mix in a bit of Kenyan flavour (English + Swahili) but keep it respectful.",
      "If you are unsure about a fact, be honest and suggest it as a possibility or advise them to confirm with official sources."
    ].join(" ");

    const userPrompt = ward
      ? `Ward: ${ward}\n\nQuestion from resident: ${question}`
      : `Question from resident: ${question}`;

    // 🧠 Example OpenAI-style call (adjust for your setup / model)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini", // or whatever model you use
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("AI error:", text);
      return NextResponse.json(
        { error: "AI request failed." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer =
      data.choices?.[0]?.message?.content ??
      "Samahani, I couldn't generate a good answer right now.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Unexpected error in /api/ai/ask:", err);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
