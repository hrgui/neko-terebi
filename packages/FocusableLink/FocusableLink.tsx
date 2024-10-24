import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export interface FocusableLinkProps {
  focusKey?: string;
  focusClassName?: string;
}

export function FocusableLink(props: LinkProps & FocusableLinkProps) {
  const { ref, focused } = useFocusable({ focusKey: props.focusKey });
  return (
    <Link
      {...props}
      ref={ref}
      className={twMerge(props.className, focused ? props.focusClassName : "")}
    />
  );
}
