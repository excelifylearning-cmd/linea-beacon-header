import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  className,
}: StepperProps) => {
  const isClickable = !!onStepClick;

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-center" : "flex-col",
        className
      )}
      role="navigation"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "flex-1 items-center"
                : "items-start"
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                "flex items-center",
                orientation === "vertical" && "flex-col"
              )}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-medium transition-colors",
                  isCompleted &&
                    "border-foreground bg-foreground text-background",
                  isCurrent &&
                    "border-foreground bg-background text-foreground",
                  !isCompleted &&
                    !isCurrent &&
                    "border-muted-foreground/30 bg-background text-muted-foreground",
                  isClickable && "cursor-pointer hover:border-foreground/70"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              {/* Labels for vertical orientation */}
              {orientation === "vertical" && (
                <div className="ml-4 min-h-[4rem] pb-8">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={cn(
                  orientation === "horizontal"
                    ? "h-0.5 flex-1 mx-4"
                    : "w-0.5 h-full ml-5 -mt-2",
                  isCompleted ? "bg-foreground" : "bg-muted-foreground/30"
                )}
              />
            )}

            {/* Labels for horizontal orientation */}
            {orientation === "horizontal" && (
              <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    isCurrent || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

Stepper.displayName = "Stepper";

export default Stepper;
