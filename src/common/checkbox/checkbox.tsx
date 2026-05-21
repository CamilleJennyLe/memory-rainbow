import type { InputHTMLAttributes } from "react";
import "./checkbox.css";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={className ? `checkbox ${className}` : "checkbox"}
      {...props}
    />
  );
}
