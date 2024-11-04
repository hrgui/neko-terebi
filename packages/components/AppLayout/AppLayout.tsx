import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import CenterContent from "@hrgui/neko-terebi-react-component-center-content";
import MainContainer from "@hrgui/neko-terebi-react-component-main-container";
import GlobalNav from "@hrgui/neko-terebi-react-comp-global-nav";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const onLayoutScroll = useCallback((e: Event) => {
    if (!parentRef.current) {
      return;
    }
    const customEvent = e as CustomEvent<any>;

    // Get the element's position relative to the top of the page
    const topPosition = customEvent.detail.top + parentRef.current.scrollTop;

    parentRef.current.scroll({ top: topPosition < customEvent.detail.height ? 0 : topPosition });
  }, []);

  useEffect(() => {
    window.addEventListener("layout/scroll", onLayoutScroll);

    return () => {
      window.removeEventListener("layout/scroll", onLayoutScroll);
    };
  }, [onLayoutScroll]);

  return (
    <CenterContent ref={ref} className="bg-gray-900/100">
      <MainContainer>
        <div ref={parentRef} className="flex h-full overflow-x-hidden">
          <GlobalNav />
          <div className="@asvw:pt-[40px] @asvw:pr-[40px] @asvw:ml-[170px] w-full h-full flex-shrink-0 text-body-m font-semibold">
            {children}
          </div>
        </div>
      </MainContainer>
    </CenterContent>
  );
});

export default AppLayout;
