import { Variants } from "framer-motion";

/**
 * Text Animation Utilities
 * Module 1.3.4: Typewriter, morphing, and split text animations
 */

// ========================================
// TEXT REVEAL VARIANTS
// ========================================

export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.05,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// ========================================
// LETTER BY LETTER REVEAL
// ========================================

export const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
};

export const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 45
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

// ========================================
// WORD BY WORD REVEAL
// ========================================

export const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// LINE BY LINE REVEAL
// ========================================

export const lineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    skewX: -5
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// CLIP PATH REVEAL
// ========================================

export const clipRevealVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)"
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const clipRevealUpVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)"
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// BLUR IN TEXT
// ========================================

export const blurInVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// ========================================
// GRADIENT TEXT SHIMMER
// ========================================

export const shimmerTextVariants: Variants = {
  hidden: {
    backgroundPosition: "-200% 0"
  },
  visible: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// ========================================
// SCALE UP TEXT
// ========================================

export const scaleUpTextVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// FLIP TEXT
// ========================================

export const flipTextVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 90,
    transformOrigin: "center bottom"
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// HIGHLIGHT TEXT
// ========================================

export const highlightTextVariants: Variants = {
  hidden: {
    backgroundSize: "0% 100%"
  },
  visible: {
    backgroundSize: "100% 100%",
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: "easeOut"
    }
  }
};

// ========================================
// SCRAMBLE/DECODE TEXT (for display purposes)
// ========================================

export const scrambleTextVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1
    }
  }
};

// ========================================
// WAVE TEXT (letter by letter)
// ========================================

export const waveContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const waveLetterVariants: Variants = {
  hidden: {
    y: 0
  },
  visible: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeInOut"
    }
  }
};

// ========================================
// BOUNCE TEXT
// ========================================

export const bounceContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const bounceLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  }
};

// ========================================
// UNDERLINE ANIMATION
// ========================================

export const underlineVariants: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ========================================
// CURSOR BLINK (for typewriter effect)
// ========================================

export const cursorBlinkVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [1, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// ========================================
// ROTATING WORDS
// ========================================

export const rotatingWordVariants: Variants = {
  enter: {
    opacity: 0,
    y: 20
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

// ========================================
// COUNTER/NUMBER TEXT
// ========================================

export const counterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

// ========================================
// UTILITY: Split text into characters
// ========================================

export const splitTextIntoChars = (text: string): string[] => {
  return text.split("");
};

// ========================================
// UTILITY: Split text into words
// ========================================

export const splitTextIntoWords = (text: string): string[] => {
  return text.split(" ");
};

// ========================================
// UTILITY: Create stagger configuration
// ========================================

interface StaggerConfig {
  staggerChildren: number;
  delayChildren: number;
}

export const createTextStagger = (
  staggerTime: number = 0.03,
  delay: number = 0
): StaggerConfig => ({
  staggerChildren: staggerTime,
  delayChildren: delay
});

// ========================================
// UTILITY: Create custom letter variant
// ========================================

export const createLetterVariant = (
  hiddenY: number = 20,
  duration: number = 0.3
): Variants => ({
  hidden: {
    opacity: 0,
    y: hiddenY
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});
