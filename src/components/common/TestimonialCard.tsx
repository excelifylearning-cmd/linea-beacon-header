import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingDisplay from "./RatingDisplay";

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  rating?: number;
  variant?: "default" | "glass" | "featured";
  className?: string;
}

const variantClasses = {
  default: "bg-card",
  glass: "bg-card/50 backdrop-blur-sm border-border/50",
  featured: "bg-primary/5 border-primary/20",
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  author,
  rating,
  variant = "default",
  className,
}) => {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className={cn(variantClasses[variant], className)}>
      <CardContent className="p-6">
        <Quote className="mb-4 h-8 w-8 text-primary/30" />
        <p className="mb-6 text-foreground leading-relaxed">{content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{author.name}</p>
              {author.role && (
                <p className="text-sm text-muted-foreground">{author.role}</p>
              )}
            </div>
          </div>
          {rating && <RatingDisplay rating={rating} size="sm" showValue={false} />}
        </div>
      </CardContent>
    </Card>
  );
};

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
