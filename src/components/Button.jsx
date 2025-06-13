import React from "react";

/**
 * Button Component
 *
 * @param {object} props
 * @param {"default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "ghost"} [props.color="default"] - Button color
 * @param {"contained" | "outline" | "text"} [props.variant="contained"] - Button variant
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Button size
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} [props.startIcon] - Optional icon at the start
 * @param {React.ReactNode} [props.endIcon] - Optional icon at the end
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.onClick] - Click handler
 * @returns {React.ReactElement}
 */
export const Button = ({
  color = "default",
  variant = "contained",
  size = "md",
  children,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // Size variants
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  // Color mapping
  const colorMap = {
    default: {
      contained: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
      outline:
        "bg-transparent border border-gray-500 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      text: "bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    },
    primary: {
      contained: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      outline:
        "bg-transparent border border-blue-500 text-blue-700 hover:bg-blue-50 focus:ring-blue-500",
      text: "bg-transparent text-blue-700 hover:bg-blue-50 focus:ring-blue-500",
    },
    secondary: {
      contained:
        "bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500",
      outline:
        "bg-transparent border border-purple-500 text-purple-700 hover:bg-purple-50 focus:ring-purple-500",
      text: "bg-transparent text-purple-700 hover:bg-purple-50 focus:ring-purple-500",
    },
    success: {
      contained:
        "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
      outline:
        "bg-transparent border border-green-500 text-green-700 hover:bg-green-50 focus:ring-green-500",
      text: "bg-transparent text-green-700 hover:bg-green-50 focus:ring-green-500",
    },
    warning: {
      contained:
        "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
      outline:
        "bg-transparent border border-yellow-500 text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500",
      text: "bg-transparent text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500",
    },
    danger: {
      contained: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      outline:
        "bg-transparent border border-red-500 text-red-700 hover:bg-red-50 focus:ring-red-500",
      text: "bg-transparent text-red-700 hover:bg-red-50 focus:ring-red-500",
    },
    info: {
      contained: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500",
      outline:
        "bg-transparent border border-cyan-500 text-cyan-700 hover:bg-cyan-50 focus:ring-cyan-500",
      text: "bg-transparent text-cyan-700 hover:bg-cyan-50 focus:ring-cyan-500",
    },
    ghost: {
      contained:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-200",
      outline:
        "bg-transparent text-gray-600 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
      text: "bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-300",
    },
  };

  // Disabled styles
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  // Loading state
  const loadingClasses = "relative";
  const loadingContentClasses = loading ? "invisible" : "";

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Get appropriate color/variant class
  const colorClass = colorMap[color]?.[variant] || colorMap.default.contained;

  // Combine classes
  const classes = [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    colorClass,
    disabled ? disabledClasses : "",
    loading ? loadingClasses : "",
    widthClasses,
    className,
  ].join(" ");

  // Handle button click
  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={`flex items-center ${loadingContentClasses}`}>
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </span>
    </button>
  );
};
