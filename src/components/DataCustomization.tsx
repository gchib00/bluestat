import React, { useState } from "react"
import { Button, CircularProgress, MenuItem, Select, TextField } from "@mui/material"
import styled from "styled-components"
import { DataToProcess } from "../types"
import { useMediaQuery } from "react-responsive"

//styles:
const Container = styled.div`
  width: 48.6vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 10px 6px;
  @media (max-width: 1333px) {
    min-width: 100%;
    height: 120px;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 365px) {
    min-width: 100%;
    height: 180px;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
`
const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 480px;
  align-items: center;
  @media (max-width: 1333px) {
    min-width: 180px;
    width: 320px;
    height: 60px;
  }
  @media (max-width: 365px) {
    min-width: 180px;
    width: 90vw;
    height: 130px;
    flex-wrap: wrap;
  }
`
const DataTypeLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  color: black;
`
interface Props {
  loader: boolean;
  dataToProcess: DataToProcess;
  setDataToProcess: React.Dispatch<React.SetStateAction<DataToProcess>>;
}
export const DataCustomization = ({loader, dataToProcess, setDataToProcess}: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>(dataToProcess.selectedYear)
  const [dataType, setDataType] = useState<string>(dataToProcess.dataType)
  const [visibleCountries, setVisibleCountries] = useState<string>(dataToProcess.visibleCountries)
  const isWideScreen = useMediaQuery({ query: "(min-width: 1333px)" })
  const isNarrowScreen = useMediaQuery({ query: "(max-width: 365px)" })

  const handleSubmit = () => {
    setDataToProcess({
      dataType: dataType,
      visibleCountries: visibleCountries,
      selectedYear: selectedYear,
      microStates: dataToProcess.microStates
    })
  }

  return (
    <Container>
      <FormContainer>
        {isWideScreen ? <DataTypeLabel htmlFor="dataType">Select Metric:</DataTypeLabel> : null}
        <Select
          id="dataType"
          value={dataType}
          sx={isNarrowScreen ? {width:"100%", marginLeft:1, height:40} : {width:150, marginLeft:1, height:40 }}
          onChange={(e) => setDataType(e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="GDP">GDP</MenuItem>
          <MenuItem value="GDP Per Capita">GDP Per Capita</MenuItem>
          <MenuItem value="GDP Growth">GDP Growth</MenuItem>
          <MenuItem value="Population">Population</MenuItem>
          <MenuItem value="Population Density">Population Density</MenuItem>
          <MenuItem value="Population Growth">Population Growth</MenuItem>
        </Select>
        <Select
          value={visibleCountries}
          sx={isNarrowScreen ? {width:"45%", marginLeft:1, height:40}: {width:100, marginLeft:1, height:40}}
          onChange={(e) => setVisibleCountries(e.target.value)}
        >
          <MenuItem value="EU">EU</MenuItem>
          <MenuItem value="EEA">EEA</MenuItem>
          <MenuItem value="Europe+">Europe+</MenuItem>
        </Select>
        <TextField
          type="number"
          sx={isNarrowScreen ? {width:"45%", marginLeft:1} : {width:90, marginLeft:1}}
          InputProps={{ inputProps: {max:2020, min:1990} }}
          size="small"    
          defaultValue={selectedYear}      
          label="Year"
          onKeyDownCapture={(e) => e.preventDefault()}
          onChange={(e) => setSelectedYear(e.target.value)}  
        />
      </FormContainer>
      {isWideScreen ?
        <Button 
          type="submit" 
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{height: "40px", width: "154px"}}
        >
          { loader ? <CircularProgress size={"24px"} color="inherit" /> : "Render Data" }
        </Button>
        :
        <Button 
          type="submit" 
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{height: "40px", width: "90vw", textAlign: "center"}}
        >
          { loader ? <CircularProgress size={"24px"} color="inherit" /> : "Render Data" }
        </Button>
      }
    </Container>
  )  
}