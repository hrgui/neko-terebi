import { useEffect } from "react";
import { FocusableLink } from "../FocusableLink/FocusableLink";
import { setFocus, useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";

const GlobalNav = () => {
  const { ref, focusKey } = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ["up", "down"],
  });

  useEffect(() => {
    setFocus("global-nav-home");
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="flex flex-col text-cta font-semibold @asvw:w-[400px] @asvw:pl-[40px] h-full @asvw:pr-[40px] @asvw:pt-[40px] @asvw:pb-[40px]"
      >
        <FocusableLink
          to="/home"
          className="flex items-center mb-auto w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">account_circle</span> User
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-search"
          to="/search"
          className="flex items-center  w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">search</span> Search
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-home"
          to="/home"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">home</span> Home
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-watchlist"
          to="/watchlist"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">subscriptions</span> Watchlist
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-history"
          to="/history"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">search_activity</span> History
        </FocusableLink>
        <FocusableLink
          focusKey="global-nav-browse"
          to="/browse"
          className="flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">web</span> Browse
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-pokemon"
          to="/pokemon/1"
          className="flex items-center  w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">web</span> Pokemon
        </FocusableLink>

        <FocusableLink
          focusKey="global-nav-settings"
          to="/settings"
          className="mt-auto flex items-center w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100"
        >
          <span className="material-symbols-outlined @asvw:mr-[10px]">settings</span> Settings
        </FocusableLink>
      </div>
    </FocusContext.Provider>
  );
};

export default GlobalNav;
