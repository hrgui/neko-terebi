export const pxToVwNumber = (px, screenWidth = 1920) => {
  return (px / screenWidth) * 100;
};

export const pxToVw = (px, screenWidth = 1920) => {
  return pxToVwNumber(px, screenWidth) + "vw";
};
