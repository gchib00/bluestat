import React, { useEffect, useState } from 'react'
import EuropeSVG from './static/europe'
import styled from 'styled-components'
import { CountryData } from './types'

//stlying:
const MapContainer = styled.main`
  width: 50vw;
  border: 3px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
`
//list of eu countries - necessary for filtering worldbank data:
const euStates=["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"]
export const InteractiveMapEurope = () => {
  const [dataType, setDataType] = useState<string>("GDP")
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [countriesByGDP, setCountriesByGDP] = useState<CountryData[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedYear, setSelectedYear] = useState<string>("2020")

  const fetchData = async (year: string) => {
    const euStatesParam = euStates.join(";") //create param to specify relevant countries for the api endpoint
    const determineResponseType = () => {
      switch(dataType) {
        case("GDP"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/NY.GDP.MKTP.CD?date=${year}&format=json`)
        }
        case("POP"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/SP.POP.TOTL?date=${year}&format=json`)
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

  useEffect(() => {
    console.log("dataType was changed to", dataType)
    fetchData(selectedYear)
  }, [selectedYear, dataType])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP:
    const orderedArr = [...countryData].sort((a:CountryData, b:CountryData) => a.value-b.value)
    setCountriesByGDP(orderedArr)
  }, [countryData])

  return (
    <>
    <label htmlFor="dataType">Choose data type:</label>
    <select name="dataType" id="cars" onChange={(e) => setDataType(e.target.value)}>
      <option value="GDP">GDP</option>
      <option value="POP">Population</option>
    </select>
    <MapContainer>
      <EuropeSVG countriesByGDP={countriesByGDP} />
    </MapContainer>
    </>
  )
}