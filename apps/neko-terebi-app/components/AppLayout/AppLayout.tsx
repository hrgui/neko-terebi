import React, { forwardRef } from "react";
import CenterContent from "../CenterContent/CenterContent";
import MainContainer from "../MainContainer/MainContainer";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <CenterContent ref={ref} className="bg-gray-900/100">
      <MainContainer>{children}</MainContainer>
    </CenterContent>
  );
});

export default AppLayout;
