import { useState, useEffect } from "react";

function useWindowDimensions() {
  const [windowwidth, setWindowwidth] = useState(window.innerWidth);
  const [screenType, setScreenType] = useState("INITIAL");

  useEffect(() => {
    window.addEventListener("resize", updatewindowWidth);

    return function cleanup() {
      window.removeEventListener("resize", updatewindowWidth);
    };
  });

  const updatewindowWidth = () => {
    setWindowwidth(window.innerWidth);
  };

  return windowwidth;
}

export default useWindowDimensions;
