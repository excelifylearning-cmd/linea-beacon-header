import { BadgeCheck, Crown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerifiedAvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  verificationTier?: "none" | "basic" | "pro" | "enterprise";
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const badgeSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const badgePositions = {
  sm: "-bottom-0.5 -right-0.5",
  md: "-bottom-0.5 -right-0.5",
  lg: "-bottom-1 -right-1",
  xl: "-bottom-1 -right-1",
};

const onlinePositions = {
  sm: "bottom-0 right-0",
  md: "bottom-0 right-0",
  lg: "bottom-0.5 right-0.5",
  xl: "bottom-1 right-1",
};

const onlineSizes = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

const verificationIcons = {
  basic: BadgeCheck,
  pro: Shield,
  enterprise: Crown,
};

const verificationColors = {
  basic: "text-blue-500",
  pro: "text-primary",
  enterprise: "text-yellow-500",
};

const verificationLabels = {
  basic: "Verified User",
  pro: "Pro Verified",
  enterprise: "Enterprise Verified",
};

export const VerifiedAvatar: React.FC<VerifiedAvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  verificationTier = "none",
  isOnline,
  className,
}) => {
  const initials =
    fallback ||
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const BadgeIcon = verificationTier !== "none" ? verificationIcons[verificationTier] : null;

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {BadgeIcon && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "absolute flex items-center justify-center rounded-full bg-background",
                  badgePositions[size]
                )}
              >
                <BadgeIcon
                  className={cn(
                    badgeSizes[size],
                    verificationColors[verificationTier]
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">{verificationLabels[verificationTier]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {isOnline && (
        <span
          className={cn(
            "absolute rounded-full bg-primary ring-2 ring-background",
            onlinePositions[size],
            onlineSizes[size]
          )}
          aria-label="Online"
        />
      )}
    </div>
  );
};

VerifiedAvatar.displayName = "VerifiedAvatar";

export default VerifiedAvatar;
