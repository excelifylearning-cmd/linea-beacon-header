import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  ShoppingBag,
  Users,
  Gavel,
  FileText,
  HelpCircle,
  User,
  Settings,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAuth } from "@/hooks/use-auth";

interface CommandItem {
  icon: React.ElementType;
  label: string;
  href: string;
  keywords?: string[];
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigationItems: CommandItem[] = [
    { icon: Home, label: "Home", href: "/", keywords: ["home", "landing", "main"] },
    { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", keywords: ["shop", "browse", "gigs", "services"] },
    { icon: FileText, label: "How It Works", href: "/how-it-works", keywords: ["guide", "tutorial", "learn"] },
    { icon: Users, label: "Guilds", href: "/guilds", keywords: ["teams", "groups", "collaborate"] },
    { icon: Gavel, label: "Skill Court", href: "/court", keywords: ["dispute", "resolution", "judge"] },
    { icon: FileText, label: "Blog", href: "/blog", keywords: ["articles", "news", "posts"] },
    { icon: HelpCircle, label: "Help Center", href: "/help", keywords: ["support", "faq", "contact"] },
  ];

  const authItems: CommandItem[] = user
    ? [
        { icon: User, label: "My Profile", href: `/u/${user.id}`, keywords: ["account", "profile"] },
        { icon: Settings, label: "Settings", href: "/settings/profile", keywords: ["preferences", "account"] },
        { icon: ShoppingBag, label: "Dashboard", href: "/dashboard", keywords: ["orders", "gigs", "manage"] },
      ]
    : [
        { icon: LogIn, label: "Sign In", href: "/login", keywords: ["login", "authenticate"] },
        { icon: UserPlus, label: "Sign Up", href: "/signup", keywords: ["register", "create account"] },
      ];

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.label} ${item.keywords?.join(" ") || ""}`}
              onSelect={() => handleSelect(item.href)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={user ? "Account" : "Get Started"}>
          {authItems.map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.label} ${item.keywords?.join(" ") || ""}`}
              onSelect={() => handleSelect(item.href)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
