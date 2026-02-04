/**
 * Skill Swappr Animation Library
 * Module 1.3: Comprehensive Animation System
 * 
 * This is the main entry point for all animations.
 * Import from here for cleaner imports:
 * 
 * import { fadeInUp, hoverScale, pageTransitionFadeSlide } from "@/lib/animations";
 */

// Core animation variants
export * from "./variants";

// Page transitions
export * from "./page-transitions";

// Micro-interactions (hover, press, focus, drag)
export * from "./micro-interactions";

// Text animations (exclude conflicting exports)
export {
  textRevealVariants,
  letterContainerVariants,
  letterVariants,
  wordContainerVariants,
  wordVariants,
  lineContainerVariants,
  lineVariants,
  clipRevealVariants,
  clipRevealUpVariants,
  blurInVariants,
  shimmerTextVariants,
  scaleUpTextVariants,
  flipTextVariants,
  highlightTextVariants,
  scrambleTextVariants,
  waveLetterVariants,
  bounceLetterVariants,
  underlineVariants,
  cursorBlinkVariants,
  rotatingWordVariants,
  counterVariants,
  splitTextIntoChars,
  splitTextIntoWords,
  createTextStagger,
  createLetterVariant
} from "./text-animations";

// Loading animations (exclude conflicting exports)
export {
  spinnerVariants,
  spinnerFadeVariants,
  dotsContainerVariants,
  dotVariants,
  dotScaleVariants,
  pulseVariants,
  pulseScaleVariants,
  shimmerVariants,
  skeletonPulseVariants,
  progressBarVariants,
  progressCircleVariants,
  indeterminateProgressVariants,
  barsContainerVariants,
  barVariants,
  circularLoadingVariants,
  circularPulseVariants,
  logoLoadingVariants,
  logoPulseRingVariants,
  contentPlaceholderVariants,
  placeholderLineVariants,
  waveLineVariants,
  bounceDotVariants,
  fadeContainerVariants,
  fadeDotVariants,
  orbitVariants,
  orbitDotVariants,
  skeletonCardVariants,
  skeletonElementVariants,
  createLoadingVariant,
  createSpinnerVariant
} from "./loading-animations";

// Re-export commonly used framer-motion types for convenience
export type { Variants, TargetAndTransition, Transition } from "framer-motion";
