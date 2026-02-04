import { useState, useEffect, useRef } from "react";
import { useSpring, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

/**
 * Number Counter Animation Hooks
 * Module 1.3.9: Animated number counters
 */

// ========================================
// USE COUNTER (Basic)
// ========================================

interface UseCounterOptions {
  /** Starting value */
  from?: number;
  /** Target value */
  to: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay before starting in seconds */
  delay?: number;
  /** Easing function */
  ease?: string;
  /** Whether to start automatically */
  autoStart?: boolean;
  /** Decimal places to show */
  decimals?: number;
  /** Number formatting locale */
  locale?: string;
}

interface UseCounterReturn {
  value: number;
  formattedValue: string;
  isAnimating: boolean;
  start: () => void;
  reset: () => void;
}

export const useCounter = (options: UseCounterOptions): UseCounterReturn => {
  const {
    from = 0,
    to,
    duration = 2,
    delay = 0,
    autoStart = true,
    decimals = 0,
    locale = "en-US"
  } = options;

  const [value, setValue] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const formatNumber = (num: number): string => {
    return num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const start = () => {
    setIsAnimating(true);
    
    const motionValue = useMotionValue(from);
    
    controlsRef.current = animate(motionValue, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setValue(latest);
      },
      onComplete: () => {
        setIsAnimating(false);
      }
    });
  };

  const reset = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
    }
    setValue(from);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        start();
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay]);

  return {
    value,
    formattedValue: formatNumber(value),
    isAnimating,
    start,
    reset
  };
};

// ========================================
// USE SPRING COUNTER
// ========================================

interface UseSpringCounterOptions {
  /** Target value */
  value: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Decimal places */
  decimals?: number;
  /** Number formatting locale */
  locale?: string;
}

interface UseSpringCounterReturn {
  displayValue: MotionValue<number>;
  formattedValue: string;
}

export const useSpringCounter = (options: UseSpringCounterOptions): UseSpringCounterReturn => {
  const {
    value,
    stiffness = 100,
    damping = 30,
    decimals = 0,
    locale = "en-US"
  } = options;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness, damping });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return {
    displayValue: springValue,
    formattedValue: formatNumber(displayValue)
  };
};

// ========================================
// USE COUNTING ANIMATION (with scroll trigger)
// ========================================

interface UseCountingAnimationOptions {
  /** End value */
  end: number;
  /** Start value */
  start?: number;
  /** Duration in seconds */
  duration?: number;
  /** Start on scroll into view */
  startOnView?: boolean;
  /** Decimal places */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "%", "K", "M") */
  suffix?: string;
  /** Number formatting locale */
  locale?: string;
}

interface UseCountingAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  value: number;
  formattedValue: string;
  isComplete: boolean;
}

export const useCountingAnimation = (
  options: UseCountingAnimationOptions
): UseCountingAnimationReturn => {
  const {
    end,
    start = 0,
    duration = 2,
    startOnView = true,
    decimals = 0,
    prefix = "",
    suffix = "",
    locale = "en-US"
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now();
          const endTime = startTime + duration * 1000;
          
          const tick = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            
            // Ease out quad
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easeProgress;
            
            setValue(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(end);
              setIsComplete(true);
            }
          };
          
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, start, duration, startOnView, hasStarted]);

  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    ref,
    value,
    formattedValue: formatNumber(value),
    isComplete
  };
};

// ========================================
// USE PERCENTAGE COUNTER
// ========================================

interface UsePercentageCounterOptions {
  /** Target percentage (0-100) */
  percentage: number;
  /** Duration in seconds */
  duration?: number;
  /** Start on scroll into view */
  startOnView?: boolean;
}

interface UsePercentageCounterReturn {
  ref: React.RefObject<HTMLElement>;
  value: number;
  formattedValue: string;
  isComplete: boolean;
}

export const usePercentageCounter = (
  options: UsePercentageCounterOptions
): UsePercentageCounterReturn => {
  const { percentage, duration = 1.5, startOnView = true } = options;
  
  const result = useCountingAnimation({
    end: percentage,
    start: 0,
    duration,
    startOnView,
    decimals: 0,
    suffix: "%"
  });

  return result;
};

// ========================================
// USE CURRENCY COUNTER
// ========================================

interface UseCurrencyCounterOptions {
  /** Amount value */
  amount: number;
  /** Currency code */
  currency?: string;
  /** Duration in seconds */
  duration?: number;
  /** Start on scroll into view */
  startOnView?: boolean;
  /** Locale for formatting */
  locale?: string;
}

interface UseCurrencyCounterReturn {
  ref: React.RefObject<HTMLElement>;
  value: number;
  formattedValue: string;
  isComplete: boolean;
}

export const useCurrencyCounter = (
  options: UseCurrencyCounterOptions
): UseCurrencyCounterReturn => {
  const {
    amount,
    currency = "USD",
    duration = 2,
    startOnView = true,
    locale = "en-US"
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now();
          const endTime = startTime + duration * 1000;
          
          const tick = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = amount * easeProgress;
            
            setValue(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(amount);
              setIsComplete(true);
            }
          };
          
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [amount, duration, startOnView, hasStarted]);

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return {
    ref,
    value,
    formattedValue: formatCurrency(value),
    isComplete
  };
};

// ========================================
// USE ABBREVIATED COUNTER (K, M, B)
// ========================================

interface UseAbbreviatedCounterOptions {
  /** Target value */
  value: number;
  /** Duration in seconds */
  duration?: number;
  /** Start on scroll into view */
  startOnView?: boolean;
  /** Decimal places for abbreviated values */
  decimals?: number;
}

interface UseAbbreviatedCounterReturn {
  ref: React.RefObject<HTMLElement>;
  rawValue: number;
  formattedValue: string;
  isComplete: boolean;
}

export const useAbbreviatedCounter = (
  options: UseAbbreviatedCounterOptions
): UseAbbreviatedCounterReturn => {
  const {
    value: targetValue,
    duration = 2,
    startOnView = true,
    decimals = 1
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now();
          
          const tick = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = targetValue * easeProgress;
            
            setValue(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(targetValue);
              setIsComplete(true);
            }
          };
          
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, startOnView, hasStarted]);

  const formatAbbreviated = (num: number): string => {
    const absNum = Math.abs(num);
    const sign = num < 0 ? "-" : "";
    
    if (absNum >= 1e9) {
      return `${sign}${(absNum / 1e9).toFixed(decimals)}B`;
    }
    if (absNum >= 1e6) {
      return `${sign}${(absNum / 1e6).toFixed(decimals)}M`;
    }
    if (absNum >= 1e3) {
      return `${sign}${(absNum / 1e3).toFixed(decimals)}K`;
    }
    return `${sign}${absNum.toFixed(0)}`;
  };

  return {
    ref,
    rawValue: value,
    formattedValue: formatAbbreviated(value),
    isComplete
  };
};
