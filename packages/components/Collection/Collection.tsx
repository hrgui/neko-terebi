import React, { forwardRef } from "react";

export type CollectionProps = {
  header?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Collection = forwardRef<HTMLDivElement, CollectionProps>(
  ({ children, header, ...rest }, ref) => {
    return (
      <div {...rest}>
        {header && <div className="text-body-m">{header}</div>}
        <div className="flex overflow-x-hidden @asvw:pt-[16px] @asvw:pl-[16px]" ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

Collection.displayName = "Collection";

export default Collection;
