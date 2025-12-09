// src/lib/jobs/types.ts

export type Ward =
  | "Roysambu"
  | "Zimmerman"
  | "Githurai"
  | "Kahawa West"
  | "Marurui / Korogocho North"
  | string;

export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "gig"
  | string;

export type PayType =
  | "monthly"
  | "daily"
  | "hourly"
  | "per-trip"
  | "stipend"
  | "commission"
  | string;

export interface Job {
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
