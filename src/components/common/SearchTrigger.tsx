import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SearchTriggerProps {
  className?: string;
}

const SearchTrigger = ({ className }: SearchTriggerProps) => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const handleClick = () => {
    // Trigger the command palette
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleClick}
      aria-label="Open search"
    >
      <Search className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline-flex">Search</span>
      <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
      </kbd>
    </Button>
  );
};

SearchTrigger.displayName = "SearchTrigger";

export default SearchTrigger;
