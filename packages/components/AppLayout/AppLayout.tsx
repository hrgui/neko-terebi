import React, { forwardRef } from "react";
import CenterContent from "@hrgui/neko-terebi-react-component-center-content";
import MainContainer from "@hrgui/neko-terebi-react-component-main-container";
import GlobalNav from "@hrgui/neko-terebi-react-comp-global-nav";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <CenterContent ref={ref} className="bg-gray-900">
      <MainContainer>
        <div className="flex h-full overflow-x-hidden">
          <GlobalNav />
          {children}
        </div>
      </MainContainer>
    </CenterContent>
  );
});

export default AppLayout;
