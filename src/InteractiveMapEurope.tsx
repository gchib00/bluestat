import React, { useEffect, useState } from 'react'
import EuropeSVG from './EuropeSVG'
import styled from 'styled-components'
import { CountryData } from './types'
import { DataTypeDropdown } from './DataTypeDropdown'

//stlying:
const MapContainer = styled.main`
  width: 50vw;
  min-width: 280px;
  min-height: 250px;
  margin: 0px 0px 0px 4px;
  border: 3px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
`
//types:
interface DataToProcess {
  dataType: string;
  selectedYear: string;
}
//list of eu countries - necessary for filtering worldbank data:
const euStates=["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"]
export const InteractiveMapEurope = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [countriesData, setCountriesData] = useState<CountryData[]>([])
  const [dataToProcess, setDataToProcess] = useState<DataToProcess>({dataType: "None", selectedYear: "2019"})
  const [loader, setLoader] = useState<boolean>(false) //loading animation switch

  const fetchData = async (selectedYear: string) => {
    const euStatesParam = euStates.join(";") //create param to specify relevant countries for the api endpoint
    const determineResponseType = async () => {
      switch(dataToProcess.dataType) {
        case("GDP"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/NY.GDP.MKTP.CD?date=${selectedYear}&format=json`)
        }
        case("Population"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/SP.POP.TOTL?date=${selectedYear}&format=json`)
        }
        case("GDP Per Capita"): {
          return fetch(`https://api.worldbank.org/v2/country/${euStatesParam}/indicator/NY.GDP.PCAP.CD?date=${selectedYear}&format=json`)
        }
        default: {
          setLoader(false)
          return null
        }
      }
    }
    setLoader(true)
    const response = await determineResponseType()
    if (!response) {return null}
    if (dataToProcess.dataType === "GDP per capita") {return null}
    const data = await response.json()
    if(data) { //filter out irrelevant countries (non-EU) and set to state:
      const newArr = data[1].filter((state:any) => euStates.includes(state.country.id))
      setCountryData(newArr)
      setLoader(false)
    }
  }

  useEffect(() => {
    console.log("dataType was changed to", dataToProcess.dataType)
    fetchData(dataToProcess.selectedYear)
  }, [dataToProcess])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP:
    const orderedArr = [...countryData].sort((a:CountryData, b:CountryData) => a.value-b.value)
    setCountriesData(orderedArr)
  }, [countryData])

  return (
    <>
    <DataTypeDropdown loader={loader} dataToProcess={dataToProcess} setDataToProcess={setDataToProcess} />
    <MapContainer>
      <EuropeSVG loader={loader} countriesData={countriesData} />
    </MapContainer>
    </>
  )
}