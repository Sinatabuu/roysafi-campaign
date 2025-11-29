// src/app/sambu-poll/results/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type PollResults = {
  [questionId: string]: {
    [optionId: string]: number;
  };
};

// Same lazy helper – no top-level createClient call
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

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured on server" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const ward = searchParams.get("ward");

  if (!ward) {
    return NextResponse.json(
      { error: "Ward is required" },
      { status: 400 }
    );
  }

  // Read from our roysambu_poll_responses table
  const { data, error } = await supabase
    .from("roysambu_poll_responses")
    .select("q1_option, q2_option, q3_option, q4_option, q5_option")
    .eq("ward", ward);

  if (error) {
    console.error("❌ Supabase select error:", error);
    return NextResponse.json(
      { error: "Failed to fetch poll data" },
      { status: 500 }
    );
  }

  const results: PollResults = {
    q1: {},
    q2: {},
    q3: {},
    q4: {},
    q5: {},
  };

  for (const row of data || []) {
    ["q1", "q2", "q3", "q4", "q5"].forEach((qid) => {
      const field =
        `${qid}_option` as
          | "q1_option"
          | "q2_option"
          | "q3_option"
          | "q4_option"
          | "q5_option";
      const optionId = (row as any)[field] as string;
      if (!optionId) return;

      if (!results[qid][optionId]) {
        results[qid][optionId] = 0;
      }
      results[qid][optionId] += 1;
    });
  }

  return NextResponse.json({ results });
}
