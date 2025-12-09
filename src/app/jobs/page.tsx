// src/app/jobs/page.tsx
"use client";

import React, { useEffect, useState } from "react";
// ------------------
// 🔹 MODE
// ------------------
type Mode = "seeker" | "poster";


// ------------------
// 🔹 WORK MODE LABELS
// ------------------
const workModeLabels: Record<"onsite" | "remote" | "hybrid", string> = {
  onsite: "On-site",
  remote: "Remote",
  hybrid: "Hybrid",
};


// ------------------
// 🔹 WARD KEYS + LABELS
// ------------------
type WardKey =
  | "roysambu"
  | "zimmerman"
  | "githurai"
  | "kahawa_west"
  | "clay_city";
type Ward = WardKey;
const wardLabels: Record<WardKey, string> = {
  roysambu: "Roysambu",
  zimmerman: "Zimmerman",
  githurai: "Githurai",
  kahawa_west: "Kahawa West",
  clay_city: "Clay City",
};


// ------------------
// 🔹 JOB TYPES + LABELS
// ------------------
type JobType =
  | "job"
  | "gig"
  | "internship"
  | "training"
  | "mentorship";

const jobTypeLabels: Record<JobType, string> = {
  job: "Job",
  gig: "Gig",
  internship: "Internship",
  training: "Training",
  mentorship: "Mentorship",
};


// ------------------
// 🔹 PAY TYPES + LABELS
// ------------------
type PayType =
  | "daily"
  | "weekly"
  | "monthly"
  | "stipend"
  | "volunteer";

const payTypeLabels: Record<PayType, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  stipend: "Stipend",
  volunteer: "Volunteer",
};


// ------------------
// 🔹 JOB INTERFACE
// ------------------
interface Job {
  id: string;
  title: string;
  company: string;
  ward: WardKey;
  jobType: JobType;
  payType?: PayType;
  location?: string;
  locationDetail?: string;
  description?: string;
  postedAt: string;
  isActive: boolean;
  sector?: string;
  workMode?: "onsite" | "remote" | "hybrid";
  contactMethod: "whatsapp" | "phone" | "email" | "link";
  contactValue: string;
  verified?: boolean;
}


export default function JobsPage() {
  const [mode, setMode] = useState<Mode>("seeker");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [wardFilter, setWardFilter] = useState<Ward | "all">("all");
  const [typeFilter, setTypeFilter] = useState<JobType | "all">("all");
  const [workModeFilter, setWorkModeFilter] = useState<
    "all" | "onsite" | "remote" | "hybrid"
  >("all");
  
  const [error, setError] = useState<string | null>(null);

  // Form state for posting
  const [form, setForm] = useState({
    title: "",
    description: "",
    ward: "roysambu" as Ward,
    type: "job" as JobType,
    locationDetail: "",
    sector: "",
    workMode: "onsite" as "onsite" | "remote" | "hybrid",
    payType: "daily" as PayType,
    payRangeMin: "",
    payRangeMax: "",
    contactMethod: "whatsapp" as "whatsapp" | "phone" | "email" | "link",
    contactValue: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  async function fetchJobs() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (wardFilter !== "all") params.set("ward", wardFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (workModeFilter !== "all") params.set("workMode", workModeFilter);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError("Could not load jobs. Please try again.");
      } else {
        console.error("Unknown error", err);
        setError("Could not load jobs. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wardFilter, typeFilter, workModeFilter]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to post opportunity");
      }

      setSubmitMessage(
        "Thanks! Your opportunity was submitted and is pending review."
      );
      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        locationDetail: "",
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message || "Could not submit opportunity.");
      } else {
        console.error("Unknown error", err);
        setError("Could not submit opportunity.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Define visibleJobs (currently same as jobs since filtering is handled by API)
  const visibleJobs = jobs;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">
          RoySambu Jobs &amp; Opportunities
        </h1>
        <p className="text-sm text-gray-600">
          Local jobs, gigs, internships, training and mentorship — starting in
          Roysambu and growing with you. No scams, no “send money first,” no
          fake promises.
        </p>

        {/* Mode Toggle */}
        <div className="inline-flex rounded-full border overflow-hidden text-sm">
          <button
            className={`px-4 py-2 ${
              mode === "seeker" ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => setMode("seeker")}
          >
            I&apos;m looking for work
          </button>
          <button
            className={`px-4 py-2 ${
              mode === "poster" ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => setMode("poster")}
          >
            I&apos;m offering work or training
          </button>
        </div>
      </section>

      {/* SEEKER VIEW */}
      {mode === "seeker" && (
        <>
          {/* Filters */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Find opportunities</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Ward
                </label>
                <select
                  className="border rounded px-2 py-1"
                  value={wardFilter}
                  onChange={(e) =>
                    setWardFilter(e.target.value as Ward | "all")
                  }
                >
                  <option value="all">All wards</option>
                  {Object.entries(wardLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Type
                </label>
                <select
                  className="border rounded px-2 py-1"
                  value={typeFilter}
                  onChange={(e) =>
                    setTypeFilter(e.target.value as JobType | "all")
                  }
                >
                  <option value="all">All types</option>
                  {Object.entries(jobTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Work Mode
                </label>
                <select
                  className="border rounded px-2 py-1"
                  value={workModeFilter}
                  onChange={(e) =>
                    setWorkModeFilter(
                      e.target.value as "all" | "onsite" | "remote" | "hybrid"
                    )
                  }
                >
                  <option value="all">Any work mode</option>
                  {Object.entries(workModeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Job List */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Opportunities</h2>
            {loading && <p className="text-sm text-gray-500">Loading...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {visibleJobs.length === 0 && !loading && (
              <p className="text-sm text-gray-500">
                No opportunities found yet. Try another ward, type, or work mode.
              </p>
            )}

            <div className="space-y-4">
              {visibleJobs.map((job) => (
                <article
                  key={job.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-base">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {wardLabels[job.ward]} •{" "}
                        {jobTypeLabels[job.jobType]} •{" "}
                        {job.sector || "General"}
                      </p>
                    </div>

                    {/* UPDATED RIGHT-HAND STACK */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border">
                        {job.payType ? payTypeLabels[job.payType] : "N/A"}
                      </span>

                      {/* Display Work Mode if available */}
                      {job.workMode && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border text-[11px]">
                          {workModeLabels[job.workMode]}
                        </span>
                      )}

                      {job.verified ? (
                        <span className="text-[11px] text-green-600">
                          ✅ Verified
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400">
                          Unverified
                        </span>
                      )}
                    </div>
                  </div>
                  {/* END UPDATED RIGHT-HAND STACK */}

                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {job.description}
                  </p>

                  {job.locationDetail && (
                    <p className="mt-1 text-xs text-gray-500">
                      Location: {job.locationDetail}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    Posted: {new Date(job.postedAt).toLocaleDateString()}
                  </p>

                  <div className="mt-3 text-xs">
                    <span className="font-semibold">Contact via:</span>{" "}
                    {job.contactMethod === "whatsapp" && (
                      <span>WhatsApp ({job.contactValue})</span>
                    )}
                    {job.contactMethod === "phone" && (
                      <span>Phone ({job.contactValue})</span>
                    )}
                    {job.contactMethod === "email" && (
                      <span>Email ({job.contactValue})</span>
                    )}
                    {job.contactMethod === "link" && (
                      <a
                        href={job.contactValue}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Apply via link
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* POSTER VIEW */}
      {mode === "poster" && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Offer work, gigs, training or mentorship
          </h2>
          <p className="text-sm text-gray-600">
            Tell us what you need help with. We&apos;ll show it to youth in
            your ward. No charging applicants, no scams — serious opportunities
            only.
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {submitMessage && (
            <p className="text-sm text-green-700">{submitMessage}</p>
          )}

          <form
            className="space-y-3 border rounded-lg p-4 bg-white shadow-sm"
            onSubmit={handleSubmit}
          >
            {/* Row 1: Title & Job Type */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Title
                </label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Part-time shop assistant"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Type
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value as JobType }))
                  }
                >
                  {Object.entries(jobTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Ward, Work Mode, Sector */}
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Ward
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.ward}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ward: e.target.value as Ward }))
                  }
                >
                  {Object.entries(wardLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Work Mode
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.workMode}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      workMode: e.target.value as "onsite" | "remote" | "hybrid",
                    }))
                  }
                >
                  {Object.entries(workModeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sector (optional)
                </label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.sector}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sector: e.target.value }))
                  }
                  placeholder="e.g. retail, creative"
                />
              </div>
            </div>

            {/* Row 3: Description */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Description
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-sm min-h-[80px]"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Explain what you need, hours, basic requirements."
                required
              />
            </div>

            {/* Row 4: Location Detail */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Location detail
              </label>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={form.locationDetail}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    locationDetail: e.target.value,
                  }))
                }
                placeholder="e.g. near TRM, behind XYZ, Zimmerman 3rd Ave"
              />
            </div>

            {/* Row 5: Pay Details */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Pay Frequency
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.payType}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      payType: e.target.value as PayType,
                    }))
                  }
                >
                  {Object.entries(payTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Min pay (optional)
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.payRangeMin}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      payRangeMin: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Max pay (optional)
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.payRangeMax}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      payRangeMax: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Row 6: Contact Info */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Contact method
                </label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.contactMethod}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      contactMethod: e.target.value as
                        | "whatsapp"
                        | "phone"
                        | "email"
                        | "link",
                    }))
                  }
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone call</option>
                  <option value="email">Email</option>
                  <option value="link">External link</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Contact value
                </label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={form.contactValue}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      contactValue: e.target.value,
                    }))
                  }
                  placeholder="+2547..., email, or URL"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-4 py-2 rounded bg-black text-white text-sm disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit opportunity"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}