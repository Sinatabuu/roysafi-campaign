// src/components/MiniPolisScene.tsx
"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type District = {
  id: string;
  name: string;
  // Simple x/z position for now – later you can map from real coords
  position: [number, number, number];
  size: [number, number, number]; // width, height, depth
  color: string;
};

const districts: District[] = [
  {
    id: "trm",
    name: "TRM Smart City District",
    position: [0, 0, 0],
    size: [6, 0.5, 6],
    color: "#4caf50",
  },
  {
    id: "zimmerman",
    name: "Zimmerman Creative Market District",
    position: [10, 0, 0],
    size: [6, 0.5, 6],
    color: "#ff9800",
  },
  {
    id: "githurai",
    name: "Githurai Trade & Transit District",
    position: [-10, 0, 0],
    size: [6, 0.5, 6],
    color: "#2196f3",
  },
];

function DistrictBlock({ district }: { district: District }) {
  return (
    <group>
      <mesh position={district.position}>
        <boxGeometry args={district.size} />
        <meshStandardMaterial color={district.color} />
      </mesh>
      {/* District label */}
      <mesh position={[district.position[0], district.position[1] + 1, district.position[2]]}>
        <textGeometry args={[district.name, { size: 0.5, height: 0.05 }]} />
      </mesh>
    </group>
  );
}

export function MiniPolisScene() {
  const districtsMemo = useMemo(() => districts, []);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border">
      <Canvas camera={{ position: [0, 15, 25], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} />

        <Suspense fallback={null}>
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[60, 60]} />
            <meshStandardMaterial color="#222" />
          </mesh>

          {districtsMemo.map((d) => (
            <DistrictBlock key={d.id} district={d} />
          ))}

          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>
    </div>
  );
}
