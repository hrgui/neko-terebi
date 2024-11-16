import { useEffect } from "react";
import Collection, { CollectionProps } from "./Collection";
import { useFocusable, FocusContext } from "@hrgui/react-spatial-navigation";

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
