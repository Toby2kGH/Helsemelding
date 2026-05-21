import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "warning" | "error" | "success" | "neutral" | "new";
}

const variantClasses = {
  primary: "bg-blueberry-100 text-blueberry-700",
  warning: "bg-warning-100 text-warning-700",
  error: "bg-cherry-100 text-cherry-700",
  success: "bg-success-100 text-success-700",
  neutral: "bg-neutral-100 text-neutral-700",
  new: "bg-cherry-500 text-white",
};

export function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
