import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg";
  className?: string;
}

const sidebarWidthClasses = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  header,
  sidebarWidth = "md",
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-border bg-card lg:block",
          sidebarWidthClasses[sidebarWidth]
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto">{sidebar}</div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col overflow-y-auto">{sidebar}</div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={cn(
          "flex min-h-screen flex-col",
          `lg:pl-${sidebarWidth === "sm" ? "56" : sidebarWidth === "md" ? "64" : "72"}`
        )}
        style={{
          paddingLeft: `var(--sidebar-width-${sidebarWidth}, 0)`,
        }}
      >
        {/* Header */}
        {header && (
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            {header}
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      <style>{`
        :root {
          --sidebar-width-sm: 14rem;
          --sidebar-width-md: 16rem;
          --sidebar-width-lg: 18rem;
        }
        @media (min-width: 1024px) {
          .lg\\:pl-56 { padding-left: var(--sidebar-width-sm); }
          .lg\\:pl-64 { padding-left: var(--sidebar-width-md); }
          .lg\\:pl-72 { padding-left: var(--sidebar-width-lg); }
        }
      `}</style>
    </div>
  );
};

DashboardLayout.displayName = "DashboardLayout";

export default DashboardLayout;
