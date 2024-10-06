import React from "react";
import CenterContent from "../CenterContent/CenterContent";
import MainContainer from "../MainContainer/MainContainer";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <CenterContent className="bg-black">
      <MainContainer>{children}</MainContainer>
    </CenterContent>
  );
};

export default AppLayout;
