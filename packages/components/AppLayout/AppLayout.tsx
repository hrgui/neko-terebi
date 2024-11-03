import React, { forwardRef } from "react";
import CenterContent from "@hrgui/neko-terebi-react-component-center-content";
import MainContainer from "@hrgui/neko-terebi-react-component-main-container";
import GlobalNav from "@hrgui/neko-terebi-react-comp-global-nav";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <CenterContent ref={ref} className="bg-gray-900/100">
      <MainContainer>
        <div className="flex h-full overflow-x-hidden">
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
