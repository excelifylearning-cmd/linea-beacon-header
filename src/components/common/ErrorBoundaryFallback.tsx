import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetError?: () => void;
  variant?: "page" | "section" | "inline";
  className?: string;
}

export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  resetError,
  variant = "section",
  className,
}) => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
          className
        )}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>Something went wrong</span>
        {resetError && (
          <button
            onClick={resetError}
            className="ml-2 underline underline-offset-2 hover:no-underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div
        className={cn(
          "flex min-h-[80vh] flex-col items-center justify-center px-4",
          className
        )}
      >
        <div className="mb-6 rounded-full bg-destructive/10 p-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="mb-8 max-w-md text-center text-muted-foreground">
          We're sorry, but something unexpected happened. Please try again or
          return to the homepage.
        </p>
        {error && (
          <pre className="mb-6 max-w-lg overflow-auto rounded-lg bg-muted p-4 text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
        <div className="flex gap-3">
          {resetError && (
            <Button onClick={resetError}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button variant="outline" onClick={handleGoHome}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 rounded-full bg-destructive/10 p-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <CardTitle className="text-xl">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          An error occurred while loading this section. Please try again.
        </p>
        {error && (
          <pre className="mt-4 overflow-auto rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
      </CardContent>
      <CardFooter className="justify-center gap-3">
        {resetError && (
          <Button size="sm" onClick={resetError}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

ErrorBoundaryFallback.displayName = "ErrorBoundaryFallback";

export default ErrorBoundaryFallback;
