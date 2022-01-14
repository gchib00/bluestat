import React from "react"
import { Checkbox, FormControlLabel } from "@mui/material"
import { Color, DataToProcess } from "../types"
import styled from "styled-components"
import { ColorSelector } from "./ColorSelector"

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
    width: 92vw;
    margin: 0rem 2rem 0rem 0rem;
    flex-direction: row;
  }
`
interface Props {
  dataToProcess: DataToProcess;
  setDataToProcess: React.Dispatch<React.SetStateAction<DataToProcess>>;
  setMapColor: React.Dispatch<React.SetStateAction<Color>>;
}

export const SecondaryDataCustomization = ({dataToProcess, setDataToProcess, setMapColor}: Props) => {
  const showMicroStates: boolean = dataToProcess.microStates
  const handleCheckboxClick = () => {
    setDataToProcess({...dataToProcess, microStates: !showMicroStates})
  }

  return (
    <LowerContainer>
      <FormControlLabel
        control={<Checkbox checked={!showMicroStates} onChange={handleCheckboxClick} />}
        label="Disable microstates:"
        color="default"
        labelPlacement="start"
      />
      <ColorSelector setMapColor={setMapColor} />
    </LowerContainer>
  )
}