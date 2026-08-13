import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  as?: any;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  as: Component = "button",
  ...props
}) => {
  // Base styling classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none relative";

  // Variant styling classes
  const variants = {
    primary: "bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white hover:-translate-y-[1px] hover:brightness-110 shadow-lg shadow-[#5c3ffa]/20 hover:shadow-[#5c3ffa]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c3ffa]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:-translate-y-[1px] focus:ring-slate-500",
    outline: "border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white hover:-translate-y-[1px]",
  };

  // Size styling classes
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  return (
    <Component className={classes} disabled={disabled} {...props}>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#ffffff01] rounded-xl shadow-[0px_8px_24px_-8px_#5c3ffa73]"
        />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};

Button.displayName = "Button";
