import React from "react";

interface FocusTextProps {
  text: string;
  className?: string;
}

/**
 * FocusText
 * Optical focus lens effect: seamlessly sharpens text as a soft feathered
 * focus beam sweeps across the letters, with zero harsh rectangular boxes or borders.
 */
export const FocusText: React.FC<FocusTextProps> = ({
  text,
  className = "",
}) => {
  return (
    <span className={`focus-lens-container focus ${className}`}>
      {/* Soft ambient glowing focus beam (blurred, non-rectangular, transparent) */}
      <span className="focus-lens-glow" aria-hidden="true" />

      {/* Layer 1: Ambient blurred base text */}
      <span className="focus-lens-blurred focus-base" aria-hidden="true">
        {text}
      </span>

      {/* Layer 2: Crystal sharp text revealed through a seamless feathered mask */}
      <span className="focus-lens-sharp focus--mask" aria-hidden="true">
        {text}
      </span>
    </span>
  );
};

export default FocusText;
