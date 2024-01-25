import { useState, useEffect } from "react";

const useBrightness = (backgroundColors: string[]): string => {
  const [textColor, setTextColor] = useState<string>("black");

  useEffect(() => {
    const extractPrimaryColor = (colors: string[]): string | null => {
      return colors.length > 0 ? colors[0] : null;
    };

    const calculateBrightness = (color: string): number => {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness;
    };

    const primaryColor = extractPrimaryColor(backgroundColors);

    if (primaryColor) {
      const isDarkBackground = calculateBrightness(primaryColor) < 128;
      const newTextColor = isDarkBackground ? "white" : "black";
      setTextColor(newTextColor);
    }
  }, [backgroundColors]);

  return textColor;
};

export default useBrightness;
