import React, { useState } from "react"
import { Button, CircularProgress, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import styled from "styled-components"
import { DataToProcess } from "../types"

//styles:
const Container = styled.div`
  width: 48.6vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 10px 6px;
`
const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 480px;
  align-items: center;
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
      <FormContainer style={{display: "flex", justifyContent: "space-between", flexDirection: "row", width: 350}}>
        <InputLabel 
          sx={{fontSize: "1.1rem", color: "black"}}
          id="dataType"
        >Select Metric:
        </InputLabel>
        <Select
          labelId="dataType"
          value={dataType}
          sx={{width: 150, marginLeft: 1, height: 40 }}
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
          sx={{width: 100, marginLeft: 1, height: 40 }}
          onChange={(e) => setVisibleCountries(e.target.value)}
        >
          <MenuItem value="EU">EU</MenuItem>
          <MenuItem value="EEA">EEA</MenuItem>
          <MenuItem value="Europe+">Europe+</MenuItem>
        </Select>
        <TextField
          type="number"
          sx={{width: 90, marginLeft: 1}}
          InputProps={{ inputProps: {max: 2020, min: 1990} }}
          size="small"    
          defaultValue={selectedYear}      
          label="Year"
          onKeyDownCapture={(e) => e.preventDefault()}
          onChange={(e) => setSelectedYear(e.target.value)}  
        />
      </FormContainer>
      <Button 
        type="submit" 
        onClick={handleSubmit}
        variant="contained"
        size="large"
        sx={{height: "40px", width: "154px"}}
      >
        {loader ? <CircularProgress size={"24px"} color="inherit" /> : "Render Data" }
      </Button>
    </Container>
  )  
}