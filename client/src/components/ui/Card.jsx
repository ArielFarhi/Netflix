import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));

const Card = forwardRef(function CardComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...rest}
    />
  );
});
Card.displayName = "Card";

const CardHeader = forwardRef(function CardHeaderComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 p-6", className)}
      {...rest}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(function CardTitleComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("text-xl font-bold tracking-tight", className)}
      {...rest}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(function CardDescriptionComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted", className)}
      {...rest}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(function CardContentComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-2", className)}
      {...rest}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(function CardFooterComponent({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-6 pt-2", className)}
      {...rest}
    />
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};