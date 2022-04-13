import React, { useState } from "react";

const useGetBGcolor = () => {
  //const { arrtemp } = props;

  var bgcolor = "";

  function getBackgroundColor({ props }) {
    console.log(props);
    //const { row, column } = props;
    //const arrtemp = [];

    console.log("chk", props);
    switch (props) {
      case "H":
        bgcolor = "white";
        break;
      case "L":
        bgcolor = "#c842a3";
        break;
      case "Q":
        bgcolor = "transparent";
        break;
      case "Y":
        bgcolor = "#672f9c";
        break;
      case "Z":
        bgcolor = "#afa91a";
        break;
      case "S":
        bgcolor = "red";
        break;
      case "O":
        bgcolor = "#a08217";
        break;
      case "J":
        bgcolor = "#2587be";
        break;
      case "I":
        bgcolor = "#c842a3";
        break;
      case "E":
        bgcolor = "#3dc0c0";
        break;
      default:
        bgcolor = "#1e003e";
        break;
    }
    // }
  }
  return { bgcolor, getBackgroundColor };
};

export default useGetBGcolor;
