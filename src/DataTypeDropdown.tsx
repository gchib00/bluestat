import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

//styles:
const Container = styled.div`
  width: 640px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0px 5px 0px;
`
//types:
interface Props {
  dataType: string;
  selectedYear: string;
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}
export const DataTypeDropdown = ({dataType, selectedYear, setDataType, setSelectedYear}: Props) => {
  return (
    <Container>
      <InputLabel id="dataTypeLabel">Select Metric: </InputLabel>
      <Select
        labelId="dataTypeLabel"
        id="dataType"
        value={dataType}
        sx={{width: 140, marginLeft: 1, height: 40 }}
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
          onChange={(e) => {setSelectedYear(e.target.value)}}  
      />
      </Container>
  )  
}
