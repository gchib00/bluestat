import React from "react";
import { Button } from "@mui/material";
import DownloadIconSVG from "../static/download.svg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import html2canvas from "html2canvas";

const IconContainer = styled.img`
  width: 16px;
  height: 16px;
`;

const DownloadIcon = () => {
  return (
    <IconContainer src={DownloadIconSVG} />
  );
};

export const DownloadMapButton = () => {
  const isNarrowScreen = useMediaQuery({ query: "(max-width: 415px)" });
  const determineFontSize = () => {
    if (isNarrowScreen) {
      return "0.7rem";
    }
    return "0.87rem";
  };
  const downloadMap = () => {
    html2canvas(document.querySelector("#mapContainer") as HTMLElement).then((canvas: HTMLCanvasElement) => {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = canvas.toDataURL();
      a.download = "map.png";
      a.click();
      document.body.removeChild(a);
    });
  };
  return (
    <Button
      size={ isNarrowScreen ? "small" : "medium" }
      style={{ fontSize: determineFontSize() }}
      variant="outlined"
      startIcon={ <DownloadIcon /> }
      onClick={() => downloadMap()}
    >
      Download Map
    </Button>
  );
};
