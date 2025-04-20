import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));

const TextField = forwardRef(({ className = "", type = "text", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full h-10 px-3 py-2 text-base rounded-md border border-input bg-background ring-offset-background",
        "placeholder:text-muted-foreground file:text-sm file:font-medium file:border-0 file:bg-transparent file:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...rest}
    />
  );
});
TextField.displayName = "TextField";

export { TextField };