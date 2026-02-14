"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `relative pb-0.5 transition-colors ${
      pathname === path ? "text-black" : "text-gray-700 hover:text-black"
    }
    after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black
    after:transition-all after:duration-300
    ${pathname === path ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <header className="w-full border-b bg-white">
      <div
        className="
          px-4 sm:px-8
          py-4 sm:py-6
          flex flex-col sm:flex-row        /* ← CHANGE #1 */
          items-center
          gap-3 sm:gap-0                  /* ← CHANGE #2 */
          sm:justify-between
        "
      >
        {/* Left: Name */}
        <Link
          href="/"
          className="
            font-cursive
            text-2xl sm:text-3xl
            leading-none
            whitespace-nowrap
          "
        >
          Avery & Liam
        </Link>

        {/* Right: Navigation */}
        <nav
          className="
            flex flex-wrap sm:flex-nowrap   /* ← CHANGE #3 */
            justify-center sm:justify-end
            items-center
            gap-4 sm:gap-6 md:gap-10
            text-[11px] sm:text-xs md:text-sm
            uppercase
            tracking-normal sm:tracking-wide md:tracking-widest
          "
        >
          <Link href="/valentines" className={linkClass("/valentines")}>
            Valentine's
          </Link>
          <Link href="/places" className={linkClass("/places")}>
            Places
          </Link>
          <Link href="/history" className={linkClass("/history")}>
            History
          </Link>
          <Link href="/pictures" className={linkClass("/pictures")}>
            Pictures
          </Link>
        </nav>
      </div>
    </header>
  );
}
