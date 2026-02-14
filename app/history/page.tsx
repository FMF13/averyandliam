"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  title: string;
  date?: string;
  text: string;
  imageSrc: string; // put images in /public/history and reference like "/history/slide-1.jpg"
};

export default function HistoryPage() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "The Beginning",
        date: "2022",
        text: "It all started with a spark, a connection that felt different from the rest. The early days were filled with excitement, discovery, and the magic of getting to know each other.",
        imageSrc: "/history/Year0.jpg",
      },
      {
        title: "Finding Our Rhythm",
        date: "2023",
        text: "A year of growing closer, learning each other, and creating memories that stuck.",
        imageSrc: "/history/Year1.jpg",
      },
      {
        title: "Big Moments",
        date: "2024",
        text: "We overcame milestones, challenges, went on trips, and had so many unforgettable moments that made us stronger.",
        imageSrc: "/history/Year2.jpg",
      },
      {
        title: "Building Together",
        date: "2025",
        text: "We built off eachoher and made eachother better people.",
        imageSrc: "/history/Year3.jpg",
      },
      {
        title: "Now & Beyond",
        date: "2026",
        text: "Here we are, continuing to grow and excited for the future",
        imageSrc: "/history/Year4.jpg",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  // Keyboard arrows for desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // Swipe support for phones
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX.current;
    const dx = endX - startX.current;
    const threshold = 40; // swipe sensitivity

    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();

    startX.current = null;
  };

  const slide = slides[index];

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-5xl sm:text-6xl font-cursive text-center">
          History
        </h1>
        {/* <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
          Swipe on mobile, or use the arrows.
        </p> */}

        {/* Carousel card */}
        <div
          className="mt-8 sm:mt-10 rounded-2xl border overflow-hidden shadow-sm bg-white"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Mobile: stack (image then text). Desktop: side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 sm:h-96 md:h-[520px] bg-gray-100">
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4"
                priority
              />

              {/* Mobile overlay buttons on image */}
              <div className="md:hidden absolute inset-x-0 bottom-0 p-3 flex items-center justify-between">
                <button
                  onClick={goPrev}
                  className="rounded-full bg-white/90 backdrop-blur border px-4 py-2 text-sm active:scale-[0.98]"
                  aria-label="Previous slide"
                >
                  ← Prev
                </button>
                <button
                  onClick={goNext}
                  className="rounded-full bg-white/90 backdrop-blur border px-4 py-2 text-sm active:scale-[0.98]"
                  aria-label="Next slide"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Text */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
                {slide.date ?? " "}
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
                {slide.title}
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
                {slide.text}
              </p>

              {/* Desktop controls */}
              <div className="mt-8 hidden md:flex items-center justify-between">
                <button
                  onClick={goPrev}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 active:scale-[0.98]"
                  aria-label="Previous slide"
                >
                  ← Prev
                </button>

                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        i === index ? "bg-black w-7" : "bg-gray-300 w-2.5"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 active:scale-[0.98]"
                  aria-label="Next slide"
                >
                  Next →
                </button>
              </div>

              {/* Mobile dots + counter */}
              <div className="mt-6 md:hidden flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        i === index ? "bg-black w-7" : "bg-gray-300 w-2.5"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Slide {index + 1} of {slides.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Helper text */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold">Thank you for all the time you've put into us</p>
        </div>
      </div>
    </main>
  );
}
