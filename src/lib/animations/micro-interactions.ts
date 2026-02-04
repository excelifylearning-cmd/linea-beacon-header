import { Variants, TargetAndTransition, Transition } from "framer-motion";

/**
 * Micro-Interaction Library
 * Module 1.3.7: Hover, press, drag, and focus animations
 */

// ========================================
// HOVER INTERACTIONS
// ========================================

export const hoverInteractions = {
  // Subtle scale up
  scaleUp: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // More pronounced scale
  scaleLarge: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // Lift up effect
  lift: {
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // Lift with shadow
  liftWithShadow: {
    y: -6,
    boxShadow: "0 12px 32px -8px hsl(0 0% 0% / 0.2)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // Glow effect
  glow: {
    boxShadow: "0 0 20px hsl(0 0% 75% / 0.5)",
    transition: { duration: 0.2 }
  } as TargetAndTransition,
  
  // Neon glow
  neonGlow: {
    boxShadow: "0 0 10px hsl(0 0% 100% / 0.8), 0 0 20px hsl(0 0% 90% / 0.6), 0 0 30px hsl(0 0% 80% / 0.4)",
    transition: { duration: 0.3 }
  } as TargetAndTransition,
  
  // Border highlight
  borderHighlight: {
    borderColor: "hsl(0 0% 60%)",
    transition: { duration: 0.2 }
  } as TargetAndTransition,
  
  // Background darken
  backgroundDarken: {
    backgroundColor: "hsl(0 0% 90%)",
    transition: { duration: 0.2 }
  } as TargetAndTransition,
  
  // Rotate slightly
  rotateSubtle: {
    rotate: 2,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } as TargetAndTransition,
  
  // Combined: Scale + Lift + Shadow
  cardHover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 16px 40px -12px hsl(0 0% 0% / 0.18)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // Icon hover
  iconHover: {
    scale: 1.15,
    rotate: 5,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  } as TargetAndTransition,
  
  // Button hover
  buttonHover: {
    scale: 1.02,
    boxShadow: "0 4px 16px -4px hsl(0 0% 0% / 0.15)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } as TargetAndTransition,
  
  // Link hover (underline grow)
  linkHover: {
    color: "hsl(0 0% 30%)",
    transition: { duration: 0.2 }
  } as TargetAndTransition,
  
  // Avatar hover
  avatarHover: {
    scale: 1.1,
    borderColor: "hsl(0 0% 60%)",
    boxShadow: "0 4px 16px -4px hsl(0 0% 0% / 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } as TargetAndTransition
};

// ========================================
// PRESS/TAP INTERACTIONS
// ========================================

export const pressInteractions = {
  // Subtle shrink
  shrink: {
    scale: 0.98,
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // More pronounced shrink
  shrinkLarge: {
    scale: 0.95,
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // Push down
  pushDown: {
    scale: 0.98,
    y: 2,
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // Shadow reduce
  shadowReduce: {
    scale: 0.98,
    boxShadow: "0 2px 4px -2px hsl(0 0% 0% / 0.1)",
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // Button press
  buttonPress: {
    scale: 0.97,
    y: 1,
    boxShadow: "0 1px 2px 0 hsl(0 0% 0% / 0.1)",
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // Icon press
  iconPress: {
    scale: 0.9,
    transition: { duration: 0.1 }
  } as TargetAndTransition,
  
  // Card press
  cardPress: {
    scale: 0.99,
    boxShadow: "0 2px 8px -4px hsl(0 0% 0% / 0.1)",
    transition: { duration: 0.1 }
  } as TargetAndTransition
};

// ========================================
// FOCUS INTERACTIONS
// ========================================

export const focusInteractions = {
  // Ring focus
  ring: {
    boxShadow: "0 0 0 3px hsl(0 0% 20% / 0.2)",
    transition: { duration: 0.15 }
  } as TargetAndTransition,
  
  // Ring with offset
  ringOffset: {
    boxShadow: "0 0 0 2px hsl(0 0% 100%), 0 0 0 4px hsl(0 0% 20%)",
    transition: { duration: 0.15 }
  } as TargetAndTransition,
  
  // Border focus
  border: {
    borderColor: "hsl(0 0% 40%)",
    transition: { duration: 0.15 }
  } as TargetAndTransition,
  
  // Glow focus
  glow: {
    boxShadow: "0 0 0 3px hsl(0 0% 75% / 0.4)",
    transition: { duration: 0.15 }
  } as TargetAndTransition,
  
  // Scale focus
  scale: {
    scale: 1.02,
    boxShadow: "0 0 0 2px hsl(0 0% 20%)",
    transition: { duration: 0.15 }
  } as TargetAndTransition,
  
  // Input focus
  inputFocus: {
    borderColor: "hsl(0 0% 60%)",
    boxShadow: "0 0 0 3px hsl(0 0% 20% / 0.1)",
    transition: { duration: 0.15 }
  } as TargetAndTransition
};

// ========================================
// DRAG INTERACTIONS
// ========================================

export const dragInteractions = {
  // Basic drag constraint
  basicConstraints: {
    top: -50,
    right: 50,
    bottom: 50,
    left: -50
  },
  
  // Drag transition
  dragTransition: {
    bounceStiffness: 500,
    bounceDamping: 30
  } as Transition,
  
  // Dragging state
  dragging: {
    scale: 1.05,
    boxShadow: "0 16px 40px -12px hsl(0 0% 0% / 0.25)",
    cursor: "grabbing",
    zIndex: 50
  } as TargetAndTransition,
  
  // Drag handle
  dragHandle: {
    cursor: "grab"
  } as TargetAndTransition,
  
  // Drag overlay
  dragOverlay: {
    opacity: 0.8,
    scale: 1.02,
    boxShadow: "0 20px 50px -12px hsl(0 0% 0% / 0.3)"
  } as TargetAndTransition
};

// ========================================
// TOGGLE INTERACTIONS
// ========================================

export const toggleVariants: Variants = {
  off: {
    x: 0,
    backgroundColor: "hsl(0 0% 85%)"
  },
  on: {
    x: 20,
    backgroundColor: "hsl(0 0% 20%)"
  }
};

export const toggleContainerVariants: Variants = {
  off: {
    backgroundColor: "hsl(0 0% 90%)"
  },
  on: {
    backgroundColor: "hsl(0 0% 40%)"
  }
};

// ========================================
// CHECKBOX INTERACTIONS
// ========================================

export const checkboxVariants: Variants = {
  unchecked: {
    scale: 0,
    opacity: 0
  },
  checked: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

export const checkboxContainerVariants: Variants = {
  unchecked: {
    borderColor: "hsl(0 0% 80%)",
    backgroundColor: "hsl(0 0% 100%)"
  },
  checked: {
    borderColor: "hsl(0 0% 20%)",
    backgroundColor: "hsl(0 0% 20%)",
    transition: { duration: 0.15 }
  }
};

// ========================================
// RADIO BUTTON INTERACTIONS
// ========================================

export const radioVariants: Variants = {
  unselected: {
    scale: 0,
    opacity: 0
  },
  selected: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

// ========================================
// MENU/DROPDOWN INTERACTIONS
// ========================================

export const menuContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -5
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.03
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: { duration: 0.15 }
  }
};

export const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 }
  }
};

// ========================================
// TOOLTIP INTERACTIONS
// ========================================

export const tooltipVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 5
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// ========================================
// ACCORDION INTERACTIONS
// ========================================

export const accordionContentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 }
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  }
};

export const accordionIconVariants: Variants = {
  collapsed: {
    rotate: 0,
    transition: { duration: 0.2 }
  },
  expanded: {
    rotate: 180,
    transition: { duration: 0.2 }
  }
};

// ========================================
// INPUT FIELD INTERACTIONS
// ========================================

export const inputLabelVariants: Variants = {
  default: {
    y: 0,
    scale: 1,
    color: "hsl(0 0% 45%)"
  },
  focused: {
    y: -24,
    scale: 0.85,
    color: "hsl(0 0% 20%)",
    transition: { duration: 0.2 }
  }
};

export const inputUnderlineVariants: Variants = {
  default: {
    scaleX: 0,
    originX: 0
  },
  focused: {
    scaleX: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
};

// ========================================
// LOADING BUTTON INTERACTIONS
// ========================================

export const loadingButtonVariants: Variants = {
  idle: {
    width: "auto"
  },
  loading: {
    width: 48,
    transition: { duration: 0.3 }
  },
  success: {
    backgroundColor: "hsl(142 76% 36%)",
    transition: { duration: 0.2 }
  },
  error: {
    backgroundColor: "hsl(0 72% 51%)",
    transition: { duration: 0.2 }
  }
};

export const loadingSpinnerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
      rotate: { duration: 1, repeat: Infinity, ease: "linear" }
    }
  }
};

// ========================================
// NOTIFICATION BADGE INTERACTIONS
// ========================================

export const badgeVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.4,
      times: [0, 0.5, 1],
      repeat: 2
    }
  }
};

// ========================================
// RIPPLE EFFECT (for buttons)
// ========================================

export const rippleVariants: Variants = {
  start: {
    scale: 0,
    opacity: 0.5
  },
  end: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

// ========================================
// UTILITY: Create custom interaction
// ========================================

export const createHoverInteraction = (
  properties: Record<string, unknown>,
  transition: Partial<Transition> = {}
): TargetAndTransition => ({
  ...properties,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    ...transition
  }
});

export const createPressInteraction = (
  properties: Record<string, unknown>
): TargetAndTransition => ({
  ...properties,
  transition: { duration: 0.1 }
});
