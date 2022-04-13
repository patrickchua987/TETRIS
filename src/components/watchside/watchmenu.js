import React from "react";

export default function watchmenu() {
  return (
    <div id="first">
      <div id="display" className="drumpad-display">
        <p>{selected?.id}</p>
      </div>
      <button onClick={startturnon}>start</button>
      <button onClick={spuntile}>draw tile</button>
      <button onClick={rotate}>rotate</button>
      <button onClick={checkfullrow}>check full row</button>
      <button onClick={fastdrop}>fast drop</button>
      xpos: {xpos} ypos: {ypos} piecectr: {piecectr} piecemax:
      {piecemax[piecectr]} piecemax0 : {piecemax0[piecectr]} rot : {rot}
      dropspeed : {dropspeed}
      Startflag : {startbuttonflag ? 1 : 0}
      yshadow : {yshadow} playSound : {playsound}
      holdflag : {holdflag ? 1 : 0}
      gameflag : {gameoverflag ? 1 : 0}
      removerowctr : {removerowctr ? 1 : 0}
      muteflag : {muteflag ? 1 : 0}
      <button className="drum-pad" id="drum-pad-5" onClick={() => playThis(0)}>
        S
      </button>
      <button className="drum-pad" id="drum-pad-5" onClick={() => playThis(1)}>
        g
      </button>
      <button
        className="fall "
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("fall");
        }}
      >
        Fall
      </button>
      <button
        className="game all "
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("gameall");
        }}
      >
        Game all
      </button>
      <button
        className="Move"
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("move");
        }}
      >
        MOve
      </button>
      <button
        className="clear"
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("clear");
        }}
      >
        clear
      </button>
      <button
        className="game over"
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("gameover");
        }}
      >
        Game over
      </button>
      <button
        className="Rotate "
        id="drum-pad-5"
        onClick={() => {
          playSegmentnow("rotate");
        }}
      >
        rotate
      </button>
    </div>
  );
}
