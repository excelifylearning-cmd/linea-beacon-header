import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <span className="font-display text-xl font-bold text-background">S</span>
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Skill Swappr
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </motion.div>

          {/* Form content */}
          {children}
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-lg text-center"
        >
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-background">
            <span className="font-display text-4xl font-bold text-foreground">⚡</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Exchange Skills, Grow Together
          </h2>
          <p className="text-muted-foreground">
            Join thousands of professionals trading expertise without money. 
            Learn new skills while sharing what you know.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: "50K+", label: "Users" },
              { value: "100K+", label: "Exchanges" },
              { value: "500+", label: "Skills" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
