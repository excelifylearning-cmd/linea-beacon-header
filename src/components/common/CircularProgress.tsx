import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
  variant?: "default" | "gradient";
  className?: string;
}

const sizeValues = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 120,
};

const textSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
};

const labelSizes = {
  sm: "text-[8px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm",
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = "md",
  strokeWidth = 4,
  showValue = true,
  label,
  variant = "default",
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const sizePx = sizeValues[size];
  const radius = (sizePx - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const gradientId = `circular-progress-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: sizePx, height: sizePx }}
    >
      <svg
        width={sizePx}
        height={sizePx}
        className="-rotate-90 transform"
      >
        {variant === "gradient" && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.6)" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
            </linearGradient>
          </defs>
        )}
        {/* Background circle */}
        <circle
          cx={sizePx / 2}
          cy={sizePx / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={sizePx / 2}
          cy={sizePx / 2}
          r={radius}
          fill="none"
          stroke={variant === "gradient" ? `url(#${gradientId})` : "hsl(var(--primary))"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-foreground", textSizes[size])}>
            {percentage.toFixed(0)}%
          </span>
          {label && (
            <span className={cn("text-muted-foreground", labelSizes[size])}>
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

CircularProgress.displayName = "CircularProgress";

export default CircularProgress;
