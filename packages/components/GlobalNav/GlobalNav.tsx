import { useEffect } from "react";
import { FocusableLink } from "../FocusableLink/FocusableLink";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

const GlobalNav = () => {
  useEffect(() => {
    setFocus("global-nav-home");
  }, []);

  return (
    <div className="flex flex-col @asvw:w-[400px]">
      <FocusableLink
        focusKey="global-nav-search"
        to="/search"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Search
      </FocusableLink>
      <FocusableLink
        focusKey="global-nav-home"
        to="/home"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Home
      </FocusableLink>
      <FocusableLink
        focusKey="global-nav-watchlist"
        to="/watchlist"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Watchlist
      </FocusableLink>
      <FocusableLink
        focusKey="global-nav-history"
        to="/history"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        History
      </FocusableLink>
      <FocusableLink
        focusKey="global-nav-browse"
        to="/browse"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Browse
      </FocusableLink>

      <FocusableLink
        focusKey="global-nav-browse"
        to="/pokemon/1"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Pokemon
      </FocusableLink>

      <FocusableLink
        focusKey="global-nav-settings"
        to="/settings"
        className="w-full @asvw:pl-[40px] @asvw:pt-[16px] @asvw:pb-[16px]"
        focusClassName="bg-blue-500/100"
      >
        Settings
      </FocusableLink>
    </div>
  );
};

export default GlobalNav;
