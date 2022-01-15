import React, { useState } from "react"
import styled from "styled-components"
import PaletteSVG from "../static/palette.svg"
import BlueSVG from "../static/blue-circle.svg"
import RedSVG from "../static/red-circle.svg"
import GreenSVG from "../static/green-circle.svg"
import { Color } from "../types"

//styling:
const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const SliderDiv = styled.div`
  z-index: 1;
  position: relative;
  left: 2px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-right: 0px;
  border-radius: 8px 0px 0px 8px;
  transition: 500ms;
  background-color: #ece8e8;
  @media (max-width: 400px) {
    height: 26px;
  }
`
const PaletteButton = styled.button`
  z-index: 2;
  width: 60px;
  height: 36px;
  border: 1px solid black;
  border-radius: 2px;
  transition: 400ms;
  padding: 5px;
  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
  &:active {
    box-shadow: 0px 0px 0px 0px;
  }
  @media (max-width: 400px) {
    width: 34px;
    height: 28px;
    padding: 3px;
  }
`
const PaletteIcon = styled.img`
  width: 36px;
  height: 100%;
  @media (max-width: 400px) {
    width: 24px;
    height: 20px;
    padding: 3px;
  }
`
const ColorPalette = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 70%;
  align-items: center;
  @media (max-width: 400px) {
    width: 64%;
  }
`
const ColorIcon = styled.img`
  width: 16px;
  height: 16px;
  &:hover {
    filter: brightness(50%);
    cursor: pointer;
  }
`
const invisibleSliderContent = {
  opacity: 0
}
const visibleSliderContent = {
  transitionDelay: "500ms",
  transitionDuration: "300ms",
  opacity: 1
}

interface Props { 
  mapColor: Color;
  setMapColor: React.Dispatch<React.SetStateAction<Color>>;
}

export const ColorSelector = ({mapColor, setMapColor}: Props) => {
  const [slider, setSlider] = useState("0px")
  const [sliderContent, setSliderContent] = useState(invisibleSliderContent)

  const handleClick = () => {
    if (slider === "0px") {
      setSliderContent(visibleSliderContent)
      return setSlider("100px")
    } else {
      setSliderContent(invisibleSliderContent)
      setSlider("0px")
    }
  }
  const selected = (color: string) => {
    if (color === mapColor) {
      return{ backgroundColor: "black", padding: 1, borderRadius: 10}
    }
  }

  return(
    <MainContainer>
      <SliderDiv style={{width: slider}}>
        <ColorPalette style={sliderContent}>
          <ColorIcon style={selected("blue")} 
            src={BlueSVG} alt="blue color" onClick={() => setMapColor("blue")}/>
          <ColorIcon style={selected("red")} 
            src={RedSVG} alt="red color" onClick={() => setMapColor("red")}/>
          <ColorIcon style={selected("green")} 
            src={GreenSVG} alt="green color" onClick={() => setMapColor("green")}/>
        </ColorPalette>
      </SliderDiv>
      <PaletteButton onClick={handleClick}>
        <PaletteIcon src={PaletteSVG} alt="palette icon" />
      </PaletteButton>
    </MainContainer>
  )
}