import type React from "react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export function CustomButton({ className, variant = "primary", size = "md", children, ...props }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors",
        {
          "bg-[#2e2a4d] text-white hover:bg-[#2e2a4d]/90": variant === "primary",
          "bg-white/20 text-[#2e2a4d] hover:bg-white/30 border border-[#2e2a4d]/20": variant === "secondary",
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-3 text-base": size === "md",
          "px-6 py-4 text-lg": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
