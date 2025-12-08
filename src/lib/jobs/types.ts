// src/lib/jobs/types.ts
export type JobType = "job" | "gig" | "internship" | "training" | "mentorship";
export type PayType = "daily" | "weekly" | "monthly" | "stipend" | "volunteer";
export type Ward =
  | "roysambu"
  | "zimmerman"
  | "githurai"
  | "kahawa_west"
  | "clay_city";

export interface Job {
  id: string;
  title: string;
  type: JobType;
  description: string;
  ward: Ward;
  locationDetail?: string;
  sector?: string;
  workMode?: "onsite" | "remote" | "hybrid";
  payType: PayType;
  payRangeMin?: number | null;
  payRangeMax?: number | null;
  contactMethod: "whatsapp" | "phone" | "email" | "link";
  contactValue: string;
  status: "active" | "pending_review" | "expired";
  verified: boolean;
  createdAt: string; // ISO string
  expiresAt?: string | null;
}
