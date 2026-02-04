import { Variants } from "framer-motion";

/**
 * Page Transition Variants
 * Module 1.3.3: Unique transitions per route type
 */

// ========================================
// DEFAULT PAGE TRANSITION
// ========================================

export const pageTransitionDefault: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// ========================================
// FADE WITH SLIDE TRANSITION
// ========================================

export const pageTransitionFadeSlide: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// ========================================
// SCALE TRANSITION (for modals/overlays)
// ========================================

export const pageTransitionScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// ========================================
// SLIDE TRANSITIONS (for dashboards)
// ========================================

export const pageTransitionSlideLeft: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const pageTransitionSlideRight: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const pageTransitionSlideUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.25, ease: "easeIn" }
  }
};

// ========================================
// REVEAL TRANSITION (for marketing pages)
// ========================================

export const pageTransitionReveal: Variants = {
  initial: { 
    opacity: 0,
    clipPath: "inset(0 0 100% 0)"
  },
  animate: { 
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.3 }
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// ========================================
// STAGGER REVEAL TRANSITION
// ========================================

export const pageTransitionStagger: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const pageTransitionStaggerChild: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ========================================
// ROUTE-SPECIFIC TRANSITIONS
// ========================================

// Auth pages (login, signup, etc.)
export const authPageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

// Marketplace/browse pages
export const marketplacePageTransition: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.35, 
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

// Dashboard pages
export const dashboardPageTransition: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.35, 
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -10,
    transition: { duration: 0.15 }
  }
};

// Guild pages
export const guildPageTransition: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Court/legal pages
export const courtPageTransition: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.25 }
  }
};

// Workspace pages
export const workspacePageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

// Profile pages
export const profilePageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.45, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Marketing pages (hero sections)
export const heroPageTransition: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.25 }
  }
};

// Error pages
export const errorPageTransition: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// ========================================
// UTILITY: Get transition by route type
// ========================================

export type RouteType = 
  | "default"
  | "auth"
  | "marketplace"
  | "dashboard"
  | "guild"
  | "court"
  | "workspace"
  | "profile"
  | "marketing"
  | "error";

export const getPageTransition = (routeType: RouteType): Variants => {
  const transitions: Record<RouteType, Variants> = {
    default: pageTransitionFadeSlide,
    auth: authPageTransition,
    marketplace: marketplacePageTransition,
    dashboard: dashboardPageTransition,
    guild: guildPageTransition,
    court: courtPageTransition,
    workspace: workspacePageTransition,
    profile: profilePageTransition,
    marketing: heroPageTransition,
    error: errorPageTransition
  };
  
  return transitions[routeType];
};
