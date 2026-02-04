import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Layers,
  Users,
  Gavel,
  DollarSign,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  HelpCircle,
  FileText,
  Trophy,
  MessageSquare,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MobileDrawerProps {
  trigger: React.ReactNode;
}

interface NavSection {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    href: string;
    badge?: string;
    authRequired?: boolean;
  }[];
}

const MobileDrawer = ({ trigger }: MobileDrawerProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  const handleNavigation = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navSections: NavSection[] = [
    {
      title: "Main",
      items: [
        { icon: Home, label: "Home", href: "/" },
        { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
        { icon: Layers, label: "Categories", href: "/categories" },
      ],
    },
    {
      title: "Features",
      items: [
        { icon: Gavel, label: "Skill Court", href: "/court" },
        { icon: Users, label: "Guilds", href: "/guilds" },
        { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
      ],
    },
    {
      title: "Resources",
      items: [
        { icon: FileText, label: "How It Works", href: "/how-it-works" },
        { icon: DollarSign, label: "Pricing", href: "/pricing" },
        { icon: HelpCircle, label: "Help Center", href: "/help" },
        { icon: MessageSquare, label: "Blog", href: "/blog" },
      ],
    },
  ];

  const userSection: NavSection = {
    title: "Account",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", authRequired: true },
      { icon: User, label: "My Profile", href: `/u/${profile?.username || user?.id}`, authRequired: true },
      { icon: Settings, label: "Settings", href: "/settings/profile", authRequired: true },
    ],
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="font-display text-lg font-bold text-background">S</span>
            </div>
            <span className="font-display text-lg font-bold">Skill Swappr</span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-6">
            {/* User Profile Section */}
            {user ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-secondary">
                    {getInitials(profile?.display_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {profile?.display_name || "User"}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleNavigation("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleNavigation("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            <Separator />

            {/* Navigation Sections */}
            {navSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                          active
                            ? "bg-secondary text-foreground font-medium"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* User Account Section */}
            {user && (
              <>
                <Separator />
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {userSection.title}
                  </h4>
                  <div className="space-y-1">
                    {userSection.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <button
                          key={item.href}
                          onClick={() => handleNavigation(item.href)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                            active
                              ? "bg-secondary text-foreground font-medium"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      );
                    })}

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-5 w-5 shrink-0" />
                      <span className="flex-1 text-left">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

MobileDrawer.displayName = "MobileDrawer";

export default MobileDrawer;
