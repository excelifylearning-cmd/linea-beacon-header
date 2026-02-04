import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "linear" | "segmented" | "gradient";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  segments?: number;
  className?: string;
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = "linear",
  size = "md",
  showValue = false,
  label,
  segments = 5,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  if (variant === "segmented") {
    const filledSegments = Math.round((percentage / 100) * segments);

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {value}/{max}
              </span>
            )}
          </div>
        )}
        <div className="flex gap-1">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-full transition-colors",
                sizeClasses[size],
                i < filledSegments ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-secondary",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            variant === "gradient"
              ? "bg-gradient-to-r from-primary/60 via-primary to-primary/80"
              : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
