import { Link, LinkProps } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import { useFocusable } from "@hrgui/react-spatial-navigation";

export interface FocusableLinkProps {
  focusKey?: string;
  focusClassName?: string;
  className?: string;
}

export function FocusableLink({
  focusKey,
  focusClassName,
  className,
  ...props
}: LinkProps & FocusableLinkProps) {
  const { ref, focused } = useFocusable({
    focusKey: focusKey,
    onEnterPress: () => {
      const currentEl = ref.current as HTMLElement;

      if (!currentEl) {
        return;
      }

      currentEl.click();
    },
  });

  return (
    <Link {...props} ref={ref} className={twMerge(className, focused ? focusClassName : "")} />
  );
}
