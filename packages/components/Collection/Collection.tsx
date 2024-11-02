import React, { forwardRef } from "react";

export type CollectionProps = {
  header?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Collection = forwardRef<HTMLDivElement, CollectionProps>(
  ({ children, header, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <div className="text-body-m @asvw:mb-[16px]">{header}</div>
        <div className="flex">{children}</div>
      </div>
    );
  }
);

Collection.displayName = "Collection";

export default Collection;
