import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-[0_8px_0_hsl(var(--primary))] hover:shadow-[0_6px_0_hsl(var(--primary))] active:shadow-[0_2px_0_hsl(var(--primary))] translate-y-0 hover:translate-y-[2px] active:translate-y-[6px]",
        secondary: "bg-secondary text-secondary-foreground hover:scale-105 active:scale-95 shadow-[0_8px_0_hsl(var(--secondary))] hover:shadow-[0_6px_0_hsl(var(--secondary))] active:shadow-[0_2px_0_hsl(var(--secondary))] translate-y-0 hover:translate-y-[2px] active:translate-y-[6px]",
        success: "bg-success text-success-foreground hover:scale-105 active:scale-95 shadow-[0_8px_0_hsl(var(--success))] hover:shadow-[0_6px_0_hsl(var(--success))] active:shadow-[0_2px_0_hsl(var(--success))] translate-y-0 hover:translate-y-[2px] active:translate-y-[6px]",
        accent: "bg-accent text-accent-foreground hover:scale-105 active:scale-95 shadow-[0_8px_0_hsl(var(--accent))] hover:shadow-[0_6px_0_hsl(var(--accent))] active:shadow-[0_2px_0_hsl(var(--accent))] translate-y-0 hover:translate-y-[2px] active:translate-y-[6px]",
        destructive: "bg-destructive text-destructive-foreground hover:scale-105 active:scale-95 shadow-[0_8px_0_hsl(var(--destructive))] hover:shadow-[0_6px_0_hsl(var(--destructive))] active:shadow-[0_2px_0_hsl(var(--destructive))] translate-y-0 hover:translate-y-[2px] active:translate-y-[6px]",
        outline: "border-4 border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-3",
        sm: "h-11 px-6 text-base",
        lg: "h-16 px-10 text-xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
