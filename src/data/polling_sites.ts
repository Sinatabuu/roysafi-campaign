// src/data/polling_sites.ts
export type WifiPhase = 1 | 2 | 3;
// 1 = Pilot / highest priority
// 2 = Phase 2 rollout
// 3 = Later / infill

export type PollingSite = {
  name: string;
  id?: string;
  ward: string; // must match your Ward.name in WardMap
  type: "school" | "church" | "ground" | "estate" | "other";
  wifiPhase: WifiPhase;
  description?: string;
  position?: [number, number];      // [lat, lng]
  // Coordinates are optional – add as you collect them.
  lat?: number;
  lng?: number;
};

// ⚠️ NOTE:
// Names + wards come from AfroData “Polling Stations in Roysambu Constituency”,
// which itself is based on IEBC data (CC BY 4.0).
// Coords below are partial: a few are filled from school datasets;
// the rest you can add gradually by looking them up in Google Maps / OSM.

export const pollingSites: PollingSite[] = [
  // ========= GITHURAI WARD =========
  {
    name: "Wonderland Integrated Academy",
    ward: "Githurai Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Githurai Sports Ground",
    ward: "Githurai Ward",
    type: "ground",
    wifiPhase: 1, // Pilot hub: high-traffic public space
  },
  {
    name: "Githurai Primary School",
    ward: "Githurai Ward",
    type: "school",
    wifiPhase: 1,
    // From Kenya Primary Schools directory:
    // lat -1.199536, lng 36.911508
    lat: -1.199536,
    lng: 36.911508,
  },

  // ========= KAHAWA WEST WARD =========
  {
    name: "Kba School",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Mahiga Primary School",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Kamiti Primary School",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Vendramini Educational Centre",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 3,
  },
  {
    name: "Kiwanja Primary School",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Kenyatta University Primary School",
    ward: "Kahawa West Ward",
    type: "school",
    wifiPhase: 3,
  },

  // ========= ZIMMERMAN =========
  {
    name: "Roysambu Primary School",
    ward: "Zimmerman",
    type: "school",
    wifiPhase: 1,
    // From Kenya Primary Schools directory:
    // lat -1.204048, lng 36.896483
    lat: -1.204048,
    lng: 36.896483,
  },
  {
    name: "Cornerstone Academy",
    ward: "Zimmerman",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Njathaini Primary School",
    ward: "Zimmerman",
    type: "school",
    wifiPhase: 3,
  },

  // ========= ROYSAMBU WARD =========
  {
    name: "Muthaiga Primary School",
    ward: "Roysambu Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Thika Road Primary School",
    ward: "Roysambu Ward",
    type: "school",
    wifiPhase: 1, // Pilot: along a major corridor
  },
  {
    name: "Garden Estate Primary School",
    ward: "Roysambu Ward",
    type: "school",
    wifiPhase: 1,
    // From AfroData school dataset:
    // lat -1.22657, lng 36.86615
    lat: -1.22657,
    lng: 36.86615,
  },
  {
    name: "Marurui Primary School",
    ward: "Roysambu Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Independent Presbyterian Church Compound",
    ward: "Roysambu Ward",
    type: "church",
    wifiPhase: 3,
  },

  // ========= KAHAWA WARD =========
  {
    name: "Green Angels Academy",
    ward: "Kahawa Ward",
    type: "school",
    wifiPhase: 2,
  },
  {
    name: "Kamuthi Housing Cooperative Society",
    ward: "Kahawa Ward",
    type: "estate",
    wifiPhase: 1, // Pilot: dense residential / business
  },
  {
    name: "Kahawa West Primary School",
    ward: "Kahawa Ward",
    type: "school",
    wifiPhase: 1,
  },
];
