import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  authRequired?: boolean;
}

const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: ShoppingBag, label: "Market", href: "/marketplace" },
    { icon: MessageSquare, label: "Messages", href: "/seller/messages", authRequired: true },
    { icon: User, label: "Profile", href: user ? "/dashboard" : "/login" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          // Skip auth-required items for non-authenticated users
          if (item.authRequired && !user) {
            return null;
          }

          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

MobileBottomNav.displayName = "MobileBottomNav";

export default MobileBottomNav;
