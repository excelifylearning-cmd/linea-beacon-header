import { cn } from "@/lib/utils";
import { LucideIcon, Circle } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: LucideIcon;
  status?: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: "vertical" | "horizontal";
  className?: string;
}

const statusColors = {
  completed: "bg-primary text-primary-foreground",
  current: "bg-primary text-primary-foreground ring-4 ring-primary/20",
  upcoming: "bg-muted text-muted-foreground",
};

const lineColors = {
  completed: "bg-primary",
  current: "bg-primary",
  upcoming: "bg-border",
};

export const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = "vertical",
  className,
}) => {
  if (variant === "horizontal") {
    return (
      <div className={cn("flex items-start justify-between", className)}>
        {items.map((item, index) => {
          const Icon = item.icon || Circle;
          const status = item.status || "upcoming";
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    statusColors[status]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      lineColors[status]
                    )}
                  />
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="font-medium text-foreground">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
                {item.date && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {items.map((item, index) => {
        const Icon = item.icon || Circle;
        const status = item.status || "upcoming";
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  statusColors[status]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-2",
                    lineColors[status]
                  )}
                />
              )}
            </div>
            <div className={cn("pb-8", isLast && "pb-0")}>
              <p className="font-medium text-foreground">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
              {item.date && (
                <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Timeline.displayName = "Timeline";

export default Timeline;
