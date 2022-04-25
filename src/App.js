// developer Patrick chua
// date: april 4, 2022
// dev language : react js
import "./App.css";
import { consthook } from "./components/consthook/consthook";
import Home from "./components/Home";
import Sidemenu from "./components/sidemenu/sidemenu";
import Main from "./components/Main/Main";
import useGetBGcolor from "./components/useCustomHook/useGetBGcolor";
import {
  startflagContext,
  gameoverflagContext,
  windowwidthContext,
  screenTypeContext,
} from "./components/useCustomHook/Context";
//import { gameoverflagContext } from "./components/useCustomHook/Context";

import { useState, useEffect, useContext } from "react";
import useSound from "use-sound";
import useKeyPress from "./usekeyPress";
import gameover from "../src/sound/gameover.wav";
import goodmp3 from "../src/sound/good.mp3";
import golfmp3 from "../src/sound/golf.mp3";
import komiku from "../src/components/sound/Komiku.mp3";
import musicmp3 from "../src/sound/music.mp3";
//import drumBank from "./components/consthook/consthook";
//import useWindowDimensions from "./components/useWindowDimensions";
//import line from "../src/sound/line.wav";
//import clearmp3 from "../src/sound/clear.wav";
//import komiku from "../src/sound/Komiku.mp3";
// sound hooks

function App() {
  const [startflag, setstartflag] = useState(false);
  const { bgcolor, GetBackgroundColor3 } = useGetBGcolor();
  const [shapearrctr, setshapearrctr] = useState([[0], [0], [0]]);
  const [arr, setarr] = useState(consthook.PIECEARR.arrdefault);
  const [arrcopy, setarrcopy] = useState(consthook.PIECEARR.arrdefault);
  const [removerowctr, setremoverowctr] = useState(false);
  const [windowwidth, setWindowwidth] = useState(window.innerWidth);
  const [screenType, setScreenType] = useState("INITIAL");
  const [muteflag, setMuteflag] = useState(true);
  const [selected, setSelected] = useState(null);
  const [gameoverflag, setgameoverflag] = useState(false);
  const [startbuttonflag, setstartbuttonflag] = useState(true);
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem("board-data"))
  );
  const [score, setscore] = useState(0);
  const [dropspeed, setdropspeed] = useState(300);
  const [maxdropspeed, setmaxdropspeed] = useState(300);
  const [piecectr, setpiecectr] = useState(0);
  const [ypos, setYpos] = useState(boardData ? boardData.yposb : 0);
  const [xpos, setxpos] = useState(boardData ? boardData.xposb : 0);
  const [holdflag, setholdflag] = useState(true);
  const pressEvent = useKeyPress();
  const [yshadow, setyshadow] = useState(0);
  // const [playsound, setplaysound] = useState(false);
  const refreshPage = () => {
    const timer5 = setTimeout(() => {
      setstartflag(false);
      setstartbuttonflag(true);
      updatestartflag(false);
      setgameoverflag(false);
      clearstorage();
    }, 4000);
    return () => clearTimeout(timer5);
  };

  useEffect(() => {
    window.addEventListener("resize", updatewindowDimensions);

    if (window.innerWidth > 1300) {
      setScreenType("DESKTOP");
    } else {
      if (window.innerWidth <= 1300 && window.innerWidth > 800) {
        setScreenType("TABLET");
      } else {
        setScreenType("MOBILE");
      }
    }

    return function cleanup() {
      window.removeEventListener("resize", updatewindowDimensions);
    };
  });

  const updatewindowDimensions = () => {
    setWindowwidth(window.innerWidth);
  };

  const audioObj_1 = new Audio(musicmp3);

  function playSegment(audioObj, start, stop) {
    let audioObjNew = audioObj.cloneNode(true); //this is to prevent "play() request was interrupted" error.
    audioObjNew.currentTime = start;
    audioObjNew.play();
    audioObjNew.int = setInterval(function () {
      if (audioObjNew.currentTime > stop) {
        audioObjNew.pause();
        clearInterval(audioObjNew.int);
      }
    }, 5);
  }

  const playSegmentnow = (SoundType) => {
    switch (SoundType) {
      case "clear":
        return playSegment(audioObj_1, 2.5675, 3.5);
      case "gameover":
        return playSegment(audioObj_1, 3.2, 7);
      case "move":
        return playSegment(audioObj_1, 2.1437, 2.5);
      case "rotate":
        return playSegment(audioObj_1, 0.0807, 0.5);
      case "fall":
        return playSegment(audioObj_1, 1.1437, 2);
      default:
        // all
        return playSegment(audioObj_1, 1.1437, 8);
    }
  };

  const drumBank = [
    {
      keyTrigger: "q",
      id: "good",
      play: useSound(goodmp3)[0],
    },
    {
      keyTrigger: "g",
      id: "golf",
      play: useSound(golfmp3)[0],
    },
    {
      keyTrigger: "v",
      id: "gameover",
      play: useSound(gameover)[0],
    },
    {
      keyTrigger: "z",
      id: "good",
      play: useSound(goodmp3)[0],
    },
    {
      keyTrigger: "a",
      id: "tetrisBG",
      play: useSound(komiku)[0],
    },
    {
      keyTrigger: "h",
      id: "gameover2",
      play: useSound(musicmp3, {
        loop: false,
        currentTime: 2.2471,
        duration: 0.5,
        ended: 0.5,
      })[0],
    },
  ];

  function playThis(num) {
    if (num >= 0 && num < drumBank.length) {
      if (muteflag) {
        setSelected({ ...drumBank[num] });
      }
    }
  }

  var currentpiecenum = 0;
  var piece = [];

  const [shapearr1, setshapearr1] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [shapearr2, setshapearr2] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);
  const [shapearr3, setshapearr3] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [shapearr, setshapearr] = useState([
    [
      ["I", ""],
      ["I", ""],
      ["I", ""],
      ["I", ""],
    ],
    [
      ["", ""],
      ["", "J"],
      ["", "J"],
      ["J", "J"],
    ],
    [
      ["", ""],
      ["Z", ""],
      ["Z", "Z"],
      ["", "Z"],
    ],
  ]);

  useEffect(() => {
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    if (boardDatax) {
      setxpos(boardDatax.xposb);
      setYpos(boardDatax.yposb);
    }
    if (startflag && holdflag) {
      const timer = setTimeout(() => {
        startnow();
      }, dropspeed);
      return () => clearTimeout(timer);
    }
  }, [boardData, dropspeed, holdflag, startflag]);

  useEffect(() => {
    // console.log("use effect removerowctr");
  }, [removerowctr]);

  useEffect(() => {
    clearstorage();
  }, []);

  function getpiece(piecectr) {
    let piecetemp2 = [];
    piecetemp2 = consthook.PIECEARR[`piece${piecectr}`];

    return piecetemp2;
  }

  function undrawtile() {
    if (boardData) {
      let boardData = JSON.parse(localStorage.getItem("board-data"));
      let piecectr = boardData.currentpiecenumb;
      let piece = boardData.currentpieceb;
      let xpos = boardData.xposb;
      let ypos = boardData.yposb;
      setxpos(boardData.xposb);
      setYpos(boardData.yposb);
      let columns = 0;
      let rot = boardData.rotb;

      let temp_state_arr = [...arr];
      let rows = piece.length;
      let colcount = piece[0].length;
      let temp_state_element = temp_state_arr;

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < colcount; j++) {
          if (piece[i][0 + j] !== "") {
            if (piece[i][0 + j] != null) {
              if (i + ypos < 26) {
                temp_state_element[i + ypos][xpos + columns + j] = "";
              }
            }
          }
        }
      }
      setarr(temp_state_arr);
      writeboard(piece, piecectr, arr, xpos, ypos, rot);
    }
  }

  function drawtile() {
    if (boardData) {
      let boardData = JSON.parse(localStorage.getItem("board-data"));
      let piecectr = boardData.currentpiecenumb;
      let piece = boardData.currentpieceb;
      setpiecectr(boardData.currentpiecenumb);
      let xpos = boardData.xposb;
      let ypos = boardData.yposb;
      setxpos(boardData.xposb);
      setYpos(boardData.yposb);
      let columns = 0;
      let rot = boardData.rotb;

      let temp_state_arr = [...boardData.currentarr];

      let rows = piece.length;
      let colcount = piece[0].length;
      let temp_state_element = temp_state_arr;

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < colcount; j++) {
          if (i + ypos < 26) {
            temp_state_element[i + ypos][columns + j + xpos] = piece[i][0 + j];
          }
        }
      }

      setarr(temp_state_arr);

      writeboard(piece, piecectr, temp_state_arr, xpos, ypos, rot);
    }
  }

  function writeboard(piece, piecectr, temp_state_arr, xpos, ypos, rot) {
    let newBoardData = {
      ...boardData,
      currentpiecenumb: piecectr,
      currentpieceb: piece,
      currentarr: temp_state_arr,
      currentarrcopy: temp_state_arr,
      xposb: xpos,
      yposb: ypos,
      rotb: rot,
    };
    setarr(temp_state_arr);
    setarrcopy(temp_state_arr);
    setBoardData(newBoardData);
    localStorage.setItem("board-data", JSON.stringify(newBoardData));
  }

  function clearstorage() {
    let currentpiece = [];
    let boardData = JSON.parse(localStorage.getItem("board-data"));
    if (boardData) {
      window.localStorage.clear();
      window.localStorage.removeItem("board-data");
    }
    //  const piecectr = 0;
    var piecectr2 = 0;
    let shapearrtemp = []; //shapearr;
    let shapearrctrtemp = []; //shapearrctr;
    for (var l = 0; l < 3; l++) {
      var randomShape =
        consthook.PIECE.shape[
          Math.floor(Math.random() * consthook.PIECE.shape.length)
        ];
      setpiecectr(consthook.PIECE.shape.indexOf(randomShape));
      piecectr2 = consthook.PIECE.shape.indexOf(randomShape);
      piece = getpiece(piecectr2);
      currentpiecenum = piecectr2;
      currentpiece = piece;
      shapearrtemp.push(piece);
      shapearrctrtemp.push(piecectr2);
    }
    setshapearr(shapearrtemp);
    setshapearrctr(shapearrctrtemp);

    setshapearr1(shapearrtemp[0]);
    setshapearr2(shapearrtemp[1]);
    setshapearr3(shapearrtemp[2]);

    currentpiecenum = shapearrctr[0];
    currentpiece = shapearr[0];
    boardData = JSON.parse(localStorage.getItem("board-data"));

    if (!boardData) {
      let newBoardData = {
        ...boardData,
        xposb: 0,
        yposb: 0,
        rotb: 0,
        arrcopyb: consthook.PIECEARR.arrdefault,
        currentpiecenumb: currentpiecenum,
        currentpieceb: currentpiece,
        currentarr: consthook.PIECEARR.arrdefault,
        currentarrcopy: consthook.PIECEARR.arrdefault,
        startflagb: startflag,
        yshadowb: 0,
      };

      setarr(consthook.PIECEARR.arrdefault);
      setarrcopy(consthook.PIECEARR.arrdefault);
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }

  function startturnon() {
    // mutemusicnow();
    setscore(0);
    setgameoverflag(false);
    setstartbuttonflag(false);
    drawtile();
    startnow();

    if (!startflag) {
      setstartflag(true);
      updatestartflag(true);
    }
  }

  function startnow() {
    if (!gameoverflag) {
      let boardDatax = JSON.parse(localStorage.getItem("board-data"));

      let status = checkcollision(boardDatax.xposb - 1, boardDatax.yposb);

      if (boardDatax.yposb > 25 || !status) {
        if (removerowctr) {
          let checkcomplete = removerownow2();
        }
      }
      if (boardDatax.yposb > 25 || !status) {
        updatestage(boardDatax.xposb, boardDatax.yposb);
        if (holdflag) {
          let shapearrtemp = shapearr;
          let shapearrctrtemp = shapearrctr;
          // move shape in array 0 to stage
          let piecetemp = 0;
          piece = shapearr[0];
          //  piecectr = shapearrctr[0];
          setpiecectr(shapearrctr[0]);
          piecetemp = shapearrctr[0];
          // splice array 0
          shapearrtemp.splice(0, 1);
          shapearrctrtemp.splice(0, 1);
          // get new shape and push to array
          var randomShape =
            consthook.PIECE.shape[
              Math.floor(Math.random() * consthook.PIECE.shape.length)
            ];
          let piecectr2 = 0;
          piecectr2 = consthook.PIECE.shape.indexOf(randomShape);
          let piece2 = [];
          piece2 = getpiece(piecectr2);
          shapearrtemp.push(piece2);
          shapearrctrtemp.push(piecectr2);

          setshapearr(shapearrtemp);
          setshapearrctr(shapearrctrtemp);

          setshapearr1(shapearr[0]);
          setshapearr2(shapearr[1]);
          setshapearr3(shapearr[2]);

          let xxpos = 0;
          let yypos = 0;

          updatepiece(piecetemp, piece, xxpos, yypos, boardDatax.yshadowb);

          let yshadowx = checkshadowx(xxpos, yypos);
          hoverline(xxpos, yypos + 1, yshadowx);
          setYpos(yypos + 1);
          updatexy(xxpos, yypos + 1);
          setdropspeed(maxdropspeed);
          checkfullrow(0, 0);
          // setdropspeed(300);
        }
      } else {
        if (holdflag) {
          let xxpos = boardDatax.xposb;
          let yypos = boardDatax.yposb;

          undrawtile();

          let yshadowx = checkshadowx(xxpos, yypos + 1);
          if (dropspeed === 0) {
            yypos = yshadowx - 1;
          }
          hoverline(xxpos, yypos + 1, yshadowx);
          setYpos(yypos + 1);
          updatexy(xxpos, yypos + 1);
        }
      }
    }
  }

  useEffect(() => {
    const keyvalkey = pressEvent.code.substring(0, 3).toLowerCase();
    const keyvalue = pressEvent.code.substring(3, 4);

    if (keyvalkey === "key") {
      if (!/[^a-zA-Z]/.test(keyvalue)) {
        // do thing
      }
    } else {
      switch (pressEvent.code) {
        case "Space":
          fastdrop();
          break;
        case "ArrowUp":
          if (boardData.yposb >= 1) {
            rotate();
          }
          break;
        case "ArrowDown":
          if (boardData.yposb < 25) {
            arrowdownnow();
          }
          break;
        case "ArrowLeft":
          arrowleftnow();
          break;
        case "ArrowRight":
          if (
            boardData.xposb <
            consthook.PIECE.piecemax[boardData.currentpiecenumb]
          ) {
            let status = checkcollisionRight(
              boardData.xposb + 1,
              boardData.yposb
            );

            let yshadowx = checkshadow(boardData.xposb + 1, boardData.yposb);
            if (status) {
              let boardData = JSON.parse(localStorage.getItem("board-data"));
              hoverline(boardData.xposb + 1, boardData.yposb, yshadowx);
              setxpos(boardData.xposb + 1);
              updatexy(boardData.xposb + 1, boardData.yposb);
              updatepiece(
                boardData.currentpiecenumb,
                boardData.currentpieceb,
                boardData.xposb + 1,
                boardData.yposb,
                yshadowx
              );
            }
          }
          break;
        default:
          break;
      }
    }
  }, [pressEvent]);

  function arrowdownnow2() {
    if (!holdflag) {
      if (boardData.yposb < 25) {
        arrowdownnow();
      }
    }
  }

  function arrowup2() {
    if (boardData.yposb >= 1) {
      rotate();
    }
  }

  function holdnow() {
    setholdflag(!holdflag);
  }

  function rightarrow2() {
    if (
      boardData.xposb < consthook.PIECE.piecemax[boardData.currentpiecenumb]
    ) {
      let status = checkcollisionRight(boardData.xposb + 1, boardData.yposb);

      let yshadowx = checkshadow(boardData.xposb + 1, boardData.yposb);
      if (status) {
        let boardData = JSON.parse(localStorage.getItem("board-data"));
        hoverline(boardData.xposb + 1, boardData.yposb, yshadowx);
        setxpos(boardData.xposb + 1);
        updatexy(boardData.xposb + 1, boardData.yposb);
        updatepiece(
          boardData.currentpiecenumb,
          boardData.currentpieceb,
          boardData.xposb + 1,
          boardData.yposb,
          yshadowx
        );
      }
    }
  }

  function arrowrightnow() {
    if (
      boardData.xposb < consthook.PIECE.piecemax[boardData.currentpiecenumb]
    ) {
      let status = checkcollisionRight(boardData.xposb, boardData.yposb);

      let yshadowx = checkshadow(boardData.xposb, boardData.yposb);
      if (status) {
        let boardData = JSON.parse(localStorage.getItem("board-data"));
        hoverline(boardData.xposb, boardData.yposb, yshadowx);
        setxpos(boardData.xposb);
        updatexy(boardData.xposb, boardData.yposb);
        updatepiece(
          boardData.currentpiecenumb,
          boardData.currentpieceb,
          boardData.xposb,
          boardData.yposb,
          yshadowx
        );
      }
    }
  }

  function arrowdownnow() {
    if (boardData.yposb < 25) {
      let status = checkcollision(boardData.xposb + 1, boardData.yposb);
      if (status) {
        undrawtile();
        let boardData = JSON.parse(localStorage.getItem("board-data"));
        hoverline(boardData.xposb, boardData.yposb + 1, boardData.yshadowb);
        updatexy(boardData.xposb, boardData.yposb + 1);
        setYpos(boardData.yposb + 1);
      } else {
        let boardDatax = JSON.parse(localStorage.getItem("board-data"));
        updatestage(boardDatax.xposb, boardDatax.yposb);
      }
    }
  }

  function arrowleftnow() {
    let status = checkcollisionX(boardData.xposb - 1, boardData.yposb);

    let yshadowx = checkshadowx(boardData.xposb - 1, boardData.yposb);
    if (status) {
      let boardData = JSON.parse(localStorage.getItem("board-data"));

      hoverline(boardData.xposb - 1, boardData.yposb, yshadowx);
      updatexy(boardData.xposb - 1, boardData.yposb);
      setxpos(boardData.xposb - 1);
      updatepiece(
        boardData.currentpiecenumb,
        boardData.currentpieceb,
        boardData.xposb - 1,
        boardData.yposb,
        yshadowx
      );
    }
  }

  function fastdrop2() {
    if (holdflag) {
      if (dropspeed !== 0) {
        setdropspeed(0);
        if (muteflag) {
          playSegmentnow("fall");
        }
        //setSelected({ ...consthook.AUDIO.drumBank[1] });
      } else {
        setdropspeed(maxdropspeed);
      }
    }
  }

  function fastdrop() {
    if (holdflag) {
      if (dropspeed !== 0) {
        //playThis(1);
        if (muteflag) {
          playSegmentnow("fall");
        }
        setdropspeed(0);
      } else {
        setdropspeed(maxdropspeed);
      }
    }
  }

  function updatexy(xxposb, yyposb) {
    if (boardData) {
      let temp_state = [];
      let boardDatax = JSON.parse(localStorage.getItem("board-data"));
      temp_state = boardDatax.arrcopyb;
      let rot = boardDatax.rotb;
      let newBoardData = {
        ...boardDatax,
        xposb: xxposb,
        yposb: yyposb,
        arrcopyb: temp_state,
        rotb: rot,
        timeflagb: consthook.FLAG.timerflag,
      };

      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }

  function updatexy2(arrcopy) {
    if (boardData) {
      let newBoardData = {
        ...boardData,
        arrcopyb: arrcopy,
      };
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }

  function updatestartflag(startflag) {
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));

    if (boardDatax) {
      let newBoardData = {
        ...boardDatax,
        startflagb: startflag,
      };
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }

  function updatepiece(
    piecetemp,
    piece,
    xxpos = null,
    yypos = null,
    yshadow = null
  ) {
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    yshadow = yshadow === null ? boardDatax.yshadowb : yshadow;
    xxpos = xxpos === null ? boardDatax.xposb : xxpos;
    yypos = yypos === null ? boardDatax.yposb : yypos;
    piecetemp = piecetemp === null ? boardDatax.currentpiecenumb : piecetemp;
    piece = piece.length === 0 ? boardDatax.currentpieceb : piece;
    if (boardDatax) {
      let newBoardData = {
        ...boardDatax,
        currentpiecenumb: piecetemp,
        currentpieceb: piece,
        xposb: xxpos,
        yposb: yypos,
        yshadowb: yshadow,
      };
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }

  function updatepiecerotated(newpiece, rot) {
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    if (boardDatax) {
      let newBoardData = {
        ...boardDatax,
        currentpieceb: newpiece,
        rotb: rot,
      };
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
    drawtile();
  }

  function updatestagerotate(xxpos, yypos) {
    let temp_state = [];
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    temp_state = [boardDatax.arrcopyb];
    updatexy2(temp_state);
    setarrcopy(temp_state);
  }

  function updatestage(xxpos, yypos) {
    let temp_state = [];
    temp_state = [...arr];
    updatexy2(temp_state);
    setarr(temp_state);
    setarrcopy(temp_state);
  }

  function checkcollisionX(xxpos, yypos) {
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    xxpos = boardDatax.xposb;
    yypos = boardDatax.yposb;
    let temp_state = boardDatax.arrcopyb;
    let piece = boardDatax.currentpieceb;
    let temp_state_element = temp_state;
    // get number of rows of the tile
    let rows = piece.length - 1;
    // get number of column of the tile
    let columns = piece[0].length;
    // let rightmostcolumn = 0;
    // loop all column and then loop the row
    // check if any cell will collide with current pos+1 since it is direction right
    for (var k = columns - 1; 0 <= k; k--) {
      for (var h = 0; h <= rows; h++) {
        if (
          piece[h][k] !== "" &&
          piece[h][k] !== null &&
          ((piece[h][k - 1] === "" && piece[h][k] !== null) || k < columns)
        ) {
          // if cell is not blank and next cell is blank or column less than max column
          if (temp_state_element[yypos + h][xxpos + k - 1] !== "") {
            return false;
          }
        }
      }
    }
    return true;
  }

  function checkshadowx(xxpos, yypos) {
    if (yypos > 25) {
      return 25;
    }
    let yshadow = 0;
    let rowtobecheck = 26 - yypos;
    for (var l = 0; l < rowtobecheck; l++) {
      let yshadowx = getyshadowx(xxpos, yypos + l);
      if (yshadowx) {
        yshadow = l + yypos;
        let boardDatax = JSON.parse(localStorage.getItem("board-data"));
        updatepiece(
          boardDatax.currentpiecenumb,
          boardDatax.currentpieceb,
          xpos,
          ypos,
          yshadow
        );

        return l + yypos;
      }
      continue;
    }

    return l;
  }

  function getyshadowx(xxpos, yypos) {
    let temp_state = [];
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));

    temp_state = boardDatax.arrcopyb;
    let temp_state_element = temp_state;

    let piece = boardDatax.currentpieceb;
    let xpos = xxpos;

    let rows = piece.length - 1;
    let colcount = piece[0].length;
    //  console.log("piece", piece);
    let lastrowwithvalue = 0;
    for (var j = 0; j < colcount; j++) {
      for (var i = rows; i >= 0; i--) {
        if (piece[i][j] !== "" && piece[i][j] !== null) {
          lastrowwithvalue = i;

          if (piece[i][j] !== null) {
            lastrowwithvalue = i;
            if (yypos + lastrowwithvalue + 1 < 26) {
              if (
                temp_state_element[yypos + lastrowwithvalue + 1][xpos + j] !==
                  "" &&
                temp_state_element[yypos + lastrowwithvalue + 1][xpos + j] !==
                  null
              ) {
                return true;
              } else {
                continue;
              }
            }
            return true;
          } else {
            //console.log("rows exceeed 25 so collision");
            return true;
          }
        }
      }
    }
    return false;
  }

  function checkcollisionRight(xxpos, yypos) {
    // get current xpos and ypos from local storage
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    xxpos = boardDatax.xposb;
    yypos = boardDatax.yposb;
    let temp_state = boardDatax.arrcopyb;
    let piece = boardDatax.currentpieceb;
    let temp_state_element = temp_state;
    // get number of rows of the tile
    let rows = piece.length - 1;
    // get number of column of the tile
    let columns = piece[0].length;
    //let rightmostcolumn = 0;
    // loop all column and then loop the row
    // check if any cell will collide with current pos+1 since it is direction right

    for (var k = columns - 1; 0 <= k; k--) {
      for (var h = 0; h <= rows; h++) {
        if (
          (piece[h][k] === "" || piece[h][k] === null) &&
          k < columns //((piece[h][k + 1] == "" && piece[h][k + 1] != null) || k < columns)
        ) {
          continue;
        } else {
          //if (xxpos + k + 1 < consthook.PIECE.piecemax[boardDatax.currentpiecenumb]) {
          if (
            xxpos + k + 1 <
            consthook.PIECE.piecemax[boardDatax.currentpiecenumb]
          ) {
            if (
              temp_state_element[yypos + h][xxpos + k + 1] !== "" &&
              temp_state_element[yypos + h][xxpos + k + 1] !== null &&
              temp_state_element[yypos + h][xxpos + k + 1] !== "Q"
            ) {
              return false;
            }
          } else {
            // collision so dont move
            // console.log("collision");
            return false;
          }
        }
      }
    }
    return true;
  }

  function removenullcolumn(piece) {
    let piecetemp = piece;

    // console.log(piecetemp);

    let colcountx = piecetemp[0].length;
    let rowsx = piecetemp.length;

    let nullctr = 0;
    let ll = rowsx;
    let ll2 = 0;
    let piecetemp2 = [[], [], [], []];
    while (ll2 < ll) {
      nullctr = 0;
      // ll2 = ll2 + 1;
      let rowsx = piecetemp.length;
      //piecetemp2=[];
      for (var j = 0; j < rowsx; j++) {
        if (
          piecetemp[j][ll2] === null ||
          piecetemp[j][ll2] === "" ||
          piecetemp[j][ll2] === undefined
        ) {
          continue;
        } else {
          nullctr = 1;
        }
      }

      if (nullctr === 1) {
        for (var jj = 0; jj < rowsx; jj++) {
          let xx = piecetemp[jj][ll2];
          piecetemp2[jj].splice(ll2, 0, xx);
        }
      }
      ll2 = ll2 + 1;
    }
    return piecetemp2;
  }

  function checkcollision(xxpos, yypos) {
    //  console.log("collision, function hoverline", yypos);
    if (yypos > 25) {
      return false;
    }

    let temp_state = [];
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));

    temp_state = boardDatax.arrcopyb;
    let temp_state_element = temp_state;

    let piece = boardDatax.currentpieceb;
    let xpos = boardDatax.xposb;
    let ypos = boardDatax.yposb;

    let rows = piece.length - 1;
    let colcount = piece[0].length;

    let lastrowwithvalue = 0;

    for (var j = 0; j < colcount; j++) {
      for (var i = rows; i >= 0; i--) {
        if (piece[i][j] !== "") {
          lastrowwithvalue = i;

          if (piece[i][j] !== null) {
            lastrowwithvalue = i;

            if (ypos + lastrowwithvalue + 1 < 26) {
              if (
                temp_state_element[ypos + lastrowwithvalue + 1][xpos + j] !==
                  "" &&
                temp_state_element[ypos + lastrowwithvalue + 1][xpos + j] !==
                  null
              ) {
                if (yypos === 1 && startflag) {
                  setgameoverflag(true);
                  if (muteflag) {
                    //setSelected({ ...consthook.AUDIO.drumBank[2] });
                    playSegmentnow("gameover");
                  }

                  refreshPage();

                  return false;
                } else {
                  setdropspeed(maxdropspeed);
                  return false;
                }
              }
              break;
            } else {
              //console.log("rows exceeed 25 so collision");
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  function checkshadow(xxpos, yypos) {
    if (yypos > 25) {
      return 25;
    }
    let yshadow = 0;
    let rowtobecheck = 26; // 26 - ypos;

    for (var l = 0; l < rowtobecheck; l++) {
      let yshadowx = getyshadow(xxpos, yypos + l);
      if (yshadowx) {
        let boardDatax = JSON.parse(localStorage.getItem("board-data"));
        yshadow = l + yypos + (boardDatax.currentpiecenumb === 5 ? 0 : 0);
        updatepiece(
          boardDatax.currentpiecenumb,
          boardDatax.currentpieceb,
          xpos,
          ypos,
          yshadow
        );
        return l + yypos + (piecectr === 5 ? 0 : 0);
      }
      continue;
    }
    return l;
  }

  function getyshadow(xxpos, yypos) {
    let temp_state = [];
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));

    temp_state = boardDatax.arrcopyb;
    let temp_state_element = temp_state;

    let piece = boardDatax.currentpieceb;
    //  let xpos = boardDatax.xposb + 1;
    let xpos = boardDatax.xposb;

    let rows = piece.length - 1;
    let colcount = piece[0].length;
    let lastrowwithvalue = 0;

    for (var j = 0; j < colcount; j++) {
      for (var i = rows; i >= 0; i--) {
        if (piece[i][j] !== "" && piece[i][j] !== null) {
          lastrowwithvalue = i;

          if (piece[i][j] !== null && piece[i][j] !== "") {
            lastrowwithvalue = i;
            if (yypos + lastrowwithvalue + 1 < 26) {
              if (
                temp_state_element[yypos + lastrowwithvalue + 1][xpos + j] !==
                  "" &&
                temp_state_element[yypos + lastrowwithvalue + 1][xpos + j] !==
                  null
              ) {
                return true;
              } else {
                continue;
              }
            }
            return true;
          } else {
            // console.log("rows exceeed 25 so collision");
            return true;
          }
        }
      }
    }
    return false;
  }

  function removerow() {
    let rows = 25;
    let haveH = 0;
    for (var i = rows; i >= 0; i--) {
      const isEmpty = arr[i].includes("Q");
      if (!isEmpty) {
        const isEmpty = arr[i].includes("");
        if (!isEmpty) {
          if (!arr[i].includes("H")) {
            for (var j = 0; j < 9; j++) {
              arr[i][j] = "H";
            }
            updatestage(0, 0);
            haveH = 1;
          }
        }
      }
    }
    return haveH;
  }

  function removerownow2() {
    let rows = 25;
    //let temparr = [...arr];
    let whileloop = true;
    while (whileloop) {
      for (var i = rows; i >= 0; i--) {
        if (arr[i].includes("H")) {
          if (muteflag) {
            playThis(0);
          }
          arr.splice(i, 1);
          arr.unshift(["", "", "", "", "", "", "", "", ""]);
          updatestage(0, 0);

          setscore((prevScore) => prevScore + 100);
          let newspeed = dropspeednew(score);
          if (newspeed < 150) {
            newspeed = 140;
          }
          setmaxdropspeed(newspeed);

          break;
        }
        if (i === 0) {
          whileloop = false;
        }
      }
    }
    setremoverowctr(false);
    return true;
  }

  function checkfullrow(xxpos, yypos) {
    setholdflag(false);
    let seerow = 0;

    let checkcomplete = removerow();
    if (checkcomplete === 1) {
      // console.log("do nothing");
      setremoverowctr(true);
    }
    setholdflag(true);
  }

  function dropspeednew(number) {
    let sum = 300 - Math.trunc(number / 500) * 50;
    return sum;
  }

  function hoverline(xxpos, yypos, yshadow = 0) {
    setyshadow(yshadow);
    let temp_state = [];
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    temp_state = boardDatax.arrcopyb;
    let columns = xxpos;
    let rows = 4;

    let piece = boardDatax.currentpieceb;

    let temp_state_element = temp_state;
    rows = piece.length;
    let colcount = piece[0].length;
    let stopswitch = 0;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < colcount; j++) {
        if (i + yypos < 26) {
          if (
            temp_state_element[i + yypos][columns + j] === "" ||
            temp_state_element[i + yypos][columns + j] === null ||
            temp_state_element[i + yypos][columns + j] === "Q"
          ) {
            temp_state_element[i + yypos][columns + j] =
              piece[i][0 + j] === null ? "" : piece[i][0 + j];
          } else {
          }
          if (i + yshadow < 26) {
            if (
              temp_state_element[i + yshadow][columns + j] === "" ||
              temp_state_element[i + yshadow][columns + j] === null ||
              temp_state_element[i + yshadow][columns + j] === "Q"
            ) {
              let shadowQ = piece[i][0 + j] !== "" ? "Q" : piece[i][0 + j];
              temp_state_element[i + yshadow][columns + j] =
                piece[i][0 + j] === null ? "" : shadowQ; //piece[i][0 + j];
            }
          }
        } else {
          //return true;
        }
      }
    }

    setarr(temp_state);
    return false;
  }

  function getfilter(shape) {
    if (!startflag) {
    } else {
      if (shape !== "" && shape !== null) {
        return "brightness(150%)";
      }
      return "brightness(10%)";
    }
  }

  function getborder(shape) {
    if (shape === "Q") {
      return "1px solid silver";
    } else {
      return "1px solid #1e003e";
    }
  }

  function getBackgroundColor(shapex) {
    if (!startflag) {
      return "#1e003e";
    } else {
      return GetBackgroundColor3({ props: shapex });
    }
  }

  function rotate() {
    if (muteflag) {
      playSegmentnow("move");
    }
    let boardDatax = JSON.parse(localStorage.getItem("board-data"));
    let rot = boardDatax.rotb;
    let piece = boardDatax.currentpieceb;
    let piecectr = boardDatax.currentpiecenumb;
    let newpiece = piece;
    if (
      ((piecectr === 7 || piecectr === 6) && xpos === 7) ||
      ((piecectr === 1 || piecectr === 2 || piecectr === 3 || piecectr === 0) &&
        rot === 1 &&
        xpos === 6) ||
      (piecectr === 5 && xpos > 5 && rot === 0) ||
      (piecectr === 0 && xpos > 6) ||
      (piecectr === 1 && xpos > 5) ||
      (piecectr === 6 && xpos > 6) ||
      (piecectr === 3 && xpos > 4)
    ) {
      let needmove = true;
      if (piecectr === 7) {
        newpiece = consthook.PIECEARR.piece7;
        needmove = false;
        //xpos = 5;
      } else {
        if (piecectr === 5) {
          newpiece = consthook.PIECEARR.piece5;
          //xpos = 5;
        } else {
          if (
            ((piecectr === 6 || piecectr === 1) && xpos > 6) ||
            (piecectr === 3 && xpos > 4)
          ) {
            needmove = false;
            // newpiece = consthook.PIECEARR.piece1;
          } else {
            if (piecectr === 1 && xpos === 6) {
              needmove = false;
              //newpiece = consthook.PIECEARR.piece1;
            } else {
              if (piecectr === 2) {
                newpiece = consthook.PIECEARR.piece2;
              } else {
                if (piecectr === 3) {
                  newpiece = consthook.PIECEARR.piece3;
                } else {
                  if (piecectr === 0) {
                    newpiece = consthook.PIECEARR.piece0;
                  }
                }
              }
            }
          }
        }
      }
      //undrawtile();
      if (needmove) {
        rot = 0;
        newpiece = removenullcolumn(newpiece);
        updatepiecerotated(newpiece, rot);

        let yshadow = checkshadow(xpos, ypos);
        updatepiece(piecectr, newpiece, xpos, ypos, yshadow);
      }
      return;
    }
    undrawtile();

    newpiece = piece;

    if (piecectr === 4) {
      newpiece = consthook.PIECEARR.piece4;
      rot = 0;
    } else {
      if (piecectr === 7 && rot === 1) {
        newpiece = consthook.PIECEARR.piece7;
        rot = 0;
      } else {
        if (piecectr === 5 && rot === 1) {
          newpiece = consthook.PIECEARR.piece5;
          rot = 0;
        } else {
          if (piecectr === 5 && rot === 1) {
            newpiece = consthook.PIECEARR.piece5;
            rot = 0;
          } else {
            if (piecectr === 6 && rot === 1) {
              newpiece = consthook.PIECEARR.piece6;
              rot = 0;
            } else {
              if (rot === 3) {
                rot = 0;
              } else {
                rot = rot + 1;
              }
              let temp_piece = piece.map((_, index) =>
                piece.map((column) => column[index])
              );
              newpiece = temp_piece.map((row) => row.reverse());
            }
          }
        }
      }
    }

    newpiece = removenullcolumn(newpiece);

    updatepiecerotated(newpiece, rot);
    updatepiece(piecectr, newpiece, xpos, ypos, yshadow);
    arrowrightnow();
  }

  const sidemenuprop = {
    setpiecectr,
    piece,
    getpiece,
    currentpiecenum,
    setshapearr,
    setshapearrctr,
    shapearrctr,
    shapearr,
    setarr,
    setarrcopy,
    arr,
    undrawtile,
    drawtile,
    checkcollision,
    removerowctr,
    removerownow2,
    updatestage,
    updatepiece,
    checkshadowx,
    hoverline,
    updatexy,
    maxdropspeed,
    checkfullrow,
    boardData,
    setBoardData,
    startflag,
    holdflag,
    refreshPage,
    startnow,
    dropspeed,
    setshapearr1,
    shapearr1,
    getfilter,
    getborder,
    shapearr2,
    shapearr3,
    getBackgroundColor,
    score,
    startbuttonflag,
    startturnon,
  };

  const homeprops = {
    holdnow,
    arrowup2,
    setholdflag,
    setSelected,
    selected,
    drumBank,
    arrowleftnow,
    arrowdownnow2,
    rightarrow2,
    fastdrop2,
  };

  const mainprops = {
    getfilter,
    getborder,
    getBackgroundColor,
    homeprops,
    arr,
    gameoverflag,
  };

  return (
    <div className="App">
      <gameoverflagContext.Provider
        value={{
          gameoverflag,
          setgameoverflag,
          windowwidth,
          screenType,
        }}
      >
        {false && <header className="App-header">TETRISx</header>}
        <div id="container">
          <Main mainprops={mainprops} />
          <Sidemenu sidemenuprop={sidemenuprop} />
        </div>
      </gameoverflagContext.Provider>
    </div>
  );
}

export default App;
