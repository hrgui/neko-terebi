import { useEffect } from "react";
import { setFocus } from "@hrgui/spatial-navigation-core";
import BrowseGrid from "./BrowseGrid";
import BrowseSideNav from "./BrowseSideNav";

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

function BrowsePage() {
  useEffect(() => {
    setFocus("browse-filter-popular");
  }, []);

  return (
    <div className="flex">
      <BrowseSideNav categories={SAMPLE_CATEGORIES} filters={SAMPLE_FILTERS} />
      <BrowseGrid />
    </div>
  );
}

export default BrowsePage;
