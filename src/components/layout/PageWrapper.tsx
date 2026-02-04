import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  transition?: "fade" | "slide" | "scale" | "none";
}

const transitionConfigs = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.25 },
  },
  none: null,
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  transition = "fade",
}) => {
  const config = transitionConfigs[transition];

  if (!config) {
    return <div className={cn("min-h-screen", className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={config.initial}
      animate={config.animate}
      exit={config.exit}
      transition={config.transition}
      className={cn("min-h-screen", className)}
    >
      {children}
    </motion.div>
  );
};

PageWrapper.displayName = "PageWrapper";

export default PageWrapper;
