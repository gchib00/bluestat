import React, { useEffect, useState } from 'react'
import EuropeSVG from './static/europe'
import styled from 'styled-components'
import { CountryData } from './types'
import { DataTypeDropdown } from './DataTypeDropdown'

//stlying:
const MapContainer = styled.main`
  width: 50vw;
  margin: 0px 0px 0px 4px;
  border: 3px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
`

interface DataToProcess {
  dataType: string;
  selectedYear: string;
}

//list of eu countries - necessary for filtering worldbank data:
const euStates=["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"]
export const InteractiveMapEurope = () => {
  // const [dataType, setDataType] = useState<string>("GDP")
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [countriesByGDP, setCountriesByGDP] = useState<CountryData[]>([])
  // const [selectedYear, setSelectedYear] = useState<string>("2019")
  const [dataToProcess, setDataToProcess] = useState<DataToProcess>({dataType: "None", selectedYear: "2019"})

  const fetchData = async (selectedYear: string) => {
    const euStatesParam = euStates.join(";") //create param to specify relevant countries for the api endpoint
    const determineResponseType = () => {
      switch(dataToProcess.dataType) {
        case("GDP"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/NY.GDP.MKTP.CD?date=${selectedYear}&format=json`)
        }
        case("Population"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/SP.POP.TOTL?date=${selectedYear}&format=json`)
        }
        default: return null
      }
    }
    const response = await determineResponseType()
    if (!response) {return null}
    const data = await response.json()
    if(data) { //filter out irrelevant countries (non-EU) and set to state:
      const newArr = data[1].filter((state:any) => euStates.includes(state.country.id))
      console.log('newArr=', newArr)
      return setCountryData(newArr)
    }
  }

  // useEffect(() => {
  //   console.log("dataType was changed to", dataToProcess.dataType)
  //   fetchData(selectedYear)
  // }, [selectedYear, dataType])

  useEffect(() => {
    console.log("dataType was changed to", dataToProcess.dataType)
    fetchData(dataToProcess.selectedYear)
  }, [dataToProcess])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP:
    const orderedArr = [...countryData].sort((a:CountryData, b:CountryData) => a.value-b.value)
    setCountriesByGDP(orderedArr)
  }, [countryData])

  return (
    <>
    {/* <DataTypeDropdown dataType={dataType} setDataType={setDataType} selectedYear={selectedYear} setSelectedYear={setSelectedYear} /> */}
    <DataTypeDropdown dataToProcess={dataToProcess} setDataToProcess={setDataToProcess} />
    <MapContainer>
      <EuropeSVG countriesByGDP={countriesByGDP} />
    </MapContainer>
    </>
  )
}