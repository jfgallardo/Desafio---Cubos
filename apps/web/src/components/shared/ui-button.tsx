"use client";
import { ReactNode } from "react";

type Variant = "default";
type Color = "primary" | "soft";

type Props = {
  children: ReactNode;
  color: Color;
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const colorVariants: Record<Color, Record<Variant, string>> = {
  primary: {
    default: `bg-ui-purple-900 dark:bg-ui-purple-dark-900 text-white hover:bg-ui-purple-1000 
      dark:hover:bg-ui-purple-dark-1000 active:bg-ui-purple-800 dark:active:bg-ui-purple-dark-800 
      disabled:bg-ui-mauve-dark-900 disabled:text-ui-mauve-dark-alpha-1000 disabled:hover:bg-current`,
  },
  soft: {
    default: `bg-ui-purple-alpha-700 dark:bg-ui-purple-dark-alpha-200 text-white hover:bg-ui-purple-alpha-800 
      dark:hover:bg-ui-purple-dark-alpha-300 active:bg-ui-purple-alpha-100 dark:active:bg-ui-purple-dark-alpha-100 
      disabled:bg-ui-mauve-dark-alpha-300 disabled:text-ui-mauve-dark-alpha-1000 disabled:hover:bg-current`,
  },
};

export default function UIButton({
  children,
  variant = "default",
  color,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: Props) {
  const baseStyles =
    "cursor-pointer rounded-xs px-4 py-2 font-medium text-sm shadow-md hover:shadow-lg focus:shadow-lg";
  const variantStyles = colorVariants[color][variant];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
