import React from "react";
import { AntiGravityCanvas } from "./particle-effect-for-hero";

export interface ZeroGravityBackgroundProps {
  className?: string;
}

export const ZeroGravityBackground: React.FC<ZeroGravityBackgroundProps> = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <AntiGravityCanvas isBackground={true} className="w-full h-full" />
    </div>
  );
};

export default ZeroGravityBackground;
