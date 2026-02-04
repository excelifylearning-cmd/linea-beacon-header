import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string | number;
}

interface TabNavigationProps {
  tabs: TabItem[];
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TabNavigation = ({
  tabs,
  variant = "default",
  size = "md",
  className,
}: TabNavigationProps) => {
  const location = useLocation();

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "flex",
        variant === "underline" && "border-b border-border",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            to={tab.href}
            role="tab"
            aria-selected={active}
            className={cn(
              "relative flex items-center gap-2 font-medium transition-colors",
              sizeClasses[size],
              
              // Default variant
              variant === "default" && [
                "rounded-md",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              ],
              
              // Pills variant
              variant === "pills" && [
                "rounded-full",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              ],
              
              // Underline variant
              variant === "underline" && [
                "-mb-px",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ]
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{tab.label}</span>
            
            {tab.badge && (
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                  active
                    ? variant === "pills"
                      ? "bg-background/20 text-background"
                      : "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {tab.badge}
              </span>
            )}

            {/* Underline indicator */}
            {variant === "underline" && active && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

TabNavigation.displayName = "TabNavigation";

export default TabNavigation;
