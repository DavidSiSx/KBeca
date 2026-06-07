import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-display-md uppercase tracking-wider font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] duration-200",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-on-primary border-[3px] border-on-background hover:bg-surface-tint active:translate-y-[4px] active:translate-x-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18]",
        tonal:
          "bg-surface-variant text-on-surface border-[3px] border-on-background hover:bg-surface-container-high active:translate-y-[4px] active:translate-x-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18]",
        outline:
          "border-[3px] border-on-background text-on-background bg-transparent hover:bg-surface-container-high active:translate-y-[4px] active:translate-x-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#1c1c18] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1c1c18]",
        ghost:
          "bg-transparent text-primary hover:bg-surface-variant hover:text-on-surface-variant",
        icon: "bg-transparent text-on-surface hover:bg-surface-container-high rounded-full",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "p-2 min-h-[48px] min-w-[48px]",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}

export { buttonVariants };
