import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "blueberry" | "warning" | "error" | "success";
}

const variantClasses = {
  default: "bg-white border border-neutral-200",
  blueberry: "bg-blueberry-50 border border-blueberry-100",
  warning: "bg-warning-100 border-l-4 border-warning-700",
  error: "bg-cherry-100 border-l-4 border-cherry-700",
  success: "bg-success-100 border border-success-700",
};

export function Card({ children, variant = "default", className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg p-4 shadow-sm ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
