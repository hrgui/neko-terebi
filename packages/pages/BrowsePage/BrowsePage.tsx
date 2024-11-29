import { useCallback, useEffect, useRef, useState } from "react";
import FocusableLinkCell from "../../components/Cell/FocusableLinkCell";
import Grid from "../../components/Grid/Grid";
import { setFocus } from "@hrgui/spatial-navigation-core";
import { elementScroll, useVirtualizer, VirtualizerOptions } from "@tanstack/react-virtual";
import { FocusContext, useFocusable } from "@hrgui/react-spatial-navigation";
import { FocusableLink } from "../../components/FocusableLink/FocusableLink";

const SAMPLE_FILTERS = [
  { id: "popular", title: "Popular" },
  { id: "newly added", title: "Newly Added" },
  { id: "alphabetical", title: "A-Z" },
];

const SAMPLE_CATEGORIES = [
  { id: "action", title: "Action" },
  { id: "adventure", title: "Adventure" },
  { id: "comedy", title: "Comedy" },
  { id: "drama", title: "Drama" },
  { id: "fantasy", title: "Fantasy" },
  { id: "music", title: "Music" },
  { id: "romance", title: "Romance" },
  { id: "sci-fi", title: "Sci-Fi" },
  { id: "seinen", title: "Seinen" },
  { id: "shojo", title: "Shojo" },
  { id: "shonen", title: "Shonen" },
  { id: "slice of life", title: "Slice of life" },
  { id: "sports", title: "Sports" },
  { id: "supernatural", title: "Supernatural" },
  { id: "thriller", title: "Thriller" },
];

function getRandomColors(): string {
  // Helper function to generate a random hex color
  const randomHexColor = () =>
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  // Helper function to calculate luminance
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const sRGB = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  // Helper function to calculate contrast ratio
  const getContrastRatio = (lum1: number, lum2: number): number =>
    (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  let bg, fg;
  do {
    bg = randomHexColor();
    const bgLuminance = getLuminance(bg);

    // Choose black or white for foreground based on contrast ratio
    const blackContrast = getContrastRatio(bgLuminance, getLuminance("000000"));

    fg = blackContrast >= 4.5 ? "000000" : "ffffff";
  } while (!fg); // Ensure fg is set

  return `${bg}/${fg}`;
}

function BrowsePage() {
  const [isNavFocused, setIsNavFocused] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
    setFocus("browse-filter-popular");
  }, []);

  const scrollToFn: VirtualizerOptions<any, any>["scrollToFn"] = useCallback(
    (offset, canSmooth, instance) => {
      const start = ref.current?.scrollTop || 0;

      elementScroll(start + (offset - start), canSmooth, instance);
    },
    [ref]
  );

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => ref.current,
    estimateSize: () => 481,
    overscan: 5,
    scrollToFn,
  });

  function handleCellFocus(el: Element) {
    rowVirtualizer.scrollToIndex(+(el.getAttribute("data-index") || 0));
  }

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
          {SAMPLE_FILTERS.map((filter) => {
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

          {SAMPLE_CATEGORIES.map((category) => {
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
      <div
        ref={ref}
        className="List"
        style={{
          height: `${window.innerHeight}px`,
          width: `${window.innerWidth}px`,
          overflow: "auto",
          paddingLeft: 160,
          paddingTop: 40,
        }}
      >
        <Grid
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
          focusableProps={{
            getSiblings(components) {
              return [components["filters"]];
            },
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const index = virtualRow.index;
            const col1Color = getRandomColors();
            const col2Color = getRandomColors();
            const col3Color = getRandomColors();

            return (
              <div
                key={virtualRow.index}
                className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
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
                <FocusableLinkCell
                  data-index={`${index}`}
                  onSpatialFocus={handleCellFocus}
                  isGridCell
                  to="/"
                  focusKey={`${index}-0`}
                  imageUrl={`https://placehold.co/528x297/${col1Color}`}
                  header1={`NEKO THE ROCK!` + index + "-" + 0}
                  header2="Sub | Dub"
                  header3="14+"
                  className="@asvw:mr-[26px]"
                  extraProps={{ row: index, col: 0 }}
                />
                <FocusableLinkCell
                  data-index={`${index}`}
                  onSpatialFocus={handleCellFocus}
                  isGridCell
                  to="/"
                  focusKey={`${index}-1`}
                  imageUrl={`https://placehold.co/528x297/${col2Color}`}
                  header1={`NEKO THE ROCK!` + index + "-" + 1}
                  header2="Sub | Dub"
                  header3="14+"
                  className="@asvw:mr-[26px]"
                  extraProps={{ row: index, col: 1 }}
                />
                <FocusableLinkCell
                  data-index={`${index}`}
                  onSpatialFocus={handleCellFocus}
                  isGridCell
                  to="/"
                  focusKey={`${index}-2`}
                  imageUrl={`https://placehold.co/528x297/${col3Color}`}
                  header1={`NEKO THE ROCK!` + index + "-" + 2}
                  header2="Sub | Dub"
                  header3="14+"
                  className="@asvw:mr-[26px]"
                  extraProps={{ row: index, col: 2 }}
                />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default BrowsePage;
