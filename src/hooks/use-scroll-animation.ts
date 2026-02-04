import { useRef, useEffect, useState, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * Scroll Animation Hooks
 * Module 1.3.2: Scroll-triggered animation hooks
 */

// ========================================
// USE SCROLL IN VIEW
// ========================================

interface UseScrollInViewOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export const useScrollInView = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollInViewOptions = {}
): [RefObject<T>, boolean] => {
  const { threshold = 0.1, once = true, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, isInView];
};

// ========================================
// USE SCROLL PROGRESS
// ========================================

export const useScrollProgress = <T extends HTMLElement = HTMLDivElement>(): [RefObject<T>, MotionValue<number>] => {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return [ref, scrollYProgress];
};

// ========================================
// USE SCROLL REVEAL
// ========================================

interface UseScrollRevealReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  isInView: boolean;
  progress: MotionValue<number>;
}

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollInViewOptions = {}
): UseScrollRevealReturn<T> => {
  const [ref, isInView] = useScrollInView<T>(options);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return { ref, isInView, progress: scrollYProgress };
};

// ========================================
// USE SMOOTH SCROLL
// ========================================

interface UseSmoothScrollOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export const useSmoothScroll = (
  options: UseSmoothScrollOptions = {}
): MotionValue<number> => {
  const { stiffness = 100, damping = 30, mass = 1 } = options;
  const { scrollY } = useScroll();
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness,
    damping,
    mass
  });

  return smoothScrollY;
};

// ========================================
// USE SCROLL DIRECTION
// ========================================

type ScrollDirection = "up" | "down" | null;

export const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up");
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return scrollDirection;
};

// ========================================
// USE SCROLL VELOCITY
// ========================================

export const useScrollVelocity = (): MotionValue<number> => {
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(scrollY, {
    stiffness: 300,
    damping: 50
  });
  const velocity = useTransform(smoothVelocity, (current) => {
    const prev = scrollY.getPrevious() ?? 0;
    return current - prev;
  });

  return velocity;
};

// ========================================
// USE SCROLL TO TOP VISIBILITY
// ========================================

interface UseScrollToTopOptions {
  threshold?: number;
}

export const useScrollToTopVisibility = (
  options: UseScrollToTopOptions = {}
): boolean => {
  const { threshold = 300 } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
};

// ========================================
// USE SCROLL PERCENTAGE
// ========================================

export const useScrollPercentage = (): number => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setPercentage(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return percentage;
};

// ========================================
// USE SCROLL LOCK
// ========================================

export const useScrollLock = (lock: boolean): void => {
  useEffect(() => {
    if (lock) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lock]);
};

// ========================================
// USE SCROLL PARALLAX VALUES
// ========================================

interface UseScrollParallaxOptions {
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export const useScrollParallax = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollParallaxOptions = {}
): [RefObject<T>, MotionValue<number>] => {
  const { inputRange = [0, 1], outputRange = [0, -50] } = options;
  const ref = useRef<T>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const parallaxValue = useTransform(scrollYProgress, inputRange, outputRange);
  
  return [ref, parallaxValue];
};
