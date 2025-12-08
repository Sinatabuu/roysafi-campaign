// src/app/api/site/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars missing");
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  try {
    const { path } = await req.json();

    const { error: insertError } = await supabase
      .from("site_visits")
      .insert({ path: path || "/" });

    if (insertError) {
      console.error(insertError);
    }

    const { data, error: countError } = await supabase
      .from("site_visits")
      .select("id", { count: "exact", head: true });

    if (countError) {
      console.error(countError);
      return NextResponse.json(
        { error: "Failed to fetch count" },
        { status: 500 }
      );
    }

    return NextResponse.json({ total: data?.length ?? 0 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
