import * as React from "react";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

export const MenuRoot = Menu.Root;
export const MenuTrigger = Menu.Trigger;
export const MenuGroup = Menu.Group;
export const MenuPortal = Menu.Portal;
export const MenuSub = Menu.Sub;
export const MenuRadioGroup = Menu.RadioGroup;

export const MenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...rest }, ref) => (
    <Menu.SubTrigger
      ref={ref}
      className={cn(
        "flex items-center gap-2 cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </Menu.SubTrigger>
  )
);
MenuSubTrigger.displayName = "MenuSubTrigger";

export const MenuSubContent = React.forwardRef(
  ({ className, ...rest }, ref) => (
    <Menu.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...rest}
    />
  )
);
MenuSubContent.displayName = "MenuSubContent";

export const MenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...rest }, ref) => (
    <Menu.Portal>
      <Menu.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 origin-[--radix-dropdown-menu-content-transform-origin]",
          className
        )}
        {...rest}
      />
    </Menu.Portal>
  )
);
MenuContent.displayName = "MenuContent";

export const MenuItem = React.forwardRef(
  ({ className, inset, ...rest }, ref) => (
    <Menu.Item
      ref={ref}
      className={cn(
        "flex items-center gap-2 relative cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...rest}
    />
  )
);
MenuItem.displayName = "MenuItem";

export const MenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...rest }, ref) => (
    <Menu.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none cursor-default transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <Check className="h-4 w-4" />
        </Menu.ItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  )
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";

export const MenuRadioItem = React.forwardRef(
  ({ className, children, ...rest }, ref) => (
    <Menu.RadioItem
      ref={ref}
      className={cn(
        "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none cursor-default transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </Menu.ItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  )
);
MenuRadioItem.displayName = "MenuRadioItem";

export const MenuLabel = React.forwardRef(
  ({ className, inset, ...rest }, ref) => (
    <Menu.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...rest}
    />
  )
);
MenuLabel.displayName = "MenuLabel";

export const MenuSeparator = React.forwardRef(
  ({ className, ...rest }, ref) => (
    <Menu.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...rest}
    />
  )
);
MenuSeparator.displayName = "MenuSeparator";

export const MenuShortcut = ({ className, ...rest }) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...rest}
  />
);
MenuShortcut.displayName = "MenuShortcut";