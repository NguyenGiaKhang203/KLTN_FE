import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import "./style.css"; // Import file CSS riêng

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={`separator ${
        orientation === "horizontal" ? "horizontal" : "vertical"
      } ${className}`}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
