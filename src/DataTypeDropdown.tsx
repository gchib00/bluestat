import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

//styles:
const Container = styled.div`
  width: 50.2vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 10px 6px;
`
const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 360px;
  align-items: center;
`
//types:
// interface Props {
//   dataType: string;
//   selectedYear: string;
//   setDataType: React.Dispatch<React.SetStateAction<string>>;
//   setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
// }
// export const DataTypeDropdown = ({dataType, selectedYear, setDataType, setSelectedYear}: Props) => {
interface DataToProcess {
  dataType: string;
  selectedYear: string;
}
interface Props {
  dataToProcess: DataToProcess;
  setDataToProcess: React.Dispatch<React.SetStateAction<DataToProcess>>;
}
export const DataTypeDropdown = ({dataToProcess, setDataToProcess}: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>(dataToProcess.selectedYear)
  const [dataType, setDataType] = useState<string>(dataToProcess.dataType)

  const handleSubmit = () => {
    setDataToProcess({
      dataType: dataType,
      selectedYear: selectedYear
    })
    alert("shound have re-rendered")
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
          <MenuItem value="Population">Population</MenuItem>
        </Select>
        <TextField 
            type="number"
            sx={{width: 80, marginLeft: 1}}
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
        sx={{height: "40px"}}
      >Render Data
      </Button>
    </Container>
  )  
}