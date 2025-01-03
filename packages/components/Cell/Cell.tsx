import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type CellProps = {
  focused?: boolean;
  header1?: string;
  header2?: string;
  header3?: string;
  imageUrl?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ focused, header1, header2, header3, imageUrl, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={twMerge("@asvw:w-[528px] flex-shrink-0", className)} {...rest}>
        <div
          className={twMerge(
            "w-full @asvw:h-[297px] bg-gray-700 @asvw:rounded-[26.4px]",
            focused ? "outline-cell" : ""
          )}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-full  @asvw:mt-[16px]">
          <div
            className={`${twMerge("font-semibold text-gray-400", focused && "text-gray-200")}
            text-cta
            `}
          >
            {header1}
          </div>
          <div className={twMerge("font-semibold text-gray-500", focused && "text-gray-300")}>
            {header2}
          </div>
          <div className={twMerge("font-semibold text-gray-500", focused && "text-gray-300")}>
            {header3}
          </div>
        </div>
      </div>
    );
  }
);

Cell.displayName = "Cell";

export default Cell;
