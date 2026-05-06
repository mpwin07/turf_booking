import React, { useState } from "react";

export function SmartImage({ src, fallback, alt, className = "", ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => fallback && currentSrc !== fallback && setCurrentSrc(fallback)}
      {...props}
    />
  );
}
