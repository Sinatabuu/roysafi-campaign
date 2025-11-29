// src/app/roysambu/page.tsx  (or any route you prefer)
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import RoysambuPoll from "../../components/RoysambuPoll";

const WardMap = dynamic(
  () => import("../../components/WardMap").then((mod) => mod.WardMap),
  { ssr: false }
);




export default function RoysambuPage() {
  const [activeWard, setActiveWard] = useState<string | null>("Roysambu Ward");

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Roysambu Development Map & People’s Poll
      </h1>

      <p className="text-sm text-gray-700 mb-4">
        Tap a ward on the map (or card) to focus. Then fill the poll to tell us
        what development matters most in that area.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Left: Map */}
        <div className="bg-white rounded-lg shadow p-2">
          <WardMap
            activeWard={activeWard}
            onWardSelect={(wardName) => setActiveWard(wardName)}
          />
        </div>

        {/* Right: Poll */}
        <div className="bg-white rounded-lg shadow p-4">
          <RoysambuPoll lockedWard={activeWard ?? undefined} />
        </div>
      </div>
    </main>
  );
}
