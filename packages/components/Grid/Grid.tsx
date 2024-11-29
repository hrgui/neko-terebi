import React from "react";
import { useFocusable, FocusContext, UseFocusableConfig } from "@hrgui/react-spatial-navigation";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  focusKey?: string;
  focusableProps?: Partial<UseFocusableConfig<any>>;
};

const Grid = ({ children, focusKey: _focusKey = "grid", focusableProps, ...otherProps }: Props) => {
  const { ref, focusKey } = useFocusable({
    focusKey: _focusKey,
    isFocusBoundary: false,
    trackChildren: true,
    focusable: true,
    onGetChildSibling: ({
      isVerticalDirection,
      isIncrementalDirection,
      proposedSibling,
      currentComponent,
    }) => {
      const currentComponentExtraProps = currentComponent.extraProps;
      const proposedSiblingExtraProps = proposedSibling.extraProps;
      const isHorizontalDirection = !isVerticalDirection;

      if (currentComponentExtraProps && proposedSiblingExtraProps) {
        if (isHorizontalDirection) {
          const currentRow = currentComponentExtraProps.row;
          const nextIndex = currentComponentExtraProps.col + 1;
          const prevIndex = currentComponentExtraProps.col - 1;

          return isIncrementalDirection
            ? currentRow === proposedSiblingExtraProps.row &&
                nextIndex === proposedSiblingExtraProps.col
            : currentRow === proposedSiblingExtraProps.row &&
                prevIndex === proposedSiblingExtraProps.col;
        } else {
          const nextIndex = currentComponentExtraProps.row + 1;
          const prevIndex = currentComponentExtraProps.row - 1;

          return isIncrementalDirection
            ? nextIndex === proposedSiblingExtraProps.row
            : prevIndex === proposedSiblingExtraProps.row;
        }
      }

      return false;
    },
    ...focusableProps,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-wrap relative" {...otherProps}>
        {children}
      </div>
    </FocusContext.Provider>
  );
};

export default Grid;
