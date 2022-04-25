import React, { useContext } from "react";
import Home from "../Home";
import { gameoverflagContext } from "../useCustomHook/Context";

const Main = ({ mainprops }) => {
  const { getfilter, getborder, getBackgroundColor, homeprops, arr } =
    mainprops;

  const { windowwidth, screenType } = useContext(gameoverflagContext);

  return (
    <>
      <div id="head">
        <h6 style={{ color: "white" }}> TETRIS CLONE IN REACT v1.4</h6>
        <h6> {windowwidth} </h6>
        <h6> {screenType} </h6>
      </div>

      <div className="cubeall" id="second">
        {[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25,
        ].map((row, rowIndex) => (
          <div className="cube-row" key={rowIndex}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((column, letterIndex) => (
              <div className="letterB">
                <div
                  className="letter"
                  key={letterIndex}
                  style={{
                    color: getBackgroundColor(arr[row][column]),
                    filter: getfilter(arr[row][column]),
                    backgroundColor: getBackgroundColor(arr[row][column]),
                    border: getborder(arr[row][column]),
                  }}
                >
                  {arr[row][column]}
                </div>
              </div>
            ))}
          </div>
        ))}
        <Home homeprops={homeprops} />
      </div>
    </>
  );
};

export default Main;
