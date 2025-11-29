// src/components/WardMap.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer, TileLayer, CircleMarker, Popup, useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// If you need pollingSites later, you can still import them:
// import { pollingSites, PollingSite } from "../data/polling_sites";

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
    center: [-1.219, 36.882],
    zoom: 15,
  },
  {
    name: "Githurai Ward",
    stats: "Security, digital literacy & small business support.",
    focus:
      "We will create digital learning centers, support vibandas and small traders, and improve safety in the Githurai corridors.",
    center: [-1.212, 36.899],
    zoom: 15,
  },
  {
    name: "Zimmerman Ward",
    stats: "Orderly development, waste management and public spaces.",
    focus:
      "We will push for better garbage management, organized stages, and open spaces where families and youth can breathe.",
    center: [-1.217, 36.878],
    zoom: 15,
  },
  {
    name: "Kahawa West Ward",
    stats: "Schools, health and safe neighbourhoods.",
    focus:
      "Our focus is on upgrading schools, making amenities accessible, and keeping estates safe and walkable.",
    center: [-1.183, 36.897],
    zoom: 15,
  },
  {
    name: "Kahawa Ward",
    stats: "Transport, safety and student-friendly services.",
    focus:
      "We want better links for students and workers and safer roads along the Thika Road corridor and estates.",
    center: [-1.188, 36.923],
    zoom: 15,
  },
];

type WardMapProps = {
  /** When provided, the map will highlight and fly to this ward. */
  activeWard?: string | null;
  /** When a ward is clicked on the map or card. */
  onWardSelect?: (wardName: string) => void;
};

const FlyToWard: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const WardMap: React.FC<WardMapProps> = ({
  activeWard,
  onWardSelect,
}) => {
  // If no activeWard prop, use internal state so it still works on the homepage.
  const [internalActiveWard, setInternalActiveWard] = useState<Ward>(
    wardsData[0]
  );

  const effectiveActiveWardName = activeWard || internalActiveWard.name;

  const activeWardData =
    wardsData.find((w) => w.name === effectiveActiveWardName) || wardsData[0];

  const handleSelect = (wardName: string) => {
    if (onWardSelect) {
      onWardSelect(wardName);
    } else {
      // fallback: internal state for places where no callback is passed
      const found = wardsData.find((w) => w.name === wardName);
      if (found) setInternalActiveWard(found);
    }
  };

  const defaultCenter: [number, number] = [-1.219, 36.882];
  const defaultZoom = 13;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={activeWardData.center || defaultCenter}
        zoom={activeWardData.zoom || defaultZoom}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fly when active ward changes */}
        {activeWardData && (
          <FlyToWard center={activeWardData.center} zoom={activeWardData.zoom} />
        )}

        {/* One marker per ward */}
        {wardsData.map((ward) => (
          <CircleMarker
            key={ward.name}
            center={ward.center}
            radius={10}
            pathOptions={{
              color:
                ward.name === effectiveActiveWardName ? "#22c55e" : "#2563eb", // green if active
            }}
            eventHandlers={{
              click: () => handleSelect(ward.name),
            }}
          >
            <Popup>
              <div>
                <strong>{ward.name}</strong>
                <p className="text-xs">{ward.stats}</p>
                <button
                  onClick={() => handleSelect(ward.name)}
                  className="mt-2 px-2 py-1 text-xs rounded bg-black text-white"
                >
                  Take poll for {ward.name}
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Optional: clickable ward cards below the map */}
      <div className="mt-3 grid gap-2">
        {wardsData.map((ward) => (
          <button
            key={ward.name}
            onClick={() => handleSelect(ward.name)}
            className={`w-full text-left px-3 py-2 rounded border ${
              ward.name === effectiveActiveWardName
                ? "border-black bg-gray-100"
                : "border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">{ward.name}</div>
            <div className="text-xs text-gray-600">{ward.focus}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// default export so existing pages importing `WardMap` as default still work
export default WardMap;
