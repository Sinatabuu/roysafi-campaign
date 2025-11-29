// src/app/donate/page.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-wide uppercase text-emerald-600">
            RoySafi • Partner with us
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Help the RoySafi Message Reach More People
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700">
            Every contribution — big or small — helps us reach more estates,
            gather better data, and turn good ideas into real projects for
            Roysambu. When you give, you are investing in youth, safer
            neighbourhoods, and long-term change.
          </p>
        </header>

        {/* Why giving matters */}
        <div className="grid gap-6 sm:grid-cols-2 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
              Why Your Support Matters
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>• Printing materials to explain the 5-year plan in simple language.</li>
              <li>• Data costs and tools for running online polls and maps.</li>
              <li>• Community forums in churches, schools, and youth spaces.</li>
              <li>• Laying the groundwork for free Wi-Fi and digital skills labs.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              No amount is too small to make a difference. Even a little can
              help us reach one more estate, one more youth, one more family.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-[#2B27AB] mb-2">
              What Partners Make Possible
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
              <li>• Consistent outreach instead of one-off events.</li>
              <li>• Better documentation of the needs in each ward.</li>
              <li>• Pilot projects in youth skills, innovation hubs, or Wi-Fi zones.</li>
              <li>• Content and translations so more people understand the vision.</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              We especially welcome monthly or quarterly partners who want to
              walk this journey with Roysambu over the full 5-year plan.
            </p>
          </div>
        </div>

        {/* Ways to give */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-8">
          <h2 className="text-sm font-semibold text-[#2B27AB] mb-3">
            Ways You Can Give
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mb-3">
            Use any of the channels below. As we formalise structures, we will
            update this page with clearer accountability and reporting on how
            funds are used for RoySafi activities.
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-800">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                1. Mobile Money (M-Pesa)
              </h3>
              <p>
                {/* Replace with your real details when ready */}
                Paybill / Till: <span className="font-mono">XXXXXX</span>{" "}
                <span className="text-slate-500">(to be confirmed)</span>
              </p>
              <p>Account: <span className="font-mono">ROYSAFI</span></p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                2. Bank Transfer
              </h3>
              <p>Account Name: <span className="font-mono">RoySafi Initiative</span> (placeholder)</p>
              <p>Bank: <span className="font-mono">To be added</span></p>
              <p>Account No: <span className="font-mono">XXXXXXXXXX</span></p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                3. International / Diaspora Support
              </h3>
              <p>
                For friends and family abroad who want to support, we can share
                a direct channel (e.g. Wise, PayPal, or bank link). Reach out
                and we will guide you on the safest and most transparent option.
              </p>
            </div>
          </div>

          <p className="mt-5 text-[11px] text-slate-500">
            If you&apos;d like a simple report of how your contribution was used,
            please include your name and contact when you give, or message us
            directly. We want this journey to be open and accountable.
          </p>
        </div>

        {/* Contact + navigation */}
        <div className="space-y-4 mb-10 text-xs sm:text-sm text-slate-800">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Talk to Sammy</h3>
            <p>
              If you want to partner in a deeper way — e.g. sponsoring a ward
              forum, youth program, or Wi-Fi zone — please reach out directly.
            </p>
            <p className="mt-2">
              📧{" "}
              <a
                href="mailto:info@roysafi.com"
                className="text-emerald-700 underline"
              >
                info@roysafi.com
              </a>
            </p>
            <p>
              📱{" "}
              <span className="text-slate-900">
                WhatsApp / Call: +254 7XX XXX XXX
              </span>{" "}
              <span className="text-slate-500">(update with your real number)</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
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
          <Link
            href="/get-involved"
            className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            🤝 See ways to get involved
          </Link>
        </div>
      </section>
    </main>
  );
}
