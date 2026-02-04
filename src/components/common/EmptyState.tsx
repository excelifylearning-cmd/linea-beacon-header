import { LucideIcon, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "minimal" | "illustrated";
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  variant = "default",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        variant === "minimal" ? "py-8" : "py-16",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 rounded-full",
          variant === "illustrated"
            ? "bg-primary/10 p-6"
            : variant === "minimal"
            ? "p-2"
            : "bg-muted p-4"
        )}
      >
        <Icon
          className={cn(
            "text-muted-foreground",
            variant === "illustrated"
              ? "h-12 w-12 text-primary"
              : variant === "minimal"
              ? "h-8 w-8"
              : "h-10 w-10"
          )}
        />
      </div>
      <h3
        className={cn(
          "font-semibold text-foreground",
          variant === "minimal" ? "text-base" : "text-lg"
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "mt-2 text-muted-foreground",
            variant === "minimal" ? "text-sm max-w-xs" : "text-sm max-w-md"
          )}
        >
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {action && (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";

export default EmptyState;
