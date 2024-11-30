import { FocusContext, useFocusable } from "@hrgui/react-spatial-navigation";
import { FocusableLink } from "../../components/FocusableLink/FocusableLink";
import { useState } from "react";

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

  return (
    <div className="flex">
      <FocusContext.Provider value={focusKey}>
        <div
          className="flex-shrink-0 @asvw:w-[420px]"
          ref={ref2}
          style={{
            marginLeft: isNavFocused ? 160 : 0,
            width: !isNavFocused ? 0 : undefined,
            display: !isNavFocused ? "none" : undefined,
          }}
        >
          {filters.map((filter) => {
            return (
              <FocusableLink
                key={filter.id}
                focusKey={`browse-filter-${filter.id}`}
                className="flex items-center text-cta @asvw:h-[72px] mb-auto w-full  @asvw:p-[16px] @asvw:rounded-[10px]"
                focusClassName="bg-primary/100"
                to="/browse"
              >
                <span>{filter.title}</span>
              </FocusableLink>
            );
          })}

          {categories.map((category) => {
            return (
              <FocusableLink
                key={category.id}
                focusKey={`browse-category-${category.id}`}
                className="flex items-center text-cta @asvw:h-[72px] mb-auto w-full  @asvw:p-[16px] @asvw:rounded-[10px]"
                focusClassName="bg-primary/100"
                to="/browse"
              >
                <span>{category.title}</span>
              </FocusableLink>
            );
          })}
        </div>
      </FocusContext.Provider>
    </div>
  );
};

export default BrowseSideNav;
