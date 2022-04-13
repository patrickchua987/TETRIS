import React from "react";
import { useState, useEffect } from "react";
import useGetBGcolor from "../useCustomHook/useGetBGcolor";
//import useGetBGcolor from "../useCustomHook/useGetBGcolor";

const Sidemenu = ({ sidemenuprop }) => {
  const {
    getfilter,
    getborder,
    shapearr1,
    shapearr2,
    shapearr3,
    getBackgroundColor,
    score,
    startbuttonflag,
    startturnon,
  } = sidemenuprop;

  return (
    <div>
      <div className="cube1" id="second1">
        {[0, 1, 2, 3].map((row, rowIndex) => (
          <div className="cube-row" key={rowIndex}>
            {[0, 1].map((column, letterIndex) => (
              <div className="letterB">
                <div
                  className="letter"
                  key={letterIndex}
                  style={{
                    color: getBackgroundColor(shapearr1[row][column]),
                    filter: getfilter(shapearr1[row][column]),
                    backgroundColor: getBackgroundColor(shapearr1[row][column]),
                    border: getborder(shapearr1[row][column]),
                  }}
                >
                  {shapearr1[row][column]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="cube1" id="second1">
        {[0, 1, 2, 3].map((row, rowIndex) => (
          <div className="cube-row" key={rowIndex}>
            {[0, 1].map((column, letterIndex) => (
              <div className="letterB">
                <div
                  className="letter"
                  key={letterIndex}
                  style={{
                    color: getBackgroundColor(shapearr2[row][column]), // "white"
                    filter: getfilter(shapearr2[row][column]),
                    backgroundColor: getBackgroundColor(shapearr2[row][column]),
                    border: getborder(shapearr2[row][column]),
                  }}
                >
                  {shapearr2[row][column]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="cube1" id="second1">
        {[0, 1, 2, 3].map((row, rowIndex) => (
          <div className="cube-row" key={rowIndex}>
            {[0, 1].map((column, letterIndex) => (
              <div className="letterB">
                <div
                  className="letter"
                  key={letterIndex}
                  style={{
                    color: getBackgroundColor(shapearr3[row][column]), // "white"
                    filter: getfilter(shapearr3[row][column]),
                    backgroundColor: getBackgroundColor(shapearr3[row][column]),
                    border: getborder(shapearr3[row][column]),
                  }}
                >
                  {shapearr3[row][column]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="cube3" id="second2">
        <h4 style={{ color: "white" }}> score :</h4>
        <h4 style={{ color: "white" }}>{score}</h4>
      </div>
      {startbuttonflag && (
        <div>
          <button id="startbutton" onClick={startturnon}>
            START
          </button>
        </div>
      )}
    </div>
  );
};
export default Sidemenu;
