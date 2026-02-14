"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PinKey =
  | "Toronto"
  | "Ottawa"
  | "Quebec City"
  | "New York City"
  | "Detroit";

type Pin = { name: PinKey; x: number; y: number };

const PINS: Pin[] = [
  { name: "Toronto", x: 28.1, y: 25.3 },
  { name: "Ottawa", x: 28.8, y: 24.8 },
  { name: "Quebec City", x: 30.1, y: 23.9 },
  { name: "New York City", x: 29.5, y: 27.0 },
  { name: "Detroit", x: 27.0, y: 26.1 },
];

export default function HundredPage() {
  const [activePin, setActivePin] = useState<PinKey | null>(null);

  // Close label when clicking elsewhere (mobile friendly)
  useEffect(() => {
    const close = () => setActivePin(null);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-5xl sm:text-6xl font-cursive text-center">Places we've been</h1>
        {/* <p className="mt-3 text-center text-gray-600">
          Places we’ve been — tap a pin on mobile, hover on desktop.
        </p> */}

        <div className="mt-10 rounded-2xl border bg-white p-3 sm:p-6 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-xl border bg-gray-50">
            {/* Keep container 2:1 to match your SVG */}
            <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
              <Image
                src="/world.svg"
                alt="World map"
                fill
                className="object-contain"
                priority
              />

              {/* Pins */}
              {PINS.map((pin) => {
                const isActive = activePin === pin.name;

                return (
                  <button
                    key={pin.name}
                    className="absolute"
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePin((p) =>
                        p === pin.name ? null : pin.name
                      );
                    }}
                    onMouseEnter={() => setActivePin(pin.name)}
                    onMouseLeave={() =>
                      setActivePin((p) => (p === pin.name ? null : p))
                    }
                    aria-label={pin.name}
                  >
                    <span className="relative block">
                      {/* Pin dot */}
                      <span className="block h-3 w-3 rounded-full bg-red-600 border-2 border-white shadow" />

                      {/* Label */}
                      {isActive && (
                        <span
                          className="
                            absolute left-1/2 top-0
                            -translate-x-1/2 -translate-y-[135%]
                            whitespace-nowrap rounded-md
                            bg-white/95 backdrop-blur
                            px-2 py-1 text-[11px] text-gray-900
                            border shadow-sm
                          "
                        >
                          {pin.name}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-600">
        <p className="font-semibold">Thank you for all our adventures</p>
        </div>
      </div>
    </main>
  );
}
