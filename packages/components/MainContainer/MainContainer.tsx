import React from "react";

type Props = {
  children?: React.ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className="w-full bg-black text-white overflow-hidden no-scrollbar aspect-ratio-box">
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full" id="main-container">
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
