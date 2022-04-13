import React, { useState } from "react";
import { Play, useHowl } from "rehowl";

export default function PlayPause() {
  const { play, setPlay } = useState(false);
  const { howl } = useHowl({ src: "./sound.mp3" });
  return (
    <div>
      <Play howl={howl} pause={!play} />
      <button onClick={() => setPlay(!play)}>{play ? "Pause" : "Play"}</button>
    </div>
  );
}
