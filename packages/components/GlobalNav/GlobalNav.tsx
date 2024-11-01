import { useEffect } from "react";
import { FocusableLink } from "../FocusableLink/FocusableLink";
import { setFocus, useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { twMerge } from "tailwind-merge";

const GlobalNav = () => {
  const { ref, focusKey, hasFocusedChild, focused } = useFocusable({
    focusKey: "menu",
    isFocusBoundary: true,
    trackChildren: true,
    focusBoundaryDirections: ["up", "down"],
  });

  const isFocused = hasFocusedChild || focused;

  useEffect(() => {
    setFocus("global-nav-home");
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={twMerge(
          "flex flex-col text-cta font-semibold @asvw:pl-[40px] h-full @asvw:pr-[40px] @asvw:pt-[40px] @asvw:pb-[40px]",
          !isFocused ? "@asvw:w-[160px]" : "@asvw:w-[400px]"
        )}
      >
        <FocusableLink
          to="/home"
          className="flex items-center mb-auto w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">account_circle</span>
          {isFocused && <span>User</span>}
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-search"
          to="/search"
          className="flex items-center  w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">search</span>
          {isFocused && <span>Search</span>}
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-home"
          to="/home"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">home</span>
          {isFocused && <span>Home</span>}
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-watchlist"
          to="/watchlist"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">subscriptions</span>
          {isFocused && <span>Watchlist</span>}
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-history"
          to="/history"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">search_activity</span>
          {isFocused && <span>History</span>}
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-browse"
          to="/browse"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">web</span>
          {isFocused && <span>Browse</span>}
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-pokemon"
          to="/pokemon/1"
          className="flex items-center  w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">web</span>
          {isFocused && <span>Pokemon</span>}
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-settings"
          to="/settings"
          className="mt-auto flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">settings</span>
          {isFocused && <span>Settings</span>}
        </FocusableLink>
      </div>
    </FocusContext.Provider>
  );
};

export default GlobalNav;
