// src/app/minipolis/page.tsx
import { MiniPolisScene } from "@/components/MiniPolisScene";

export default function MiniPolisPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Roysambu Mini-Polis 2030</h1>
      <p className="text-gray-600">
        Explore a 3D concept of our future districts: TRM, Zimmerman, and Githurai.
      </p>
      <MiniPolisScene />
      {/* Below this, you can add district descriptions and sliders */}
    </main>
  );
}
