"use client";

import { useEffect, useMemo, useState } from "react";

export default function ValentinesPage() {
  // Change this to your password
  const PASSWORD = "012122";

  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  // Optional: remember unlocked status for this browser
  useEffect(() => {
    const saved = localStorage.getItem("valentines_unlocked");
    if (saved === "true") setUnlocked(true);
  }, []);

  const note = useMemo(
    () => ({
      title: "Happy Valentine’s Day 💌",
      body: `Avery,

Happy Valentine’s Day! I made this for you to share some of my favorite memories and photos of us as I think me trying to make anything artsy would be horrible. Thank you for everything you have done for me. You changed me as a person and I am so greatful you are my person.  Thank you for all our laughs and all the times you try to annoy me, there are no dull moments with you.  I am so grateful to have you in my life and I can’t wait to see what the future holds for us.

Love,
Liam`,
    }),
    []
  );

  function tryUnlock() {
    if (input.trim() === PASSWORD) {
      setUnlocked(true);
      setError("");
      localStorage.setItem("valentines_unlocked", "true");
    } else {
      setError("Wrong password");
    }
  }

  function lockAgain() {
    setUnlocked(false);
    setInput("");
    setError("");
    localStorage.removeItem("valentines_unlocked");
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-cursive text-center">
          Valentine’s
        </h1>


        {!unlocked ? (
          <div className="mt-10 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Enter password</h2>
            

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              />
              <button
                onClick={tryUnlock}
                className="rounded-xl border px-5 py-3 hover:bg-gray-50 active:scale-[0.99]"
              >
                Unlock
              </button>
            </div>

            {error && (
              <div className="mt-3 text-sm text-red-600">{error}</div>
            )}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border bg-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-3xl font-cursive">{note.title}</h2>
              <button
                onClick={lockAgain}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Lock
              </button>
            </div>

            <div className="mt-6 whitespace-pre-line text-gray-800 leading-relaxed text-base sm:text-lg">
              {note.body}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
