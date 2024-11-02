import Collection, { CollectionProps } from "./Collection";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";

type FocusableCollectionProps = {
  focusKey: string;
} & CollectionProps;

const FocusableCollection = ({ focusKey: _focusKey, ...props }: FocusableCollectionProps) => {
  const { ref, focusKey } = useFocusable({
    focusKey: _focusKey,
    isFocusBoundary: false,
    trackChildren: true,
    focusable: true,
    focusBoundaryDirections: ["left", "right"],
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <Collection ref={ref} {...props} />
    </FocusContext.Provider>
  );
};

export default FocusableCollection;
