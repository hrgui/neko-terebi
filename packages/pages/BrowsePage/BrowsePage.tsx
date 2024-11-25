import { useCallback, useEffect } from "react";
import FocusableLinkCell from "../../components/Cell/FocusableLinkCell";
import Grid from "../../components/Grid/Grid";
import { setFocus } from "@hrgui/spatial-navigation-core";
import { elementScroll, useVirtualizer, VirtualizerOptions } from "@tanstack/react-virtual";
import { useFocusable } from "@hrgui/react-spatial-navigation";

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
  const { ref } = useFocusable({ focusKey: "blah" });

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
    setFocus("0-0");
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
    <div style={{ position: "absolute" }}>
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
      <br />
      <br />
    </div>
  );
}

export default BrowsePage;
