import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  variant?: "stars" | "elo" | "percentage";
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  showCount = false,
  count = 0,
  variant = "stars",
  className,
}) => {
  if (variant === "elo") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <div className="flex items-center justify-center rounded-md bg-primary/10 px-2 py-1">
          <span className={cn("font-mono font-bold text-primary", textSizeClasses[size])}>
            {Math.round(rating)}
          </span>
        </div>
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>ELO</span>
      </div>
    );
  }

  if (variant === "percentage") {
    const percentage = Math.min(100, Math.max(0, rating));
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative h-2 w-20 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={cn("font-medium text-foreground", textSizeClasses[size])}>
          {percentage.toFixed(0)}%
        </span>
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], "fill-primary text-primary")}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={cn(sizeClasses[size], "fill-primary text-primary")}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-muted-foreground/30")}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("font-medium text-foreground", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {showCount && count > 0 && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

RatingDisplay.displayName = "RatingDisplay";

export default RatingDisplay;
