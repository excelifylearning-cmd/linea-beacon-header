import { cn } from "@/lib/utils";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: "50-50" | "60-40" | "40-60" | "70-30" | "30-70";
  gap?: "none" | "sm" | "md" | "lg";
  reverseOnMobile?: boolean;
  stackOnMobile?: boolean;
  alignItems?: "start" | "center" | "end" | "stretch";
  className?: string;
}

const ratioClasses = {
  "50-50": "lg:grid-cols-2",
  "60-40": "lg:grid-cols-[1.5fr_1fr]",
  "40-60": "lg:grid-cols-[1fr_1.5fr]",
  "70-30": "lg:grid-cols-[2fr_1fr]",
  "30-70": "lg:grid-cols-[1fr_2fr]",
};

const gapClasses = {
  none: "gap-0",
  sm: "gap-4 lg:gap-6",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  ratio = "50-50",
  gap = "md",
  reverseOnMobile = false,
  stackOnMobile = true,
  alignItems = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "grid",
        stackOnMobile ? "grid-cols-1" : "grid-cols-2",
        ratioClasses[ratio],
        gapClasses[gap],
        alignClasses[alignItems],
        className
      )}
    >
      <div className={cn(reverseOnMobile && stackOnMobile && "order-2 lg:order-1")}>
        {left}
      </div>
      <div className={cn(reverseOnMobile && stackOnMobile && "order-1 lg:order-2")}>
        {right}
      </div>
    </div>
  );
};

SplitLayout.displayName = "SplitLayout";

export default SplitLayout;
