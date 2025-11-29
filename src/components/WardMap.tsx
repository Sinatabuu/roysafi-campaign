// src/components/WardMap.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔑 Critical: Fix Leaflet default icon in production (Vercel)
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Ensure this file exists: src/data/polling_sites.ts
import { pollingSites } from "../data/polling_sites";

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
  activeWard?: string | null;
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
      const found = wardsData.find((w) => w.name === wardName);
      if (found) setInternalActiveWard(found);
    }
  };

  const defaultCenter: [number, number] = [-1.219, 36.882];
  const defaultZoom = 13;

  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="rounded-xl overflow-hidden shadow-md mb-4">
        <MapContainer
          center={activeWardData.center}
          zoom={activeWardData.zoom}
          style={{ height: "420px", width: "100%" }}
        >
          <LayersControl position="topright">
            {/* Base Layers */}
            <LayersControl.BaseLayer checked name="Streets">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Humanitarian">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://www.hotosm.org/">HOT</a>'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* Wards Layer */}
            <LayersControl.Overlay checked name="Wards">
              <LayerGroup>
                {<FlyToWard center={activeWardData.center} zoom={activeWardData.zoom} />}
                {wardsData.map((ward) => (
                  <CircleMarker
                    key={ward.name}
                    center={ward.center}
                    radius={ward.name === effectiveActiveWardName ? 12 : 8}
                    pathOptions={{
                      color:
                        ward.name === effectiveActiveWardName
                          ? "#22c55e" // emerald-500
                          : "#2563eb", // blue-600
                      fillOpacity: 0.8,
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => handleSelect(ward.name),
                    }}
                  >
                    <Popup>
                      <div className="max-w-xs text-sm">
                        <strong className="text-gray-900">{ward.name}</strong>
                        <p className="mt-1 text-gray-700">{ward.stats}</p>
                        <p className="mt-2 text-xs text-gray-600 italic">
                          {ward.focus}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(ward.name);
                          }}
                          className="mt-2 px-3 py-1.5 text-xs font-medium bg-[#2B27AB] text-white rounded hover:bg-[#25218d] transition"
                        >
                          Focus on {ward.name}
                        </button>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            {/* Polling Sites Layer */}
            <LayersControl.Overlay checked name="Polling Sites">
              <LayerGroup>
                {pollingSites.map((site) => {
                  let latLng: [number, number] | null = null;

                  if (
                    Array.isArray(site.position) &&
                    site.position.length === 2 &&
                    typeof site.position[0] === "number" &&
                    typeof site.position[1] === "number"
                  ) {
                    latLng = [site.position[0], site.position[1]];
                  } else if (
                    typeof site.lat === "number" &&
                    typeof site.lng === "number"
                  ) {
                    latLng = [site.lat, site.lng];
                  }

                  if (!latLng) {
                    console.warn("Invalid coordinates for polling site:", site);
                    return null;
                  }

                  return (
                    <Marker
                      key={site.id || `${latLng[0]}-${latLng[1]}`}
                      position={latLng}
                    >
                      <Popup>
                        <div className="text-sm max-w-xs">
                          <strong>{site.name || "Polling Site"}</strong>
                          {site.ward && (
                            <p className="mt-1">
                              <span className="font-medium">Ward:</span> {site.ward}
                            </p>
                          )}
                          {site.description && (
                            <p className="mt-1 text-gray-600 text-xs">
                              {site.description}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>

      {/* Ward Quick-Select Cards (Mobile-Friendly) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {wardsData.map((ward) => (
          <button
            key={ward.name}
            onClick={() => handleSelect(ward.name)}
            className={`p-4 text-left rounded-xl border transition-all ${
              ward.name === effectiveActiveWardName
                ? "border-[#2B27AB] bg-[#2B27AB]/5 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="font-bold text-gray-800">{ward.name}</div>
            <div className="mt-2 text-sm text-gray-600 line-clamp-2">
              {ward.stats}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WardMap;