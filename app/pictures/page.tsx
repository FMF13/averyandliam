"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function PicturesPage() {
  const photos = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => `/pictures/photo-${i + 1}.jpg`),
    []
  );

  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setIndex((i) => (i + 1) % photos.length);

  // Keyboard arrows for desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  // Swipe support for phones
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX.current;
    const dx = endX - startX.current;
    const threshold = 40;

    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();

    startX.current = null;
  };

  const src = photos[index];

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-5xl sm:text-6xl font-cursive text-center">
          Pictures
        </h1>
        {/* <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
          Swipe on mobile, or use the arrows.
        </p> */}

        {/* Carousel */}
        <div
          className="mt-8 sm:mt-10 rounded-2xl border overflow-hidden shadow-sm bg-white"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[60vh] min-h-[360px] max-h-[700px] bg-gray-50 border-b">
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-contain p-4"
              priority
            />

            {/* Mobile overlay buttons */}
            <div className="md:hidden absolute inset-x-0 bottom-0 p-3 flex items-center justify-between">
              <button
                onClick={goPrev}
                className="rounded-full bg-white/90 backdrop-blur border px-4 py-2 text-sm active:scale-[0.98]"
                aria-label="Previous photo"
              >
                ← Prev
              </button>
              <button
                onClick={goNext}
                className="rounded-full bg-white/90 backdrop-blur border px-4 py-2 text-sm active:scale-[0.98]"
                aria-label="Next photo"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Dots + desktop buttons */}
          <div className="p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Photo {index + 1} of {photos.length}
              </div>

              <div className="hidden md:flex gap-3">
                <button
                  onClick={goPrev}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 active:scale-[0.98]"
                >
                  ← Prev
                </button>
                <button
                  onClick={goNext}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 active:scale-[0.98]"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Dots (scrollable on mobile) */}
            <div className="flex gap-2 overflow-x-auto py-1">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all flex-shrink-0 ${
                    i === index ? "bg-black w-7" : "bg-gray-300 w-2.5"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Helper */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold">Thank you for always being in my corner</p>
        </div>
      </div>
    </main>
  );
}
