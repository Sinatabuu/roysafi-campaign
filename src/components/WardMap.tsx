// src/components/WardMap.tsx
"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { pollingSites, PollingSite } from "../data/polling_sites";

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

// alias mapping so local slang still works
const wardAliases: Record<string, string> = {
  trm: "Roysambu Ward",
  "trm drive": "Roysambu Ward",
  seasons: "Roysambu Ward",
  roysambu: "Roysambu Ward",

  "githurai 44": "Githurai Ward",
  "githurai 45": "Githurai Ward",
  githurai: "Githurai Ward",

  "kahawa west": "Kahawa West Ward",
  "kahawa sukari": "Kahawa Ward",
  "kahawa wendani": "Kahawa Ward",
  kahawa: "Kahawa Ward",

  zima: "Zimmerman",
  zimmerman: "Zimmerman",
};

// relax Leaflet types for TS
const AnyMapContainer: any = MapContainer;
const AnyTileLayer: any = TileLayer;
const AnyMarker: any = Marker;
const AnyCircleMarker: any = CircleMarker;
const AnyPopup: any = Popup;

const FlyToWard: React.FC<{ ward: Ward }> = ({ ward }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(ward.center, ward.zoom, {
      duration: 1.0,
    });
  }, [ward, map]);

  return null;
};

type BaseLayer = "streets" | "planning";

const WardMap: React.FC = () => {
  const [activeWard, setActiveWard] = useState<Ward>(wardsData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const [baseLayer, setBaseLayer] = useState<BaseLayer>("streets");
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
    label?: string;
  } | null>(null);

  // === wifi counts for the right-hand card ===
  const wardSites: PollingSite[] = pollingSites.filter(
    (s) => s.ward === activeWard.name
  );
  const phase1Count = wardSites.filter((s) => s.wifiPhase === 1).length;
  const phase2Count = wardSites.filter((s) => s.wifiPhase === 2).length;
  const phase3Count = wardSites.filter((s) => s.wifiPhase === 3).length;

  const handleLocate = useCallback(async () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSearchStatus("Type an estate, street, or ward name.");
      return;
    }

    // 1) Try direct ward name match
    const wardMatch =
      wardsData.find((w) => w.name.toLowerCase().includes(term)) || null;
    if (wardMatch) {
      setActiveWard(wardMatch);
      setSearchLocation(null);
      setSearchStatus(`Showing: ${wardMatch.name}`);
      return;
    }

    // 2) Try aliases (TRM, Zima, Kahawa Sukari, etc.)
    const aliasKey = Object.keys(wardAliases).find((key) =>
      term.includes(key)
    );
    if (aliasKey) {
      const wardName = wardAliases[aliasKey];
      const ward = wardsData.find((w) => w.name === wardName);
      if (ward) {
        setActiveWard(ward);
        setSearchLocation(null);
        setSearchStatus(`Showing: ${ward.name}`);
        return;
      }
    }

    // 3) Fallback to live geocoding (OpenStreetMap / Nominatim)
    try {
      setSearchStatus("Searching on the map…");

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchTerm
      )}&countrycodes=ke&limit=1`;

      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en",
        },
      });

      const data: any[] = await res.json();

      if (!data || data.length === 0) {
        setSearchStatus(
          "No match found. Try another estate, landmark, or street."
        );
        setSearchLocation(null);
        return;
      }

      const hit = data[0];
      const lat = parseFloat(hit.lat);
      const lng = parseFloat(hit.lon);
      const label: string = hit.display_name || searchTerm;

      setSearchLocation({ lat, lng, label });
      setSearchStatus(`Showing: ${label}`);

      if (mapInstance) {
        mapInstance.flyTo([lat, lng], 17, { duration: 1.2 });
      }
    } catch (err) {
      console.error("Geocode error:", err);
      setSearchStatus("Search failed. Check your internet and try again.");
      setSearchLocation(null);
    }
  }, [mapInstance, searchTerm]);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleLocate();
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/@${activeWard.center[0]},${activeWard.center[1]},17z`;
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${activeWard.center[0]},${activeWard.center[1]}`;

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
              placeholder="Search your hood (TRM, Seasons, Githurai 44, Zimmerman, Kahawa…)"
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2B27AB] focus:border-[#2B27AB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKey}
            />
            <button
              type="button"
              onClick={() => void handleLocate()}
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
              Streets Map
            </button>
            <button
              type="button"
              onClick={() => setBaseLayer("planning")}
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs border font-semibold transition ${
                baseLayer === "planning"
                  ? "bg-[#2B27AB] text-white border-[#2B27AB]"
                  : "bg-white text-[#2B27AB] border-[#2B27AB]/50 hover:bg-[#2B27AB]/10"
              }`}
            >
              Planning Map
            </button>
          </div>
        </div>

        {/* Status line under search */}
        {searchStatus && (
          <p className="mb-2 text-[11px] sm:text-xs text-gray-600">
            {searchStatus}
          </p>
        )}

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-[#2B27AB] bg-gray-100">
          <AnyMapContainer
            center={activeWard.center}
            zoom={activeWard.zoom}
            scrollWheelZoom={true}
            whenCreated={setMapInstance}
            className="absolute inset-0"
          >
            {/* Base layer switch – streets vs planning */}
            <AnyTileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={
                baseLayer === "streets"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              }
            />

            {/* Smoothly fly when ward changes */}
            <FlyToWard ward={activeWard} />

            {/* Ward center markers (anchor points) */}
            {wardsData.map((ward) => (
              <AnyMarker key={ward.name} position={ward.center} />
            ))}

            {/* Polling sites / Wi-Fi hubs */}
            {pollingSites
  .filter((site) => site.ward === activeWard.name)
  .map((site) => {
    // Use real coords if present, otherwise fall back to ward center
    const lat = site.lat ?? activeWard.center[0];
    const lng = site.lng ?? activeWard.center[1];

    const color =
      site.wifiPhase === 1
        ? "#EF4444" // red – pilot
        : site.wifiPhase === 2
        ? "#F59E0B" // amber – phase 2
        : "#22C55E"; // green – phase 3

    return (
      <AnyCircleMarker
        key={site.name}
        center={[lat, lng]}
        radius={8}
        pathOptions={{
          color,
          fillColor: color,
          fillOpacity: 0.9,
          weight: 2,
        }}
      >
        <AnyPopup>
          <div className="text-xs">
            <div className="font-semibold">{site.name}</div>
            <div className="text-[10px] text-gray-600">
              Ward: {site.ward}
            </div>
            <div className="mt-1">
              <span className="font-semibold">Wi-Fi Phase: </span>
              {site.wifiPhase === 1
                ? "Phase 1 – Pilot / high priority"
                : site.wifiPhase === 2
                ? "Phase 2 – Expansion"
                : "Phase 3 – Later rollout"}
            </div>
            <div className="text-[10px] mt-1">
              Type: {site.type === "ground" ? "Field / Ground" : site.type}
            </div>
            {site.lat === undefined && site.lng === undefined && (
              <div className="text-[9px] text-orange-600 mt-1">
                Approximate location (using ward center) – GPS to be refined.
              </div>
            )}
          </div>
        </AnyPopup>
      </AnyCircleMarker>
    );
  })}


            {/* Search hit marker */}
            {searchLocation && (
              <AnyCircleMarker
                center={[searchLocation.lat, searchLocation.lng]}
                radius={8}
                pathOptions={{
                  color: "#FF5722",
                  fillColor: "#FF5722",
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              />
            )}
          </AnyMapContainer>

          {/* Overlay helper text */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-black/45 px-3 py-1 text-[10px] sm:text-xs text-white font-medium">
              Pinch, zoom, and use search + ward buttons to explore the plan
              for your exact area.
            </span>
          </div>
        </div>

        {/* Ward chips BELOW the map — touch-friendly */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {wardsData.map((ward) => (
            <button
              key={ward.name}
              type="button"
              onClick={() => {
                setActiveWard(ward);
                setSearchLocation(null);
                setSearchStatus(`Showing: ${ward.name}`);
              }}
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

        {/* New: Wi-Fi roll-out summary */}
        <div className="mt-5 pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">
            Free Wi-Fi Plan – {activeWard.name}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Polling / community sites in this ward:{" "}
            <span className="font-semibold">{wardSites.length}</span>
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>
              <span className="inline-block w-2 h-2 rounded-full bg-[#EF4444] mr-2" />
              Phase 1 (Pilot): {phase1Count} sites
            </li>
            <li>
              <span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] mr-2" />
              Phase 2: {phase2Count} sites
            </li>
            <li>
              <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] mr-2" />
              Phase 3: {phase3Count} sites
            </li>
          </ul>
          <p className="text-[10px] text-gray-500 mt-1">
            Data source: IEBC polling stations via AfroData (CC BY 4.0).
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-[#2B27AB]/5 px-3 py-2 text-[11px] sm:text-xs text-gray-700">
          <span className="font-semibold text-[#2B27AB]">Note: </span>
          These are priority directions for planning and consultation. Final
          projects will be co-created with residents, youth groups, churches,
          and local businesses in each ward.
        </div>

        {/* External map links */}
        <div className="mt-4 flex flex-col gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-white bg-[#2B27AB] rounded-full px-4 py-2 text-center hover:bg-[#221f84] transition"
          >
            Open {activeWard.name} in Google Maps
          </a>
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-[#2B27AB] bg-white border border-[#2B27AB] rounded-full px-4 py-2 text-center hover:bg-[#2B27AB]/5 transition"
          >
            Street View for this ward
          </a>
        </div>
      </div>
    </div>
  );
};

export default WardMap;
