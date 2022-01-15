import React from "react"
import { Checkbox, FormControlLabel, Typography } from "@mui/material"
import { Color, DataToProcess } from "../types"
import styled from "styled-components"
import { ColorSelector } from "./ColorSelector"
import { useMediaQuery } from "react-responsive"

const LowerContainer = styled.div`
  width: 48.7vw;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1333px) {
    width: 60vw;
    margin: 0rem 2rem 0rem 0rem;
    flex-direction: row;
  }
  @media (max-width: 900px) {
    width: 90vw;
    margin: 0rem 2rem 0rem 0rem;
    flex-direction: row;
  }
`
interface Props {
  dataToProcess: DataToProcess;
  setDataToProcess: React.Dispatch<React.SetStateAction<DataToProcess>>;
  mapColor: Color;
  setMapColor: React.Dispatch<React.SetStateAction<Color>>;
}

export const SecondaryDataCustomization = ({dataToProcess, setDataToProcess, mapColor, setMapColor}: Props) => {
  const showMicroStates: boolean = dataToProcess.microStates
  const handleCheckboxClick = () => {
    setDataToProcess({...dataToProcess, microStates: !showMicroStates})
  }
  const isNarrowScreen = useMediaQuery({ query: "(max-width: 385px)" })

  return (
    <LowerContainer>
      <FormControlLabel
        control={<Checkbox 
          checked={!showMicroStates} 
          onChange={handleCheckboxClick} 
          size={isNarrowScreen ? "small" : "medium"}
          sx={isNarrowScreen? {marginLeft: -1} : null}
        />}
        label={<Typography 
          sx={isNarrowScreen ? {fontSize: "0.85rem"} : null}>
          Disable Microstates: 
        </Typography>}
        color="default"
        labelPlacement="start"
        sx={{marginLeft: 0.6}}
      />
      <ColorSelector mapColor={mapColor} setMapColor={setMapColor} />
    </LowerContainer> 
  )
}