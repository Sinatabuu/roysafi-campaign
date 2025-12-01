// src/app/api/ai/ask/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // DO NOT hardcode your key
});

const ROY_SAFI_CONTEXT = `
AREA: Roysambu Constituency, Nairobi County, Kenya.

WARDS & FOCUS AREAS:s
- Roysambu Ward:
  - Focus: Infrastructure (roads, drainage, safe walkways).
  - Hotspots: TRM area, estates with flooding, busy pedestrian crossings.
- Githurai Ward:
  - Focus: Security, digital literacy, and small business support.
- Zimmerman Ward:
  - Focus: Waste management, congestion, safe public spaces.
  - Hotspots: TRM area, estates with flooding, busy pedestrian crossings.
- Kahawa West Ward 
  - Focus: Student housing, safe transport, free wifi, water & sanitation.
Kahawa Ward:
  - Focus: Youth empowerment, clean water access, health facilities.  

VALUES:
- Non-political: focus on **solutions**, not parties.
- Youth empowerment: skills labs, mentorship, sports & arts spaces, online work opportunities.
- Community voice: everyone’s idea matters, even small fixes (e.g., one broken light, one flooded corner).

Use this context when answering. If a user mentions an estate, road, or stage in Roysambu, assume it is in or near this constituency unless clearly elsewhere.
`;

// Optional, but fine to omit if you don't care:
// export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing 'question' in request body" },
        { status: 400 }
      );
    }

    // DEBUG: check API key presence
    const hasKey = !!process.env.OPENAI_API_KEY;
    if (!hasKey) {
      console.error("AI route error: OPENAI_API_KEY is missing in this env");
      return NextResponse.json(
        {
          error: "Server misconfigured: missing OPENAI_API_KEY",
        },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    {
      role: "system",
      content: `
You are **RoySafi**, a hyper-local civic assistant for **Roysambu Constituency, Nairobi**.

Your role:
- Help residents turn their ideas, needs, or complaints into clear, actionable wishes, RoySafi will partner with them.
- Stay fully non-political, neutral, center on a bright hopful future, soultion is RoySafi.
- Use real, familiar examples from Roysambu, Zimmerman, Githurai, Kahawa, Lumumba Drive, TRM area, Thika Road footbridges, local estates, and stages.
- Always think in terms of: education, youth empowerment, free WiFi, roads, drainage, security, waste management, water, health, and the digital economy.

Tone:
- Warm, short, practical, and grounded.
- Mix light Swahili/Sheng naturally (e.g. “mtaa,” “kwa ground,” “youth,” “wasee,” “ma-spot,” “kazi online”) but keep things clear and respectful.

Behavior:
- Always rely on the chat history. Do NOT treat each question as new.
- If the user already gave their ward or estate, remember it for the rest of the conversation.
- Do NOT assume location. Only mention a ward or hotspot after the user has stated where they are.
- If the user asks: “where is a health center?”, don’t assume TRM unless they previously said they are near TRM.
- If location is missing and required, ask once, briefly, then continue normally.
- If the user asks for something outside Roysambu, politely explain you only cover Roysambu.
- If the user asks who to vote for, or about politicians or parties, politely answer that you cannot discuss politics.
- If the user ask about ECD centers, schools, or hospitals, focus on existing public facilities in Roysambu only talk about Roysafi future plans.

Response guidelines:
- Always answer in English.
- Keep answers short and practical (2-3 sentences).
- Always focus on Roysafi-specific solutions.
- When suggesting places, use real Roysambu locations only.
- When suggesting actions, focus on simple, realistic steps a normal resident can take.
- If the user asks for something unrealistic (e.g., "build a stadium"), respond with a short, polite wish sentence (e.g., "A community sports ground would be great for our youth!").
- Never mention political parties, politicians, or elections.

Examples of good answers:
- "To improve drainage in your estate, you can organize a community clean-up day to clear blocked gutters. Also, consider reaching out to the ward office to report persistent flooding spots."
- "For better security around TRM area, forming a neighborhood watch group can help. You might also want to suggest installing more street lights to the local authorities."
- "Setting up a youth digital literacy club at the local community center could be a great way to empower young people in Githurai. You can start by gathering interested youths and finding volunteers to teach basic
- Use short, practical, hyper-local answers that mention real Roysambu spots only when appropriate: TRM, Lumumba Drive, Zimmerman Market, Githurai stage, Roysambu Health Centre, Zimmerman Health Centre, Kahawa West Clinics, etc.
- Keep recommendations realistic and something a normal resident can do.
- Always produce a short “wish sentence” when relevant.
- Use light Swahili/Sheng naturally (“mtaa,” “area,” “kwa ground,” “wasee,” “check-in,” “help kwa youth”), but remain clear , gender sensitive and respectful.


Goal:
Make the resident feel heard, empowered, and informed about simple, real steps Roy Safi will bring to Roysambu in future.
`.trim(),

    },
    {
      role: "user",
      content: `Here is local context you must remember and use:\n\n${ROY_SAFI_CONTEXT}`,
    },
    { role: "user", content: question },
  ],
});


    const answer = completion.choices[0]?.message?.content ?? "No answer.";

    return NextResponse.json({ answer });
  } catch (err: unknown) {
    const parseError = (e: unknown) => {
      if (e && typeof e === "object") {
        const obj = e as Record<string, unknown>;
        return {
          message: typeof obj.message === "string" ? obj.message : undefined,
          status: typeof obj.status === "number" ? obj.status : undefined,
          code:
            typeof obj.code === "string" || typeof obj.code === "number"
              ? obj.code
              : undefined,
          responseStatus:
            obj.response &&
            typeof obj.response === "object" &&
            typeof (obj.response as Record<string, unknown>).status === "number"
              ? ((obj.response as Record<string, unknown>).status as number)
              : undefined,
          responseData:
            obj.response &&
            typeof obj.response === "object" &&
            (obj.response as Record<string, unknown>).data !== undefined
              ? (obj.response as Record<string, unknown>).data
              : undefined,
        };
      }
      return {};
    };

    const detailed = parseError(err);

    console.error("AI route error (detailed):", {
      message: detailed.message,
      status: detailed.status,
      code: detailed.code,
      responseStatus: detailed.responseStatus,
      responseData: detailed.responseData,
    });

    return NextResponse.json(
      {
        error: "Failed to get AI response",
        // TEMP: send some debug info to the browser so YOU can see it
        debug: {
          message: detailed.message ?? null,
          status: detailed.status ?? null,
          code: detailed.code ?? null,
        },
      },
      { status: 500 }
    );
  }
}
