// src/app/sambu-poll/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Safe, lazy Supabase client creator – only called inside the handler
function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase env vars missing");
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured on server" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { ward, answers, wishlist } = body || {};

    if (!ward || !answers) {
      return NextResponse.json(
        { error: "Missing ward or answers" },
        { status: 400 }
      );
    }

    // Map our answers to the columns in roysambu_poll_responses
    const payload = {
      ward,
      q1_option: answers["q1"],
      q2_option: answers["q2"],
      q3_option: answers["q3"],
      q4_option: answers["q4"],
      q5_option: answers["q5"],
      wishlist: wishlist || null,
    };

    const { error } = await supabase
      .from("roysambu_poll_responses")
      .insert(payload);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ sambu-poll/submit error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
