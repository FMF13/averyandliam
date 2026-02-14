import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Left: Title */}
        <div className="text-center sm:text-left">
          <Link
            href="/"
            className="font-cursive text-2xl sm:text-3xl leading-none"
          >
            Avery & Liam
          </Link>
        </div>

        {/* Right: Nav */}
        <nav className="flex justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm tracking-wide">
          <Link
            href="/100"
            className="relative hover:opacity-80 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
          >
            100
          </Link>

          <Link
            href="/history"
            className="relative hover:opacity-80 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
          >
            History
          </Link>

          <Link
            href="/pictures"
            className="relative hover:opacity-80 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
          >
            Pictures
          </Link>

          <Link
            href="/valentines"
            className="relative hover:opacity-80 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
          >
            Valentines
          </Link>
        </nav>
      </div>
    </header>
  );
}
