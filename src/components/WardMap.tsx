// src/components/WardMap.tsx
"use client";

import React, { useState, useEffect } from "react";
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
    stats: "Security, Digital literacy & small business support.",
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
    stats: "Youth engagement, free wifi, creativity & safety.",
    focus:
      "We will invest in safe evening spaces, arts and music hubs, and community policing partnerships to reduce crime and idleness.",
    center: [-1.2195, 36.876], // approx Zimmerman
    zoom: 15,
  },
  {
    name: "Kahawa Ward",
    stats: "Roads, Sports, free wifi & clean estates",
    focus:
      "We aim for more reliable water access, modern public toilets, and organized waste collection points within walking distance.",
    center: [-1.212, 36.905], // approx Kahawa West
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

const WardMap: React.FC = () => {
  const [activeWard, setActiveWard] = useState<Ward>(wardsData[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Map Area */}
      <div className="w-full lg:w-3/4 max-w-3xl mx-auto">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2B27AB] bg-gray-100">
          <AnyMapContainer
            center={activeWard.center}
            zoom={activeWard.zoom}
            scrollWheelZoom={true}
            className="absolute inset-0"
          >
            <AnyTileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToWard ward={activeWard} />

            {wardsData.map((ward) => (
              <AnyMarker key={ward.name} position={ward.center} />
            ))}
          </AnyMapContainer>
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

      {/* Data Panel */}
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

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">
            5-Year Development Direction
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {activeWard.focus}
          </p>
          <ul className="text-xs text-gray-600 mt-2 space-y-1">
            <li>• Youth jobs & training opportunities</li>
            <li>• Better services close to estates</li>
            <li>• Cleaner, safer neighborhoods</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WardMap;
