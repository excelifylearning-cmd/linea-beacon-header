import { Variants } from "framer-motion";

/**
 * Skill Swappr Animation Library
 * Module 1.3: Framer Motion Animation Variants
 */

// ========================================
// FADE ANIMATIONS
// ========================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    x: -15,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    x: 15,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// ========================================
// SCALE ANIMATIONS
// ========================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const scaleOut: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.15 }
  }
};

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 15 
    }
  }
};

// ========================================
// SLIDE ANIMATIONS
// ========================================

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    x: "-100%",
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    x: "100%",
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const slideInUp: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    y: "100%",
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const slideInDown: Variants = {
  hidden: { y: "-100%" },
  visible: { 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    y: "-100%",
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// ========================================
// ROTATION ANIMATIONS
// ========================================

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    }
  }
};

export const rotateInClockwise: Variants = {
  hidden: { opacity: 0, rotate: 180, scale: 0.5 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    }
  }
};

export const flipInX: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const flipInY: Variants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ========================================
// STAGGER CONTAINER VARIANTS
// ========================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// ========================================
// LIST ITEM VARIANTS
// ========================================

export const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const listItemSlide: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// ========================================
// HOVER ANIMATIONS (for whileHover)
// ========================================

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

export const hoverScaleLarge = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  boxShadow: "0 0 20px hsl(0 0% 75% / 0.5)",
  transition: { duration: 0.2 }
};

// ========================================
// TAP ANIMATIONS (for whileTap)
// ========================================

export const tapScale = {
  scale: 0.98
};

export const tapShrink = {
  scale: 0.95
};

// ========================================
// LOADING ANIMATIONS
// ========================================

export const pulse: Variants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export const shimmer: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const spin: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const bounce: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-8, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ========================================
// DRAWER/MODAL ANIMATIONS
// ========================================

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

export const drawerLeft: Variants = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 35 
    }
  },
  exit: { 
    x: "-100%",
    transition: { duration: 0.2 }
  }
};

export const drawerRight: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 35 
    }
  },
  exit: { 
    x: "100%",
    transition: { duration: 0.2 }
  }
};

export const drawerBottom: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 35 
    }
  },
  exit: { 
    y: "100%",
    transition: { duration: 0.2 }
  }
};

// ========================================
// NOTIFICATION/TOAST ANIMATIONS
// ========================================

export const toastSlideIn: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  },
  exit: { 
    opacity: 0, 
    x: 50, 
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

// ========================================
// CARD ANIMATIONS
// ========================================

export const cardHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 4px 16px -4px hsl(0 0% 0% / 0.12)"
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.16)",
    transition: { duration: 0.2 }
  }
};

export const cardTap: Variants = {
  rest: { scale: 1 },
  tap: { scale: 0.98 }
};

// ========================================
// TEXT REVEAL ANIMATIONS
// ========================================

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// UTILITY: Create custom stagger
// ========================================

export const createStagger = (staggerTime: number = 0.1, delayTime: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delayTime
    }
  }
});

// ========================================
// UTILITY: Create custom fade with direction
// ========================================

export const createFadeUp = (distance: number = 20, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    y: distance / 2,
    transition: { duration: duration * 0.6, ease: "easeIn" }
  }
});

export const createFadeDown = (distance: number = 20, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: -distance },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    y: -distance / 2,
    transition: { duration: duration * 0.6, ease: "easeIn" }
  }
});

export const createFadeLeft = (distance: number = 20, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    x: distance / 2,
    transition: { duration: duration * 0.6, ease: "easeIn" }
  }
});

export const createFadeRight = (distance: number = 20, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    x: -distance / 2,
    transition: { duration: duration * 0.6, ease: "easeIn" }
  }
});
