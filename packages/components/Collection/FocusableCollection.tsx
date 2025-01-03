import { useEffect } from "react";
import Collection, { CollectionProps } from "./Collection";
import { useFocusable, FocusContext } from "@hrgui/react-spatial-navigation";
import { scroll } from "scroll-polyfill";
import { getChildVisibilityInParent } from "../../utils/dom-utils";

type FocusableCollectionProps = {
  focusKey: string;
  onFocusedChild?: any;
} & CollectionProps;

const FocusableCollection = ({
  focusKey: _focusKey,
  onFocusedChild,
  ...props
}: FocusableCollectionProps) => {
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    focusKey: _focusKey,
    isFocusBoundary: false,
    trackChildren: true,
    focusable: true,
    focusBoundaryDirections: ["left", "right"],
    onChildUpdateFocus(focused, focusableComponent) {
      if (!focused || !focusableComponent) {
        return;
      }

      const node = focusableComponent.layout?.node || null;
      const leftPosition = node?.getBoundingClientRect().left || 0;
      const el = ref.current;

      const { isFullyVisible } = getChildVisibilityInParent({ parent: el, child: node! });

      if (el && !isFullyVisible) {
        scroll(el, { left: leftPosition > 0 ? leftPosition : 0 });
      }
    },
  });

  useEffect(() => {
    if (!hasFocusedChild) {
      return;
    }

    onFocusedChild?.(ref.current);
  }, [hasFocusedChild, onFocusedChild, ref]);

  return (
    <FocusContext.Provider value={focusKey}>
      <Collection ref={ref} {...props} />
    </FocusContext.Provider>
  );
};

export default FocusableCollection;
