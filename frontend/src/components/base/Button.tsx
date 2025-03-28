import clsx from "clsx";
import { HTMLAttributes } from "react";

type size = "small" | "medium" | "large";
type color = "primary" | "secondary" | "danger" | "success" | "cancel";

const sizeMap: Record<size, string> = {
  small: "text-sm p-2",
  medium: "text-base p-3",
  large: "text-lg p-4",
};

const colorMap: Record<color, string> = {
  primary: "bg-blue-500",
  secondary: "bg-gray-600",
  danger: "bg-red-500",
  success: "bg-green-500",
  cancel: "bg-gray-400",
};

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  color?: color; //default: primary
  size?: size; //default: medium
}

export default function Button({
  size = "medium",
  color = "primary",
  ...props
}: ButtonProps) {
  return (
    <div
      {...props}
      className={clsx(
        "cursor-pointer backdrop-blur-2xl rounded-lg font-semibold items-center gap-4 text-white flex justify-center active:scale-95 transition-all",
        {
          "opacity-50 active:!scale-100": props.disabled,
        },
        sizeMap[size],
        colorMap[color],
        props.className,
      )}
    />
  );
}
