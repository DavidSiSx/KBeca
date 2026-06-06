import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-label-bold text-label-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-200",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-on-primary border-2 border-on-background hover:bg-surface-tint active:translate-y-0.5 active:translate-x-0.5 active:shadow-none shadow-[4px_4px_0px_0px_#1c1c18]",
        tonal:
          "bg-secondary-container text-on-secondary-container border border-outline-variant hover:bg-secondary-fixed-dim",
        outline:
          "border-2 border-on-background text-on-background bg-transparent hover:bg-surface-container-high",
        ghost:
          "bg-transparent text-primary hover:bg-surface-variant hover:text-on-surface-variant",
        icon: "bg-transparent text-on-surface hover:bg-surface-container-high rounded-full",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-body-lg",
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
