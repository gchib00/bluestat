import React from "react";
import { Button } from "@mui/material";
import DownloadIconSVG from "../static/download.svg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

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
  return (
    <Button
      size={ isNarrowScreen ? "small" : "medium" }
      style={{ fontSize: determineFontSize() }}
      variant="outlined"
      startIcon={ <DownloadIcon /> }
    >
      Download Map
    </Button>
  );
};
