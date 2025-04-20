import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));

const styleMap = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      theme: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        neutral: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      dimension: {
        normal: "h-10 px-4 py-2",
        small: "h-9 px-3 rounded-md",
        large: "h-11 px-8 rounded-md",
        square: "h-10 w-10",
      },
    },
    defaultVariants: {
      theme: "primary",
      dimension: "normal",
    },
  }
);

const ActionButton = forwardRef(
  ({ asChild = false, className, theme, dimension, ...attrs }, ref) => {
    const Tag = asChild ? Slot : "button";
    return (
      <Tag
        ref={ref}
        className={cn(styleMap({ theme, dimension, className }))}
        {...attrs}
      />
    );
  }
);

ActionButton.displayName = "ActionButton";

export { ActionButton, styleMap };