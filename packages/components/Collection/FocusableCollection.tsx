import { useEffect } from "react";
import Collection, { CollectionProps } from "./Collection";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";

type FocusableCollectionProps = {
  focusKey: string;
} & CollectionProps;

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

const FocusableCollection = ({ focusKey: _focusKey, ...props }: FocusableCollectionProps) => {
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    focusKey: _focusKey,
    isFocusBoundary: false,
    trackChildren: true,
    focusable: true,
    focusBoundaryDirections: ["left", "right"],
  });

  useEffect(() => {
    if (!hasFocusedChild) {
      return;
    }

    if (!ref.current) {
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

    (parentEl as any).currentScrollTopPosition = (parentEl as any).currentScrollTopPosition ?? 0;

    if (rect.y < 0) {
      // need to add
      (parentEl as any).currentScrollTopPosition =
        (parentEl as any).currentScrollTopPosition + rect.height;
    } else {
      // need to subtract
      (parentEl as any).currentScrollTopPosition =
        (parentEl as any).currentScrollTopPosition - rect.height;
    }

    parentEl.style.transform = `translateY(${(parentEl as any).currentScrollTopPosition}px)`;
  }, [hasFocusedChild, ref]);

  return (
    <FocusContext.Provider value={focusKey}>
      <Collection ref={ref} {...props} />
    </FocusContext.Provider>
  );
};

export default FocusableCollection;