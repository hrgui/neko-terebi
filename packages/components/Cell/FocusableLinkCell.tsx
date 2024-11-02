import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Cell, { CellProps } from "./Cell";

type Props = {
  focusKey?: string;
  focusClassName?: string;
} & LinkProps &
  CellProps;

const FocusableLinkCell = ({
  focusKey,
  className,
  to,
  header1,
  header2,
  header3,
  imageUrl,
}: Props) => {
  const { ref, focused } = useFocusable({ focusKey: focusKey });
  return (
    <Link to={to} ref={ref} className={twMerge(className)}>
      <Cell focused={focused} {...{ header1, header2, header3, imageUrl }} />
    </Link>
  );
};

export default FocusableLinkCell;
