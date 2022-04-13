import { useEffect, useState, useRef } from "react";

const useKeyPress = () => {
  const [pressEvent, setPressEvent] = useState({ code: "" });
  const pressedKeys = useRef([]);

  const handleKeyDown = (event) => {
    event.preventDefault();
    if (!pressedKeys.current.includes(event.code)) {
      pressedKeys.current.push(event.code);
      setPressEvent(event);
    }
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    const index = pressedKeys.current.indexOf(event.code);
    if (index > -1) {
      pressedKeys.current.splice(index, 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pressEvent]);

  return pressEvent;
};

export default useKeyPress;
