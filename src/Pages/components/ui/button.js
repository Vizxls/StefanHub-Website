import React from "react";

// Props: onClick, className, children, size (optional)
export function Button({ onClick, className = "", children, size = "md" }) {
  let sizeClasses = "";

  switch (size) {
    case "sm":
      sizeClasses = "px-3 py-1.5 text-sm";
      break;
    case "md":
      sizeClasses = "px-4 py-2 text-base";
      break;
    case "lg":
      sizeClasses = "px-6 py-3 text-lg";
      break;
    default:
      sizeClasses = "px-4 py-2 text-base";
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition-all duration-300 ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}
