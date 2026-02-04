import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg";
  stickyOffset?: number;
  className?: string;
}

const sidebarWidthClasses = {
  sm: "w-full md:w-56 lg:w-64",
  md: "w-full md:w-64 lg:w-72",
  lg: "w-full md:w-72 lg:w-80",
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  sidebar,
  sidebarPosition = "left",
  sidebarWidth = "md",
  stickyOffset = 80,
  className,
}) => {
  const sidebarContent = (
    <aside
      className={cn(
        "shrink-0",
        sidebarWidthClasses[sidebarWidth]
      )}
    >
      <div
        className="md:sticky"
        style={{ top: stickyOffset }}
      >
        {sidebar}
      </div>
    </aside>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-12",
        className
      )}
    >
      {sidebarPosition === "left" && sidebarContent}
      <main className="min-w-0 flex-1">{children}</main>
      {sidebarPosition === "right" && sidebarContent}
    </div>
  );
};

SidebarLayout.displayName = "SidebarLayout";

export default SidebarLayout;
