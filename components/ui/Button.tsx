"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses = {
  primary: "bg-blueberry-900 text-white hover:bg-blueberry-700 focus:ring-blueberry-500",
  secondary: "bg-blueberry-500 text-white hover:bg-blueberry-700 focus:ring-blueberry-500",
  outline: "border-2 border-blueberry-700 text-blueberry-700 hover:bg-blueberry-50 focus:ring-blueberry-500",
  ghost: "text-blueberry-700 hover:bg-blueberry-50 focus:ring-blueberry-500",
  danger: "bg-cherry-700 text-white hover:bg-cherry-500 focus:ring-cherry-500",
  success: "bg-success-700 text-white hover:opacity-90 focus:ring-success-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
