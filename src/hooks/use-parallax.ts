import { useRef, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * Parallax Scroll Hook
 * Module 1.3.6: Advanced parallax effects
 */

// ========================================
// TYPES
// ========================================

interface ParallaxOptions {
  /** Speed multiplier (-1 to 1, negative = opposite direction) */
  speed?: number;
  /** Use spring physics for smoother motion */
  smooth?: boolean;
  /** Spring stiffness (when smooth is true) */
  stiffness?: number;
  /** Spring damping (when smooth is true) */
  damping?: number;
}

interface ParallaxReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  y: MotionValue<number>;
  x: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

// ========================================
// USE PARALLAX HOOK
// ========================================

export const useParallax = <T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): ParallaxReturn<T> => {
  const { 
    speed = 0.5, 
    smooth = true, 
    stiffness = 100, 
    damping = 30 
  } = options;
  
  const ref = useRef<T>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate base transforms
  const baseY = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const baseX = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const baseScale = useTransform(scrollYProgress, [0, 0.5, 1], [1 - Math.abs(speed) * 0.1, 1, 1 - Math.abs(speed) * 0.1]);
  const baseRotate = useTransform(scrollYProgress, [0, 1], [speed * 10, -speed * 10]);
  const baseOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  
  // Apply spring physics if smooth is enabled
  const springConfig = { stiffness, damping };
  
  const y = smooth ? useSpring(baseY, springConfig) : baseY;
  const x = smooth ? useSpring(baseX, springConfig) : baseX;
  const scale = smooth ? useSpring(baseScale, springConfig) : baseScale;
  const rotate = smooth ? useSpring(baseRotate, springConfig) : baseRotate;
  const opacity = smooth ? useSpring(baseOpacity, springConfig) : baseOpacity;
  
  return {
    ref,
    y,
    x,
    scale,
    rotate,
    opacity,
    progress: scrollYProgress
  };
};

// ========================================
// USE PARALLAX LAYERS
// ========================================

interface ParallaxLayer {
  speed: number;
  y: MotionValue<number>;
}

interface UseParallaxLayersReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  layers: ParallaxLayer[];
  progress: MotionValue<number>;
}

export const useParallaxLayers = <T extends HTMLElement = HTMLDivElement>(
  layerSpeeds: number[] = [0.1, 0.3, 0.5, 0.7, 0.9]
): UseParallaxLayersReturn<T> => {
  const ref = useRef<T>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const layers = layerSpeeds.map(speed => ({
    speed,
    y: useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  }));
  
  return {
    ref,
    layers,
    progress: scrollYProgress
  };
};

// ========================================
// USE MOUSE PARALLAX
// ========================================

interface MouseParallaxOptions {
  /** Intensity of the effect (0-1) */
  intensity?: number;
  /** Invert the direction */
  invert?: boolean;
  /** Use spring physics */
  smooth?: boolean;
}

interface UseMouseParallaxReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export const useMouseParallax = (
  options: MouseParallaxOptions = {}
): UseMouseParallaxReturn => {
  const { intensity = 0.1, invert = false, smooth = true } = options;
  const multiplier = invert ? -1 : 1;
  
  const { scrollY } = useScroll();
  
  // Create motion values for mouse position
  const baseX = useTransform(scrollY, () => 0);
  
  const baseY = useTransform(scrollY, (value) => {
    return value * intensity * multiplier * 0.1;
  });
  
  const springConfig = { stiffness: 150, damping: 15 };
  const x = smooth ? useSpring(baseX, springConfig) : baseX;
  const y = smooth ? useSpring(baseY, springConfig) : baseY;
  
  return { x, y };
};

// ========================================
// USE PARALLAX TILT
// ========================================

interface ParallaxTiltOptions {
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Scale on hover */
  scale?: number;
  /** Use spring physics */
  smooth?: boolean;
}

interface UseParallaxTiltReturn {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
}

export const useParallaxTilt = (
  options: ParallaxTiltOptions = {}
): UseParallaxTiltReturn => {
  const { maxTilt = 15, scale = 1.05, smooth = true } = options;
  
  const { scrollY } = useScroll();
  
  // Simplified version - actual implementation would use mouse position
  const baseRotateX = useTransform(scrollY, [0, 1000], [0, maxTilt]);
  const baseRotateY = useTransform(scrollY, [0, 1000], [0, -maxTilt]);
  const baseScale = useTransform(scrollY, [0, 500], [1, scale]);
  
  const springConfig = { stiffness: 200, damping: 20 };
  
  const rotateX = smooth ? useSpring(baseRotateX, springConfig) : baseRotateX;
  const rotateY = smooth ? useSpring(baseRotateY, springConfig) : baseRotateY;
  const scaleValue = smooth ? useSpring(baseScale, springConfig) : baseScale;
  
  return {
    rotateX,
    rotateY,
    scale: scaleValue
  };
};

// ========================================
// USE SCROLL ZOOM
// ========================================

interface ScrollZoomOptions {
  /** Starting scale */
  startScale?: number;
  /** Ending scale */
  endScale?: number;
  /** Use spring physics */
  smooth?: boolean;
}

interface UseScrollZoomReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

export const useScrollZoom = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollZoomOptions = {}
): UseScrollZoomReturn<T> => {
  const { startScale = 1, endScale = 1.2, smooth = true } = options;
  
  const ref = useRef<T>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const baseScale = useTransform(scrollYProgress, [0, 0.5, 1], [startScale, endScale, startScale]);
  const baseOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  
  const scale = smooth ? useSpring(baseScale, springConfig) : baseScale;
  const opacity = smooth ? useSpring(baseOpacity, springConfig) : baseOpacity;
  
  return { ref, scale, opacity };
};

// ========================================
// USE HORIZONTAL SCROLL PARALLAX
// ========================================

interface HorizontalParallaxOptions {
  /** Movement distance */
  distance?: number;
  /** Use spring physics */
  smooth?: boolean;
}

interface UseHorizontalParallaxReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  x: MotionValue<number>;
}

export const useHorizontalParallax = <T extends HTMLElement = HTMLDivElement>(
  options: HorizontalParallaxOptions = {}
): UseHorizontalParallaxReturn<T> => {
  const { distance = 200, smooth = true } = options;
  
  const ref = useRef<T>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const baseX = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const x = smooth ? useSpring(baseX, springConfig) : baseX;
  
  return { ref, x };
};
