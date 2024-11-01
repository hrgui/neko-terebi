import React, { forwardRef } from "react";

type Props = {
  header?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Collection = forwardRef<HTMLDivElement, Props>(({ children, header, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      <div className="text-body-m @asvw:mb-[16px]">{header}</div>
      <div className="flex gap-4">{children}</div>
    </div>
  );
});

Collection.displayName = "Collection";

export default Collection;
