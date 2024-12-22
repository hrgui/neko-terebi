import { FocusContext, useFocusable } from "@hrgui/react-spatial-navigation";
import { FocusableLink } from "../../components/FocusableLink/FocusableLink";
import { useCallback, useState } from "react";
import { elementScroll, useVirtualizer, VirtualizerOptions } from "@tanstack/react-virtual";

type Props = {
  filters: { id: string; title: string }[];
  categories: { id: string; title: string }[];
};

const BrowseSideNav = ({ filters, categories }: Props) => {
  const [isNavFocused, setIsNavFocused] = useState(true);

  const { ref: ref2, focusKey } = useFocusable({
    focusKey: "filters",
    saveLastFocusedChild: true,
    focusable: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    onChildUpdateFocus(newState) {
      setIsNavFocused(newState);
    },
  });

  const scrollToFn: VirtualizerOptions<any, any>["scrollToFn"] = useCallback(
    (offset, canSmooth, instance) => {
      const start = ref2.current?.scrollTop || 0;

      elementScroll(start + (offset - start), canSmooth, instance);
    },
    [ref2]
  );

  const rowVirtualizer = useVirtualizer({
    count: filters.length + categories.length,
    getScrollElement: () => ref2.current,
    estimateSize: () => 72,
    overscan: 5,
    scrollToFn,
  });

  return (
    <div className="flex relative">
      <FocusContext.Provider value={focusKey}>
        <div
          className="flex-shrink-0  @asvw:w-[420px]"
          ref={ref2}
          style={{
            position: "relative",
            left: 0,
            width: !isNavFocused ? 0 : undefined,
            height: `${window.innerHeight}px`,
            overflow: "auto",
            visibility: !isNavFocused ? "hidden" : undefined,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
            const currentIndex = virtualRow.index;
            const currentType = currentIndex >= filters.length ? "category" : "filter";
            const currentSet = currentIndex >= filters.length ? categories : filters;
            const correctedIndex =
              currentType === "category" ? currentIndex - filters.length : currentIndex;
            const currentItem = currentSet[correctedIndex];

            return (
              <FocusableLink
                focusKey={`browse-${currentType}-${currentItem.id}`}
                className="flex items-center text-cta @asvw:h-[72px] mb-auto w-full  @asvw:p-[16px] @asvw:rounded-[10px]"
                focusClassName="bg-primary/100"
                to="/browse"
                key={virtualRow.index}
                onFocus={() => {
                  rowVirtualizer.scrollToIndex(+index);
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                }}
              >
                <span>{currentItem.title}</span>
              </FocusableLink>
            );
          })}
        </div>
      </FocusContext.Provider>
    </div>
  );
};

export default BrowseSideNav;
