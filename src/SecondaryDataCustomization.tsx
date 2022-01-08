import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { DataToProcess } from './types'

interface Props {
  dataToProcess: DataToProcess;
  setDataToProcess: React.Dispatch<React.SetStateAction<DataToProcess>>;
}

export const SecondaryDataCustomization = ({dataToProcess, setDataToProcess}: Props) => {
  const showMicroStates: boolean = dataToProcess.microStates
  const handleCheckboxClick = () => {
    setDataToProcess({...dataToProcess, microStates: !showMicroStates})
  }

  return (
    <FormControlLabel
      sx={{margin: 0.8}}
      control={<Checkbox checked={!showMicroStates} onChange={handleCheckboxClick} />}
      label="Disable microstates:"
      color="default"
      labelPlacement="start"
    />
  )
}