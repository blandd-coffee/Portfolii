import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default:
      "bg-emerald-500 text-emerald-950 hover:bg-emerald-400 border border-emerald-500",
    outline:
      "border-2 border-emerald-400/70 text-emerald-100 hover:bg-emerald-900/40 bg-transparent",
    ghost: "hover:bg-emerald-900/30 text-emerald-100",
  };
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
