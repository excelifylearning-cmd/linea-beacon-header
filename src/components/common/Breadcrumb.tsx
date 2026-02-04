import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  separator?: "chevron" | "slash";
  className?: string;
}

/**
 * Auto-generates breadcrumbs from URL path, or accepts custom items
 */
const Breadcrumb = ({
  items,
  showHome = true,
  separator = "chevron",
  className,
}: BreadcrumbProps) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from path if no items provided
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbs(location.pathname);

  // Add home if needed
  const allItems = showHome
    ? [{ label: "Home", href: "/" }, ...breadcrumbItems]
    : breadcrumbItems;

  if (allItems.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center space-x-1 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = index === 0 && showHome;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground">
                  {separator === "chevron" ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    "/"
                  )}
                </span>
              )}

              {isLast ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {isHome ? <Home className="h-4 w-4" /> : item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                  )}
                >
                  {isHome ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              ) : (
                <span className="text-muted-foreground">
                  {isHome ? <Home className="h-4 w-4" /> : item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Generate breadcrumb items from a URL path
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return [];

  const pathLabels: Record<string, string> = {
    // Auth
    login: "Log In",
    signup: "Sign Up",
    "forgot-password": "Forgot Password",
    "reset-password": "Reset Password",
    "verify-email": "Verify Email",
    "2fa-setup": "Two-Factor Setup",
    onboarding: "Onboarding",

    // Marketplace
    marketplace: "Marketplace",
    gig: "Gig",
    "create-gig": "Create Gig",
    categories: "Categories",
    search: "Search",

    // Dashboards
    seller: "Seller Dashboard",
    buyer: "My Dashboard",
    admin: "Admin",
    dashboard: "Dashboard",
    analytics: "Analytics",
    gigs: "My Gigs",
    orders: "Orders",
    earnings: "Earnings",
    messages: "Messages",
    settings: "Settings",
    favorites: "Favorites",
    wallet: "Wallet",
    users: "Users",
    moderation: "Moderation",

    // Profile
    u: "Profile",
    profile: "Profile",
    portfolio: "Portfolio",

    // Guild
    guild: "Guild",
    guilds: "Guilds",
    "create-guild": "Create Guild",
    members: "Members",
    treasury: "Treasury",

    // Court
    court: "Skill Court",
    case: "Case",
    submit: "Submit Dispute",
    judge: "Judge",

    // Workspace
    workspace: "Workspace",
    chat: "Chat",
    whiteboard: "Whiteboard",
    files: "Files",
    call: "Call",

    // Marketing
    about: "About",
    team: "Team",
    careers: "Careers",
    pricing: "Pricing",
    features: "Features",
    "how-it-works": "How It Works",
    roadmap: "Roadmap",
    changelog: "Changelog",
    integrations: "Integrations",
    press: "Press Kit",
    events: "Events",
    partnerships: "Partnerships",
    enterprise: "Enterprise",
    testimonials: "Testimonials",

    // Help & Community
    help: "Help Center",
    docs: "Documentation",
    blog: "Blog",
    forums: "Forums",
    leaderboard: "Leaderboard",
    "success-stories": "Success Stories",

    // Legal
    terms: "Terms",
    privacy: "Privacy",
    cookies: "Cookies",
    guidelines: "Guidelines",
    gdpr: "GDPR",
    "refund-policy": "Refund Policy",

    // Status
    status: "Status",
    security: "Security",
    "bug-bounty": "Bug Bounty",

    // Transaction
    transaction: "Transaction Lookup",

    // Coming Soon
    "coming-soon": "Coming Soon",
  };

  return segments.map((segment, index) => {
    // Build the href from segments up to this point
    const href = "/" + segments.slice(0, index + 1).join("/");

    // Get label from mapping or format the segment
    const label =
      pathLabels[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
      label,
      href,
    };
  });
}

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
