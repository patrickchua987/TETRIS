import React, { useState } from "react";

const useGetBGcolor = (props) => {
  var bgcolor = "";

  function GetBackgroundColor3({ props }) {
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
        bgcolor = "#2bb534";
        break;
      case "E":
        bgcolor = "#3dc0c0";
        break;
      default:
        bgcolor = "#1e003e";
        break;
    }
    return bgcolor;
  }

  return { bgcolor, GetBackgroundColor3 };
};

export default useGetBGcolor;
