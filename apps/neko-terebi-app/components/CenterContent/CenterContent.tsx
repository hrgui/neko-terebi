import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CenterContent = forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={twMerge(`flex items-center justify-center h-screen`, className)}>
      {children}
    </div>
  );
});

export default CenterContent;
