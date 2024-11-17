import { useEffect, useRef } from "react";
import FocusableLinkCell from "../../components/Cell/FocusableLinkCell";
import Grid from "../../components/Grid/Grid";
import { setFocus } from "@hrgui/spatial-navigation-core";
import { scrollTo } from "scroll-polyfill";
import { getChildVisibilityInParent } from "../../utils/DomUtils";

const BrowsePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFocus("a");
  }, []);

  function handleCellFocus(el: HTMLElement) {
    const collectionElRect = el.getBoundingClientRect();
    const rootEl = document.getElementById("main-container");

    const { isFullyVisible } = getChildVisibilityInParent({ parent: rootEl!, child: el });

    if (isFullyVisible) {
      return;
    }

    scrollTo(ref.current!, { top: collectionElRect.top });
  }

  return (
    <div
      className="overflow-hidden absolute w-full h-full @asvw:pl-[160px] @asvw:pt-[40px]"
      ref={ref}
    >
      <Grid>
        <div className="flex @asvw:mb-[80px]">
          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="a"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 0, col: 0 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="b"
            imageUrl="https://placehold.co/528x297/00FF00/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 0, col: 1 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="c"
            imageUrl="https://placehold.co/528x297/FF0000/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 0, col: 2 }}
          />
        </div>

        <div className="flex @asvw:mb-[80px]">
          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="d"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 1, col: 0 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="e"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 1, col: 1 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="f"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 1, col: 2 }}
          />
        </div>

        <div className="flex @asvw:mb-[80px]">
          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="g"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 2, col: 0 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="h"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 2, col: 1 }}
          />

          <FocusableLinkCell
            onSpatialFocus={handleCellFocus}
            isGridCell
            to="/"
            focusKey="i"
            imageUrl="https://placehold.co/528x297/0000FF/FFF"
            header1="NEKO THE ROCK!"
            header2="Sub | Dub"
            header3="14+"
            className="@asvw:mr-[26px]"
            extraProps={{ row: 2, col: 2 }}
          />
        </div>
      </Grid>
    </div>
  );
};

export default BrowsePage;
