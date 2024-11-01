import { twMerge } from "tailwind-merge";

export type Props = {
  focused?: boolean;
  header1?: string;
  header2?: string;
  header3?: string;
  imageUrl?: string;
};

const Cell = ({ focused, header1, header2, header3, imageUrl }: Props) => {
  return (
    <div className="@asvw:w-[528px] flex-shrink-0">
      <div
        className={twMerge(
          "w-full @asvw:h-[297px] bg-gray-700/100 @asvw:rounded-[26.4px]",
          focused ? "outline outline-white  @asvw:outline-[10px]" : ""
        )}
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="w-full @asvw:h-[171px] @asvw:mt-[24px]">
        <div
          className={`${twMerge(
            "font-semibold text-gray-400/100",
            focused && "text-gray-200/100"
          )} text-headline-s`}
        >
          {header1}
        </div>
        <div className={twMerge("font-semibold text-gray-500/100", focused && "text-gray-300/100")}>
          {header2}
        </div>
        <div className={twMerge("font-semibold text-gray-500/100", focused && "text-gray-300/100")}>
          {header3}
        </div>
      </div>
    </div>
  );
};

export default Cell;
