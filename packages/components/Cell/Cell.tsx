import { twMerge } from "tailwind-merge";

export type Props = {
  focused?: boolean;
};

const Cell = ({ focused }: Props) => {
  return (
    <div className="@asvw:w-[528px]">
      <div
        className={twMerge(
          "w-full @asvw:h-[297px] bg-gray-500/100 @asvw:rounded-[26.4px]",
          focused ? "outline outline-white  @asvw:outline-[10px]" : ""
        )}
      ></div>
      <div className="w-full @asvw:h-[171px] bg-gray-200 @asvw:mt-[24px]"></div>
    </div>
  );
};

export default Cell;
