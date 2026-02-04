import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TickerProps {
  items: React.ReactNode[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

const speedValues = {
  slow: 40,
  normal: 25,
  fast: 15,
};

export const Ticker: React.FC<TickerProps> = ({
  items,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth / 2;
      const duration = containerWidth / speedValues[speed];
      setAnimationDuration(duration);
    }
  }, [items, speed]);

  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="flex w-max"
        style={{
          animation: `ticker ${animationDuration}s linear infinite`,
          animationDirection,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="shrink-0 px-4">
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

Ticker.displayName = "Ticker";

export default Ticker;
