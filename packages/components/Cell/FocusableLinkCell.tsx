import { useFocusable } from "@hrgui/react-spatial-navigation";
import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Cell, { CellProps } from "./Cell";
import { useEffect } from "react";

type Props = {
  focusKey?: string;
  focusClassName?: string;
  isGridCell?: boolean;
  extraProps?: any;
  onSpatialFocus?: any;
} & LinkProps &
  CellProps;

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isCollectionInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function isInRowViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

const FocusableLinkCell = ({
  focusKey,
  className,
  to,
  header1,
  header2,
  header3,
  imageUrl,
  isGridCell = false,
  extraProps,
  onSpatialFocus,
}: Props) => {
  const { ref, focused } = useFocusable({
    focusKey: focusKey,
    onEnterPress: () => {
      const currentEl = ref.current as HTMLElement;

      if (!currentEl) {
        return;
      }

      currentEl.click();
    },
    extraProps: extraProps,
  });

  useEffect(() => {
    if (isGridCell) {
      return;
    }

    if (!focused) {
      return;
    }

    const currentElement = ref.current as HTMLElement;
    const parentEl = currentElement.parentNode as HTMLElement;
    const rect = currentElement.getBoundingClientRect();

    if (isInViewport(currentElement)) {
      return;
    }

    if (!parentEl) {
      return;
    }

    if (!isCollectionInViewport(parentEl)) {
      return;
    }

    (parentEl as any).currentScrollLeftPosition = (parentEl as any).currentScrollLeftPosition ?? 0;

    if (rect.left < 0) {
      // need to add
      (parentEl as any).currentScrollLeftPosition =
        (parentEl as any).currentScrollLeftPosition + rect.width;
    } else {
      // need to subtract
      (parentEl as any).currentScrollLeftPosition =
        (parentEl as any).currentScrollLeftPosition - rect.width;
    }

    parentEl.style.transform = `translateX(${(parentEl as any).currentScrollLeftPosition}px)`;

    onSpatialFocus?.(ref.current);
  }, [focused, ref, isGridCell, onSpatialFocus]);

  useEffect(() => {
    if (!isGridCell) {
      return;
    }

    if (!focused) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const currentElement = ref.current as HTMLElement;
    const parentEl = currentElement.parentNode as HTMLElement;
    const rect = currentElement.getBoundingClientRect();

    if (isInRowViewport(currentElement)) {
      return;
    }

    if (!parentEl) {
      return;
    }

    onSpatialFocus?.(ref.current);
  }, [focused, ref, isGridCell, onSpatialFocus]);

  return (
    <Link to={to} ref={ref} className={twMerge(className)}>
      <Cell focused={focused} {...{ header1, header2, header3, imageUrl }} />
    </Link>
  );
};

export default FocusableLinkCell;
