// src/app/api/poll/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs"; // required for Postgres, not Edge

// GET = fetch active poll + aggregated results
export async function GET() {
  try {
    // 1) get active poll
    const { rows: pollRows } = await sql<{
      id: number;
      slug: string;
      question: string;
      options: string[];
    }>`SELECT id, slug, question, options
       FROM polls
       WHERE is_active = TRUE
       ORDER BY created_at DESC
       LIMIT 1;`;

    if (pollRows.length === 0) {
      return NextResponse.json({ poll: null }, { status: 200 });
    }

    const poll = pollRows[0];

    // 2) aggregate votes by choice_index
    const { rows: voteRows } = await sql<{
      choice_index: number;
      votes: string;
    }>`SELECT choice_index, COUNT(*)::text AS votes
       FROM poll_votes
       WHERE poll_id = ${poll.id}
       GROUP BY choice_index
       ORDER BY choice_index;`;

    // build results array aligned with options
    const results = poll.options.map((opt, idx) => {
      const row = voteRows.find((r) => Number(r.choice_index) === idx);
      return {
        option: opt,
        votes: row ? Number(row.votes) : 0,
      };
    });

    return NextResponse.json(
      {
        poll: {
          id: poll.id,
          slug: poll.slug,
          question: poll.question,
          options: poll.options,
          results,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/poll error:", err);
    return NextResponse.json(
      { error: "Failed to load poll" },
      { status: 500 }
    );
  }
}

// POST = submit a vote
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { choiceIndex, ward } = body as {
      choiceIndex?: number;
      ward?: string;
    };

    if (
      choiceIndex === undefined ||
      choiceIndex === null ||
      Number.isNaN(Number(choiceIndex))
    ) {
      return NextResponse.json(
        { error: "choiceIndex is required" },
        { status: 400 }
      );
    }

    // get active poll
    const { rows: pollRows } = await sql<{
      id: string;
      options: string[];
    }>`SELECT id, options
       FROM polls
       WHERE is_active = TRUE
       ORDER BY created_at DESC
       LIMIT 1;`;

    if (pollRows.length === 0) {
      return NextResponse.json(
        { error: "No active poll" },
        { status: 400 }
      );
    }

    const poll = pollRows[0];

    // validate option index
    if (
      choiceIndex < 0 ||
      choiceIndex >= poll.options.length
    ) {
      return NextResponse.json(
        { error: "Invalid choiceIndex" },
        { status: 400 }
      );
    }

    // insert vote
    await sql`
      INSERT INTO poll_votes (poll_id, ward, choice_index)
      VALUES (${poll.id}, ${ward ?? null}, ${choiceIndex});
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/poll error:", err);
    return NextResponse.json(
      { error: "Failed to record vote" },
      { status: 500 }
    );
  }
}
