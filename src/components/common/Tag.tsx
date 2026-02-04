import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  default: "bg-muted text-muted-foreground hover:bg-muted/80",
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border text-foreground hover:bg-accent",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-base gap-2",
};

const removeButtonSizes = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  variant = "default",
  size = "md",
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label={`Remove ${label}`}
        >
          <X className={removeButtonSizes[size]} />
        </button>
      )}
    </span>
  );
};

Tag.displayName = "Tag";

export default Tag;
