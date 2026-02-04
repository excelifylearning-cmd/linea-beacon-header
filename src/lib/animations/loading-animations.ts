import { Variants } from "framer-motion";

/**
 * Loading Animation Variants
 * Module 1.3.8: Spinners, skeletons, and loading states
 */

// ========================================
// SPINNER ANIMATIONS
// ========================================

export const spinnerVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const spinnerFadeVariants: Variants = {
  initial: { rotate: 0, opacity: 0.3 },
  animate: {
    rotate: 360,
    opacity: [0.3, 1, 0.3],
    transition: {
      rotate: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      },
      opacity: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// ========================================
// DOTS LOADING
// ========================================

export const dotsContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const dotVariants: Variants = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: [0, -8, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const dotScaleVariants: Variants = {
  initial: { scale: 0.8, opacity: 0.5 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// PULSE ANIMATIONS
// ========================================

export const pulseVariants: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseScaleVariants: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// SHIMMER/SKELETON ANIMATIONS
// ========================================

export const shimmerVariants: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const skeletonPulseVariants: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// PROGRESS ANIMATIONS
// ========================================

export const progressBarVariants: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: (progress: number) => ({
    scaleX: progress / 100,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export const progressCircleVariants: Variants = {
  initial: { 
    pathLength: 0,
    rotate: -90
  },
  animate: (progress: number) => ({
    pathLength: progress / 100,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const indeterminateProgressVariants: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "400%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// ========================================
// BARS LOADING
// ========================================

export const barsContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const barVariants: Variants = {
  initial: { scaleY: 0.4 },
  animate: {
    scaleY: [0.4, 1, 0.4],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// CIRCULAR LOADING
// ========================================

export const circularLoadingVariants: Variants = {
  initial: { 
    rotate: 0,
    pathLength: 0.25 
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const circularPulseVariants: Variants = {
  initial: { scale: 0.8, opacity: 0.3 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.3, 0.8, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// LOGO/BRAND LOADING
// ========================================

export const logoLoadingVariants: Variants = {
  initial: { 
    opacity: 0.5,
    scale: 0.9
  },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const logoPulseRingVariants: Variants = {
  initial: { 
    scale: 1,
    opacity: 0.5
  },
  animate: {
    scale: [1, 1.5, 2],
    opacity: [0.5, 0.3, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
};

// ========================================
// CONTENT PLACEHOLDER ANIMATIONS
// ========================================

export const contentPlaceholderVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const placeholderLineVariants: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// WAVE LOADING
// ========================================

export const waveContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const waveLineVariants: Variants = {
  initial: { scaleY: 0.4, originY: 1 },
  animate: {
    scaleY: [0.4, 1, 0.4],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// BOUNCE LOADING
// ========================================

export const bounceContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const bounceDotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// FADE LOADING
// ========================================

export const fadeContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const fadeDotVariants: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// ORBIT LOADING
// ========================================

export const orbitVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const orbitDotVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// SKELETON CARD PRESET
// ========================================

export const skeletonCardVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const skeletonElementVariants: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.7, 0.5],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// UTILITY: Create custom loading animation
// ========================================

export const createLoadingVariant = (
  duration: number = 1,
  repeat: number = Infinity
): Variants => {
  return {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration,
        repeat,
        ease: "easeInOut"
      }
    }
  };
};

export const createSpinnerVariant = (
  duration: number = 1
): Variants => ({
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear"
    }
  }
});
