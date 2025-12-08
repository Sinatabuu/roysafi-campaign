import { NextRequest, NextResponse } from "next/server";

type ConnectRequestBody = {
  deviceId?: string | null;
  ward?: string | null;
  acceptTerms?: boolean;
  language?: string | null;
};

type ConnectData = {
  sessionId: string;
  wifiStatus: "connected" | "pending";
  expiresAt: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ConnectRequestBody;

    if (!body.acceptTerms) {
      return NextResponse.json(
        { ok: false, error: "You must accept terms to connect." },
        { status: 400 }
      );
    }

    const ward = body.ward || "Roysambu";
    const language = body.language || "en";

    // TODO: integrate with real router/hotspot system here.
    // For now, we just simulate creating a WiFi session:

    const sessionId = `sess_${Math.random().toString(36).slice(2)}`;
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // +2h

    const data: ConnectData = {
      sessionId,
      wifiStatus: "connected",
      expiresAt,
    };

    // TODO: optionally log to DB (Supabase, Postgres, etc.)

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error in /api/connect:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
