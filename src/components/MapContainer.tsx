import React from "react";
import styled from "styled-components";
import { InteractiveMapEurope } from "./InteractiveMapEurope";

const MainContainer = styled.main`
  width: 90vw;
  margin: 0px 2vw 0px 2vw;
  @media (max-width: 1333px) {
    width: 60vw;
    margin: 0px 20vw 0px 20vw;
  }
  @media (max-width: 900px) {
    width: 90vw;
    margin: 0px 2vw 0px 2vw;
  }
`;

export const MapContainer = () => {
  return (
    <MainContainer>
      <InteractiveMapEurope />
    </MainContainer>
  );
};
