import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./rainbow-button.css";

interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={className ? `rainbow-button ${className}` : "rainbow-button"}
      {...props}
    >
      {children}
    </button>
  );
}
