// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Job, JobType, PayType, Ward } from "@/lib/jobs/types";

// ⚠️ In-memory store for MVP only (resets on server restart)
let JOBS: Job[] = [
  {
    id: "1",
    title: "Shop Assistant (Part-time)",
    type: "job",
    description:
      "Help in a small retail shop near TRM. Basic customer service and stocking.",
    ward: "roysambu",
    locationDetail: "Near TRM, Roysambu",
    sector: "retail",
    workMode: "onsite",
    payType: "weekly",
    payRangeMin: 2500,
    payRangeMax: 3500,
    contactMethod: "whatsapp",
    contactValue: "+254700000000",
    status: "active",
    verified: true,
    createdAt: new Date().toISOString(),
    expiresAt: null,
  },
  {
    id: "2",
    title: "Graphic Design Intern",
    type: "internship",
    description:
      "Basic Canva / social media design for a local youth organization.",
    ward: "zimmerman",
    locationDetail: "Zimmerman, online + meetings",
    sector: "creative",
    workMode: "hybrid",
    payType: "stipend",
    payRangeMin: 5000,
    payRangeMax: 8000,
    contactMethod: "email",
    contactValue: "opportunities@example.com",
    status: "active",
    verified: false,
    createdAt: new Date().toISOString(),
    expiresAt: null,
  },
];

function parseEnum<T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T
): T {
  if (!value) return fallback;
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ward = searchParams.get("ward") as Ward | null;
  const type = searchParams.get("type") as JobType | null;

  let results = JOBS.filter((job) => job.status === "active");

  if (ward && ward !== "all") {
    results = results.filter((job) => job.ward === ward);
  }

  if (type && type !== "all") {
    results = results.filter((job) => job.type === type);
  }

  return NextResponse.json({ jobs: results });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const ward = parseEnum<Ward>(body.ward, [
      "roysambu",
      "zimmerman",
      "githurai",
      "kahawa_west",
      "clay_city",
    ], "roysambu");

    const type = parseEnum<JobType>(
      body.type,
      ["job", "gig", "internship", "training", "mentorship"],
      "job"
    );

    const payType = parseEnum<PayType>(
      body.payType,
      ["daily", "weekly", "monthly", "stipend", "volunteer"],
      "daily"
    );

    const contactMethod = parseEnum<"whatsapp" | "phone" | "email" | "link">(
      body.contactMethod,
      ["whatsapp", "phone", "email", "link"],
      "whatsapp"
    );

    const contactValue = String(body.contactValue || "").trim();

    if (!title || !description || !contactValue) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const now = new Date();
    const newJob: Job = {
      id: String(Date.now()),
      title,
      description,
      ward,
      type,
      payType,
      locationDetail: body.locationDetail || "",
      sector: body.sector || "",
      workMode: body.workMode || "onsite",
      payRangeMin: body.payRangeMin ? Number(body.payRangeMin) : null,
      payRangeMax: body.payRangeMax ? Number(body.payRangeMax) : null,
      contactMethod,
      contactValue,
      status: "pending_review",
      verified: false,
      createdAt: now.toISOString(),
      expiresAt: null,
    };

    JOBS.unshift(newJob);

    return NextResponse.json({ job: newJob }, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/jobs:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
