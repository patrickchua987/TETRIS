import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import { BsArrowLeftCircleFill } from "react-icons/bs";
//import { BsArrowClockwise } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsLightningFill } from "react-icons/bs";
//import { BsCircleFill } from "react-icons/bs";
//import { FcRotateToLandscape, FcSoundRecordingCopyright } from "react-icons/fc";
import { FiRotateCcw } from "react-icons/fi";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";

import komiku from "../components/sound/Komiku.mp3";

const Home = ({ homeprops }) => {
  const {
    holdnow,
    holdflag,
    arrowup2,
    setholdflag,
    setSelected,
    selected,
    drumBank,
    arrowleftnow,
    arrowdownnow2,
    rightarrow2,
    fastdrop2,
  } = homeprops;

  const [bgflag, setbgflag] = useState(true);
  const [bgflag2, setbgflag2] = useState(true);
  const [muteflag, setMuteflag] = useState(true);

  const [play, { stop }] = useSound(komiku, {
    volume: 0.5,
    loop: true,
  });

  function handleKeyDown(e) {
    const selectedItem = drumBank.find((item) => item.keyTrigger === e.key);
    if (selectedItem) {
      setSelected({ ...selectedItem });
    }
  }

  function playThis(num) {
    if (num >= 0 && num < drumBank.length) {
      if (muteflag) {
        setSelected({ ...drumBank[num] });
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log("Selected item: %o", selected);
    if (!bgflag) {
      play();
    } else {
      stop();
    }
  }, [bgflag]);

  useEffect(() => {
    console.log("Selected item: %o", selected);
    if (!bgflag2) {
      play();
    } else {
      stop();
    }
  }, [bgflag2]);

  function mutemusicnow() {
    setbgflag(!bgflag);
  }

  useEffect(() => {
    console.log("Selected item: %o", selected);
    if (selected) {
      selected.play();
    }
  }, [selected]);

  function mutenow() {
    setMuteflag(!muteflag);
  }

  return (
    <div>
      <button
        id="pause"
        onClick={holdnow}
        style={{ backgroundColor: holdflag ? "#5558fa" : "#8e3e4b" }}
      >
        <BsFillPauseCircleFill />
      </button>

      <button
        id="mute1"
        onClick={mutenow}
        style={{ backgroundColor: muteflag ? "#5558fa" : "#8e3e4b" }}
      >
        <BsFillVolumeMuteFill />
      </button>

      <button
        id="music"
        onClick={mutemusicnow}
        style={{ backgroundColor: bgflag ? "#8e3e4b" : "#5558fa" }}
      >
        <SiApplemusic />
      </button>

      <div>
        <button id="uparrow" onClick={arrowup2}>
          <FiRotateCcw />
        </button>
      </div>

      <div id="join">
        <div>
          <button id="leftarrow" onClick={arrowleftnow}>
            <BsArrowLeftCircleFill />
          </button>
        </div>

        <div>
          <button id="downarrow" onClick={arrowdownnow2}>
            <BsArrowDownCircleFill />
          </button>
        </div>

        <div>
          <button id="leftarrowx" onClick={rightarrow2}>
            <BsArrowRightCircleFill />
          </button>
        </div>
        <div>
          <button id="spacebar" onClick={fastdrop2}>
            <BsLightningFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
