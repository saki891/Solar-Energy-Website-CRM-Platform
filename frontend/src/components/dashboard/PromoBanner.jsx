import { Leaf } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl h-44 sm:h-52 bg-gradient-to-r from-forest-950 via-forest-800 to-leaf-600">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <circle cx="1000" cy="60" r="70" fill="#ffd98a" opacity="0.85" />
        <polygon points="0,300 0,190 220,140 460,175 700,120 940,165 1200,110 1200,300" fill="#0a3226" opacity="0.9" />
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={330 + col * 46}
              y={205 - row * 20}
              width="42"
              height="17"
              rx="1.5"
              fill="#123f2d"
              stroke="#1e9e5a"
              strokeWidth="1"
              opacity="0.9"
              transform="skewY(-6)"
            />
          ))
        )}
        <polygon points="150,300 150,240 190,225 190,300" fill="#0f4433" />
        <polygon points="900,300 900,255 950,235 950,300" fill="#0f4433" />
      </svg>

      <div className="relative h-full flex items-center justify-between px-6 sm:px-10">
        <div className="max-w-sm">
          <p className="text-white text-xl sm:text-2xl font-bold leading-snug">
            Together for a<br />Cleaner, Greener Tomorrow.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-white/90">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15">
            <Leaf className="w-4 h-4" />
          </span>
          <span className="font-bold tracking-tight">SOLARA</span>
        </div>
      </div>
    </div>
  );
}
