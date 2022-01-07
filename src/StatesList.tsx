import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CountryData } from './types'

interface Props {
  countriesData: CountryData[];
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

export const StatesList = ({countriesData, dataType, year}: Props) => {
  const columns: Column[] = [
    { id: 'name', label: 'State', minWidth: 100 },
    { id: 'code', label: 'Code', minWidth: 30 },
    { id: 'value', label: 'Value', minWidth: 40 }
  ]
  const rows: Row[] = countriesData.map(data => {
    return {
      name: data.country.value,
      code: data.country.id,
      value: data.value.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }).reverse()
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
  return (
    <div style={{marginLeft: "70px", width: "40vw"}}>
      <h3>{getDataDescription()}</h3>
      <TableContainer sx={{height: "40vh"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{backgroundColor: "#292929", color: "white", fontWeight: "bold"}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = column.id as "name"|"code"|"value"
                      return (
                        <TableCell key={column.id} align={column.align}>
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