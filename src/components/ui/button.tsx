import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-label-md text-label-md transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        filled: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
        tonal: "bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary",
        outline: "border-2 border-outline text-primary dark:text-primary-fixed hover:bg-surface-variant hover:text-on-surface-variant",
        ghost: "bg-transparent text-primary dark:text-primary-fixed hover:bg-surface-variant hover:text-on-surface-variant",
        icon: "bg-transparent text-primary dark:text-primary-fixed hover:bg-primary/10 dark:hover:bg-primary-fixed/10 rounded-full",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-body-lg",
        icon: "p-2 min-h-[48px] min-w-[48px]", // A11y minimum touch target
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If we had Radix UI, we would use Slot here. Since we don't, we'll stick to rendering a button.
    // For Links, users should use `<Link className={buttonVariants({ variant, size, className })}>`.
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
