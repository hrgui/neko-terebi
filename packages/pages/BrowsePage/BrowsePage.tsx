import { useEffect } from "react";
import FocusableLinkCell from "../../components/Cell/FocusableLinkCell";
import Grid from "../../components/Grid/Grid";
import { setFocus } from "@hrgui/spatial-navigation-core";

const BrowsePage = () => {
  useEffect(() => {
    setFocus("a");
  }, []);

  return (
    <Grid>
      <div className="flex">
        <FocusableLinkCell
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

      <div className="flex">
        <FocusableLinkCell
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

      <div className="flex">
        <FocusableLinkCell
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
  );
};

export default BrowsePage;
