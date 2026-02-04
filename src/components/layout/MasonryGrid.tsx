import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const columnClasses = {
  2: "columns-1 sm:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
  4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 3,
  gap = "md",
  className,
}) => {
  return (
    <div
      className={cn(
        columnClasses[columns],
        gapClasses[gap],
        "[&>*]:mb-4 [&>*]:break-inside-avoid lg:[&>*]:mb-6",
        className
      )}
    >
      {children}
    </div>
  );
};

MasonryGrid.displayName = "MasonryGrid";

export default MasonryGrid;
