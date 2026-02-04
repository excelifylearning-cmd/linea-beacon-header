import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "full-bleed" | "contained" | "narrow";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "accent" | "gradient";
  className?: string;
  id?: string;
}

const variantClasses = {
  "full-bleed": "w-full",
  contained: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  narrow: "max-w-3xl mx-auto px-4 sm:px-6",
};

const paddingClasses = {
  none: "",
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/10",
  gradient: "bg-gradient-to-b from-background to-muted/30",
};

export const Section: React.FC<SectionProps> = ({
  children,
  variant = "contained",
  padding = "lg",
  background = "default",
  className,
  id,
}) => {
  if (variant === "full-bleed") {
    return (
      <section
        id={id}
        className={cn(backgroundClasses[background], paddingClasses[padding], className)}
      >
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(backgroundClasses[background], paddingClasses[padding])}
    >
      <div className={cn(variantClasses[variant], className)}>{children}</div>
    </section>
  );
};

Section.displayName = "Section";

export default Section;
