// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";

// 🔹 Make this file self-contained: define types BEFORE using them

type Ward =
  | "Roysambu"
  | "Zimmerman"
  | "Githurai"
  | "Kahawa West"
  | "Marurui / Korogocho North"
  | string;

type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "gig"
  | string;

type PayType =
  | "monthly"
  | "daily"
  | "hourly"
  | "per-trip"
  | "stipend"
  | "commission"
  | string;

interface Job {
  id: string;
  title: string;
  company: string;
  ward: Ward;
  jobType: JobType;
  payType?: PayType;
  location?: string;
  description?: string;
  postedAt: string; // ISO date
  isActive: boolean;
}

// ⚠️ In-memory store for MVP only (resets on server restart)
let JOBS: Job[] = [
  {
    id: "1",
    title: "Cyber Café Attendant",
    company: "TRM Digital Hub",
    ward: "Roysambu",
    jobType: "full-time",
    payType: "monthly",
    location: "TRM Area",
    description:
      "Support youth and customers with basic computer use, printing, and online services.",
    postedAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    title: "Youth Coach – Coding Club",
    company: "Mirema Community Center",
    ward: "Kahawa West",
    jobType: "part-time",
    payType: "stipend",
    location: "Mirema / Kahawa West",
    description: "Teach basic coding and digital literacy to young people.",
    postedAt: new Date().toISOString(),
    isActive: true,
  },
];

export const runtime = "nodejs";

// GET /api/jobs → list jobs (for JobsTeaser & /jobs page)
export async function GET() {
  const activeJobs = JOBS.filter((job) => job.isActive);
  return NextResponse.json({ jobs: activeJobs });
}

// POST /api/jobs → simple admin add job (MVP)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newJob: Job = {
      id: crypto.randomUUID(),
      title: body.title ?? "Untitled Role",
      company: body.company ?? "Unknown Employer",
      ward: body.ward ?? "Roysambu",
      jobType: body.jobType ?? "gig",
      payType: body.payType,
      location: body.location,
      description: body.description,
      postedAt: new Date().toISOString(),
      isActive: body.isActive ?? true,
    };

    JOBS.push(newJob);

    return NextResponse.json({ ok: true, job: newJob }, { status: 201 });
  } catch (err) {
    console.error("Error creating job", err);
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}
