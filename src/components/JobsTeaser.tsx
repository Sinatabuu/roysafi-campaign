// src/components/JobsTeaser.tsx
"use client";

import Link from "next/link";
import React from "react";

type Job = {
  id: number;
  title: string;
  org: string;
  ward?: string;
  type?: string;
};

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Cyber Café Attendant",
    org: "TRM Digital Hub",
    ward: "Roysambu Ward",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Youth Coach – Coding Club",
    org: "Mirema Community Center",
    ward: "Kahawa West",
    type: "Part-time",
  },
  {
    id: 3,
    title: "Boda Boda Lead Champion",
    org: "Zimmerman Riders Sacco",
    ward: "Zimmerman",
    type: "Project",
  },
];

export function JobsTeaser() {
  return (
    <div className="flex flex-col gap-3">
      {/* Jobs list (compact) */}
      <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {mockJobs.map((job) => (
          <li
            key={job.id}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs hover:bg-white transition"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-gray-900 line-clamp-1">
                {job.title}
              </p>
              {job.type && (
                <span className="inline-flex items-center rounded-full border border-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50">
                  {job.type}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[11px] text-gray-600 line-clamp-1">
              {job.org}
            </p>
            {job.ward && (
              <p className="mt-0.5 text-[10px] text-gray-500">
                Ward: {job.ward}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex justify-between items-center pt-1">
        <p className="text-[11px] text-gray-500">
          More local jobs & gigs coming as partners join the network.
        </p>
        <Link
          href="/jobs"
          className="text-[11px] font-semibold text-[#2B27AB] hover:underline"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
