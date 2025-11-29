// @ts-nocheck
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
    <div className="w-full h-full">
      <MapContainer
        center={activeWardData.center || defaultCenter}
        zoom={activeWardData.zoom || defaultZoom}
        style={{ height: "420px", width: "100%" }}
        className="rounded-xl overflow-hidden shadow-md"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Streets">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='Imagery © Mapbox, Maxar, Esri'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {/* You can swap to a true satellite provider later (Mapbox, etc.) */}
          </LayersControl.BaseLayer>

          {/* Wards layer */}
          <LayersControl.Overlay checked name="Wards">
            <LayerGroup>
              {activeWardData && (
                <FlyToWard
                  center={activeWardData.center}
                  zoom={activeWardData.zoom}
                />
              )}
              {wardsData.map((ward) => (
                <CircleMarker
                  key={ward.name}
                  center={ward.center}
                  radius={ward.name === effectiveActiveWardName ? 12 : 8}
                  pathOptions={{
                    color:
                      ward.name === effectiveActiveWardName
                        ? "#22c55e"
                        : "#2563eb",
                    fillOpacity: 0.8,
                  }}
                  eventHandlers={{
                    click: () => handleSelect(ward.name),
                  }}
                >
                  <Popup>
                    <div className="text-xs">
                      <strong>{ward.name}</strong>
                      <p className="mt-1">{ward.stats}</p>
                      <p className="mt-1 text-[11px] text-gray-600">
                        {ward.focus}
                      </p>
                      <button
                        onClick={() => handleSelect(ward.name)}
                        className="mt-2 px-2 py-1 text-[11px] rounded bg-black text-white"
                      >
                        Take poll for {ward.name}
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Polling sites layer */}
          <LayersControl.Overlay checked name="Polling Sites / Hotspots">
            <LayerGroup>
              {pollingSites.map((site: any) => (
                <Marker key={site.id} position={site.position}>
                  <Popup>
                    <div className="text-xs">
                      <strong>{site.name}</strong>
                      {site.ward && (
                        <p className="mt-1">
                          Ward: <span className="font-semibold">{site.ward}</span>
                        </p>
                      )}
                      {site.description && (
                        <p className="mt-1 text-[11px] text-gray-600">
                          {site.description}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      {/* Ward cards – mobile friendly quick jump */}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {wardsData.map((ward) => (
          <button
            key={ward.name}
            onClick={() => handleSelect(ward.name)}
            className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
              ward.name === effectiveActiveWardName
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <div className="font-semibold text-gray-800">{ward.name}</div>
            <div className="text-[11px] text-gray-600">{ward.focus}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WardMap;
