export function getRandomColors(): string {
  // Helper function to generate a random hex color
  const randomHexColor = () =>
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  // Helper function to calculate luminance
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const sRGB = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  // Helper function to calculate contrast ratio
  const getContrastRatio = (lum1: number, lum2: number): number =>
    (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  let bg, fg;
  do {
    bg = randomHexColor();
    const bgLuminance = getLuminance(bg);

    // Choose black or white for foreground based on contrast ratio
    const blackContrast = getContrastRatio(bgLuminance, getLuminance("000000"));

    fg = blackContrast >= 4.5 ? "000000" : "ffffff";
  } while (!fg); // Ensure fg is set

  return `${bg}/${fg}`;
}
