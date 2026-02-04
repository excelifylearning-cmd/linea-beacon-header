import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  variant?: "default" | "compact" | "large";
  showLabels?: boolean;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - Date.now();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const variantClasses = {
  default: {
    container: "gap-3",
    box: "min-w-[60px] p-3 rounded-lg bg-card border border-border",
    number: "text-2xl font-bold text-foreground",
    label: "text-xs text-muted-foreground uppercase tracking-wider",
  },
  compact: {
    container: "gap-1",
    box: "min-w-[40px] p-2 rounded-md bg-card border border-border",
    number: "text-lg font-bold text-foreground",
    label: "text-[10px] text-muted-foreground uppercase",
  },
  large: {
    container: "gap-4",
    box: "min-w-[80px] p-4 rounded-xl bg-card border border-border shadow-sm",
    number: "text-4xl font-bold text-foreground",
    label: "text-sm text-muted-foreground uppercase tracking-wider",
  },
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  variant = "default",
  showLabels = true,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const styles = variantClasses[variant];

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className={cn("flex flex-col items-center", styles.box)}>
      <span className={styles.number}>{value.toString().padStart(2, "0")}</span>
      {showLabels && <span className={styles.label}>{label}</span>}
    </div>
  );

  if (isComplete) {
    return (
      <div className={cn("text-center", className)}>
        <span className="text-lg font-medium text-primary">Time's up!</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", styles.container, className)}>
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-muted-foreground">:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-muted-foreground">:</span>
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-muted-foreground">:</span>
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

CountdownTimer.displayName = "CountdownTimer";

export default CountdownTimer;
