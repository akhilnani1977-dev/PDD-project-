"use client";

import React, { useState } from "react";

interface TravelImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80";

export default function TravelImage({
  src,
  alt,
  className = "",
  fallbackSrc = DEFAULT_FALLBACK,
}: TravelImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          hasError ? "opacity-90 brightness-95" : "opacity-100"
        }`}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            if (fallbackSrc && fallbackSrc !== imgSrc) {
              setImgSrc(fallbackSrc);
            }
          }
        }}
      />
    </div>
  );
}
