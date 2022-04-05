import React from "react";
import styled from "styled-components";
import LogoImage from "../static/logo.png";
import { DownloadMapButton } from "./DownloadMapButton";

const MainContainer = styled.header`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 2px 0px;
  height: 60px;
  width: 100%;
  margin-bottom: 40px;
  padding: 0rem 2.2vw 0rem 1.2vw;
`;
const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  height: 78%;
  width: 120px;
  margin: 10px;
`;

export const Header = () => {
  return (
    <MainContainer>
      <ContentContainer>
        <Logo src={LogoImage} />
        <DownloadMapButton />
      </ContentContainer>
    </MainContainer>
  );
};
