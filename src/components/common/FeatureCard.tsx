import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  variant?: "default" | "glass" | "elevated" | "highlighted";
  className?: string;
  children?: React.ReactNode;
}

const variantClasses = {
  default: "bg-card hover:bg-accent/50 transition-colors",
  glass: "bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors",
  elevated: "bg-card shadow-lg hover:shadow-xl transition-shadow",
  highlighted: "bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors",
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  variant = "default",
  className,
  children,
}) => {
  return (
    <Card className={cn(variantClasses[variant], className)}>
      <CardHeader className="pb-2">
        {Icon && (
          <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 w-fit">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {children}
      </CardContent>
    </Card>
  );
};

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
