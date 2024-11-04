import React from "react";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";

type Props = {
  children?: React.ReactNode;
  focusKey?: string;
};

const Grid = ({ children, focusKey: _focusKey = "grid" }: Props) => {
  const { ref, focusKey } = useFocusable({
    focusKey: _focusKey,
    isFocusBoundary: false,
    trackChildren: true,
    focusable: true,
    focusBoundaryDirections: ["left", "right", "up", "down"],
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-wrap">
        {children}
      </div>
    </FocusContext.Provider>
  );
};

export default Grid;
