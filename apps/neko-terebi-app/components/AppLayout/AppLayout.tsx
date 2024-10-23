import React from "react";
import CenterContent from "../CenterContent/CenterContent";
import MainContainer from "../MainContainer/MainContainer";

type Props = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <CenterContent className="bg-gray-900">
      <MainContainer>{children}</MainContainer>
    </CenterContent>
  );
};

export default AppLayout;
