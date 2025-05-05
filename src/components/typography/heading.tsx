import { cn } from "@/lib/utils";
import React, { FC } from "react";

const Heading: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={cn(
        "text-xl lg:3xl text font-bold text-black dark:text-white",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading;
