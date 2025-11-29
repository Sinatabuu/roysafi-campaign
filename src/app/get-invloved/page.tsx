// src/app/get-involved/page.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-wide uppercase text-emerald-600">
            RoySafi • Get involved
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Get Involved in RoySambu&apos;s 5-Year Plan
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            RoySafi is about more than one person running — it&apos;s a network of
            neighbours, youth, professionals, mosques, churches, and businesses who want
            to see Roysambu become safer, more connected, and full of
            opportunity.
          </p>
        </header>

        {/* 3 engagement lanes */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* 1. Youth & Residents */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
              1. Youth & Residents
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>• Join our WhatsApp / Telegram planning groups per ward.</li>
              <li>• Help us map problems: dark streets, bad drainage, hotspots.</li>
              <li>• Volunteer on survey days or community meetings.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              We&apos;re especially looking for young people who can help with
              mobilization, note-taking, and digital skills.
            </p>
          </div>

          {/* 2. Churches & Community Groups */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
              2. Churches & Community Groups
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>• Host a small listening forum in your church or hall.</li>
              <li>• Share the RoySafi poll link with your members.</li>
              <li>• Partner with us on youth mentorship, skills, and discipleship.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              We believe local religious organizations and CBOs are key to long-term change,
              not just one election cycle.
            </p>
          </div>

          {/* 3. Businesses & Professionals */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
              3. Businesses & Professionals
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>• Offer internships, short trainings, or job shadows.</li>
              <li>• Support a tech hub, study space, or Wi-Fi zone.</li>
              <li>• Help us design practical projects in your sector.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              Whether you run a kiosk, a chama, or a tech company, there&apos;s a
              way to plug in.
            </p>
          </div>

          {/* 4. Contact CTA */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
                4. Talk to Sammy
              </h2>
              <p className="text-xs sm:text-sm text-slate-700">
                If you&apos;d like to invite Sammy to your estate, youth group,
                church, or business, reach out directly. Share what&apos;s
                happening on the ground and what you&apos;d like to see in the next 5
                years.
              </p>
            </div>
            <div className="mt-4 space-y-2 text-xs sm:text-sm">
              {/* Replace with your real contacts when you’re ready */}
              <p className="text-slate-700">
                📧{" "}
                <a
                  href="mailto:info@roysafi.com"
                  className="text-emerald-700 underline"
                >
                  info@roysafi.com
                </a>
              </p>
              <p className="text-slate-700">
                📱{" "}
                <span className="text-slate-800">
                  WhatsApp / Call: +254 7XX XXX XXX
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Back to home / poll */}
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            ← Back to home
          </Link>
          <Link
            href="/roysambu"
            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            🗳️ Go to the Roysambu People’s Poll
          </Link>
        </div>
      </section>
    </main>
  );
}
