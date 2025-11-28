// src/components/WardMap.tsx
"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Ward = {
  name: string;
  stats: string;
  focus: string;
  center: [number, number];
  zoom: number;
};

const wardsData: Ward[] = [
  {
    name: "Roysambu Ward",
    stats: "Infrastructure: roads, drainage, and safe walkways.",
    focus:
      "In the next 5 years, we focus on safer pedestrian routes around TRM, upgraded estate roads, and better drainage to reduce flooding.",
    center: [-1.219, 36.882], // approx Roysambu
    zoom: 15,
  },
  {
    name: "Githurai Ward",
    stats: "Security, digital literacy & small business support.",
    focus:
      "We will create digital learning centers, support youth in online work, and organize market reforms so traders work in cleaner, safer spaces.",
    center: [-1.2095, 36.894], // approx Githurai
    zoom: 15,
  },
  {
    name: "Kahawa West Ward",
    stats: "Water, sanitation & clean estates.",
    focus:
      "We aim for more reliable water access, modern public toilets, and organized waste collection points within walking distance.",
    center: [-1.212, 36.905], // approx Kahawa West
    zoom: 15,
  },
  {
    name: "Zimmerman",
    stats: "Youth engagement, free Wi-Fi, creativity & safety.",
    focus:
      "We will invest in safe evening spaces, arts and music hubs, free Wi-Fi zones, and community policing partnerships to reduce crime and idleness.",
    center: [-1.2195, 36.876], // approx Zimmerman
    zoom: 15,
  },
  {
    name: "Kahawa Ward",
    stats: "Roads, sports, free Wi-Fi & clean estates.",
    focus:
      "Kahawa will see better access roads, modern sports grounds, public Wi-Fi hotspots, and organized waste management on every main court.",
    center: [-1.197823, 36.946], // approx Kahawa
    zoom: 15,
  },
];

// relax Leaflet types for TS
const AnyMapContainer: any = MapContainer;
const AnyTileLayer: any = TileLayer;
const AnyMarker: any = Marker;

const FlyToWard: React.FC<{ ward: Ward }> = ({ ward }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(ward.center, ward.zoom, {
      duration: 1.0,
    });
  }, [ward, map]);

  return null;
};

type BaseLayer = "streets" | "development";

const WardMap: React.FC = () => {
  const [activeWard, setActiveWard] = useState<Ward>(wardsData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [baseLayer, setBaseLayer] = useState<BaseLayer>("streets");

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const match =
      wardsData.find((w) => w.name.toLowerCase().includes(term)) || null;

    if (match) {
      setActiveWard(match);
    } else {
      // later we can add a toast; for now we silently do nothing
      console.warn("No ward match for:", term);
    }
  };

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* LEFT: Map + controls */}
      <div className="w-full lg:w-3/4 max-w-3xl mx-auto">
        {/* Top controls: search + layer toggle */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="w-full sm:w-2/3 flex gap-2">
            <input
              type="text"
              placeholder="Search your hood (e.g. Kahawa, Zimmerman, Githurai)..."
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2B27AB] focus:border-[#2B27AB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKey}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="whitespace-nowrap rounded-full bg-[#2B27AB] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#221f84] transition"
            >
              Locate
            </button>
          </div>

          {/* Base layer toggle */}
          <div className="flex justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => setBaseLayer("streets")}
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs border font-semibold transition ${
                baseLayer === "streets"
                  ? "bg-[#2B27AB] text-white border-[#2B27AB]"
                  : "bg-white text-[#2B27AB] border-[#2B27AB]/50 hover:bg-[#2B27AB]/10"
              }`}
            >
              Streets View
            </button>
            <button
              type="button"
              onClick={() => setBaseLayer("development")}
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs border font-semibold transition ${
                baseLayer === "development"
                  ? "bg-[#2B27AB] text-white border-[#2B27AB]"
                  : "bg-white text-[#2B27AB] border-[#2B27AB]/50 hover:bg-[#2B27AB]/10"
              }`}
            >
              Development View
            </button>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2B27AB] bg-gray-100">
          <AnyMapContainer
            center={activeWard.center}
            zoom={activeWard.zoom}
            scrollWheelZoom={true}
            className="absolute inset-0"
          >
            <AnyTileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={
                baseLayer === "streets"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              }
            />

            <FlyToWard ward={activeWard} />

            {wardsData.map((ward) => (
              <AnyMarker key={ward.name} position={ward.center} />
            ))}
          </AnyMapContainer>

          {/* Overlay helper text */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-black/45 px-3 py-1 text-[10px] sm:text-xs text-white font-medium">
              Pinch, zoom, and tap the ward buttons below to explore the 5-year
              plan for your area.
            </span>
          </div>
        </div>

        {/* Ward chips BELOW the map — touch-friendly */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {wardsData.map((ward) => (
            <button
              key={ward.name}
              type="button"
              onClick={() => setActiveWard(ward)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border transition
                ${
                  activeWard.name === ward.name
                    ? "bg-[#2B27AB] text-white border-[#2B27AB]"
                    : "bg-white text-[#2B27AB] border-[#2B27AB]/50 hover:bg-[#2B27AB]/10"
                }`}
            >
              {ward.name}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Data Panel */}
      <div className="w-full lg:w-1/4 max-w-md mx-auto lg:mx-0 p-5 sm:p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-[#2B27AB] border-b pb-2 mb-4">
          Ward Focus (2025–2030)
        </h3>

        <p className="text-base font-semibold text-gray-800">
          {activeWard.name}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Primary Focus: </span>
          {activeWard.stats}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <h4 className="text-sm font-bold text-gray-700">
            5-Year Development Direction
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {activeWard.focus}
          </p>

          <div className="pt-3 border-t border-dashed border-gray-300 space-y-1">
            <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Quick Impact Targets
            </h5>
            <ul className="text-[11px] sm:text-xs text-gray-600 space-y-1">
              <li>• Youth jobs & TVET/digital training opportunities</li>
              <li>• Essential services closer to estates & courts</li>
              <li>• Cleaner, safer, and greener neighborhoods</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#2B27AB]/5 px-3 py-2 text-[11px] sm:text-xs text-gray-700">
          <span className="font-semibold text-[#2B27AB]">Note: </span>
          These are priority directions for planning and consultation. Final
          projects will be co-created with residents, youth groups, churches,
          and local businesses in each ward.
        </div>
      </div>
    </div>
  );
};

export default WardMap;
