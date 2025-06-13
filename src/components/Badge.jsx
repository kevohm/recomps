
import React from "react";


/**
 * Badge Component
 * 
 * @param {object} props
 * @param {"default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "ghost"} [props.color="default"] - Badge color
 * @param {"contained" | "outline"} [props.variant="contained"] - Badge variant
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Badge size
 * @param {React.ReactNode} props.children - Badge content
 * @param {React.ReactNode} [props.icon] - Optional icon
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */

export const Badge = ({
  color = "default",
  variant = "contained",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}) => {
  // Base classes for all badges
  const baseClasses = "w-max inline-flex items-center font-medium rounded-md";
  
  // Size variants
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1"
  };
  
  // Color mapping
  const colorMap = {
    default: {
      contained: "bg-gray-500 text-white",
      outline: "bg-transparent border border-gray-500 text-gray-700"
    },
    primary: {
      contained: "bg-blue-500 text-white",
      outline: "bg-transparent border border-blue-500 text-blue-700"
    },
    secondary: {
      contained: "bg-purple-500 text-white",
      outline: "bg-transparent border border-purple-500 text-purple-700"
    },
    success: {
      contained: "bg-green-500 text-white",
      outline: "bg-transparent border border-green-500 text-green-700"
    },
    warning: {
      contained: "bg-yellow-500 text-white",
      outline: "bg-transparent border border-yellow-500 text-yellow-700"
    },
    danger: {
      contained: "bg-red-500 text-white",
      outline: "bg-transparent border border-red-500 text-red-700"
    },
    info: {
      contained: "bg-cyan-500 text-white",
      outline: "bg-transparent border border-cyan-500 text-cyan-700"
    },
    ghost: {
      contained: "bg-gray-100 text-gray-800",
      outline: "bg-transparent text-gray-600 border border-gray-300"
    }
  };

  // Get appropriate color/variant class
  const colorClass = 
    colorMap[color]?.[variant] || 
    colorMap.default.contained;

  // Combine classes
  const classes = [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    colorClass,
    className
  ].join(" ");

  return (
    <span className={classes} {...props}>
      {icon && (
        <span className="mr-1">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};