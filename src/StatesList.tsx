import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CountryData } from './types'

interface Props {
  sortedCountryList: CountryData[];
  dataType: string;
  year: string;
}
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
interface Row {
  name: string;
  code: string;
  value: string|number;
}

export const StatesList = ({sortedCountryList, dataType, year}: Props) => {
  const columns: Column[] = [
    { id: 'name', label: 'State', minWidth: 80 },
    { id: 'code', label: 'Code', minWidth: 30 },
    { id: 'value', label: 'Value', minWidth: 40 }
  ]
  const rows: Row[] = sortedCountryList.map(data => {
    return {
      name: data.country.value,
      code: data.country.id,
      value: data.value?.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") //format numbers to make them more readable
    }
  }).reverse() //reverse arr so that the values are listed from highest to lowest
  const getDataDescription = () => {
    switch(dataType){
      case("Population"): {return `Population per state (${year})`}
      case("Population Density"): {return `Population density (inhabitants per sq.km) per state (${year})`}
      case("GDP"): {return `GDP per state, in USD (${year})`}
      case("GDP Per Capita"): {return `GDP per capita per state, in USD (${year})`}
      case("GDP Growth"): {return `Percentage of annual GDP growth per state (${year})`}
      default: return null
    }
  }
  if (sortedCountryList.length < 1) {return null} //hide component if there is no data to display
  return (
    <div style={{marginLeft: "70px", width: "40vw"}}>
      <h3>{getDataDescription()}</h3>
      <TableContainer sx={{height: "40vh"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: "#6e6969", 
                    color: "white", 
                    fontWeight: "bold",
                    borderRight: "3px solid white",
                    textAlign: "center"
                  }}
                  key={column.id}
                  align={column.align}
                  style={{width: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = column.id as "name"|"code"|"value"
                    return (
                      <TableCell key={column.id} align={column.align} sx={{borderRight: "3px solid white", textAlign: "center"}}>
                        {row[value]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}