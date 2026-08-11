import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 38, showText = true }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* T + Travel Path Icon */}
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-2xl bg-emerald-600 shadow-md shadow-emerald-600/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-700 group-hover:shadow-lg group-hover:shadow-emerald-600/30"
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-3"
        >
          {/* Geometric T top crossbar */}
          <path
            d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5C21 7.32843 20.3284 8 19.5 8H4.5C3.67157 8 3 7.32843 3 6.5Z"
            fill="#FFFFFF"
          />
          {/* Curved Travel Path forming vertical stem of T and curling forward */}
          <path
            d="M12 6.5V14.5C12 16.7091 13.7909 18.5 16 18.5H19"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Destination waypoint pin dot */}
          <circle cx="19" cy="18.5" r="2" fill="#F59E0B" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
          TRAVERSE
        </span>
      )}
    </Link>
  );
}
