import React, { component } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowClockwise } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsLightningFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { FcRotateToLandscape, FcSoundRecordingCopyright } from "react-icons/fc";
import { FiRotateCcw } from "react-icons/fi";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";
import { render } from "@testing-library/react";

const Contact = props => 
   


export class  controls = props => extends React.Component (
  holdnow,
  holdflag,
  mutenow,
  muteflag,
  mutemusicnow2,
  arrowup2,
  arrowleftnow,
  rightarrow2,
  fastdrop2,
  bgflag,
  arrowdownnow2
)  {
render() 
  
    return (
      <>
        <div>
          <button
            id="pause"
            onClick={holdnow}
            style={{ backgroundColor: holdflag ? "#5558fa" : "#8e3e4b" }}
          >
            <BsFillPauseCircleFill />
          </button>
        </div>
        <div>
          <button
            id="mute1"
            onClick={mutenow}
            style={{ backgroundColor: muteflag ? "#5558fa" : "#8e3e4b" }}
          >
            <BsFillVolumeMuteFill />
          </button>
        </div>

        <div>
          <button
            id="music"
            onClick={mutemusicnow2}
            style={{ backgroundColor: bgflag ? "#8e3e4b" : "#5558fa" }}
          >
            <SiApplemusic />
          </button>
        </div>

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
      </>
    )
}
    
}


export default controls;
