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
  visibleCountries: string;
  selectedYear: string;
}
//relevant countries - for filtering worldbank data:
const euStates=["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"]
const eeaStates=["IS","NO","LI"]
const otherRelevantStates=["GB","CH","RU","BY","UA","MD","BA","RS","ME","MK","AL","TR","GE","AM","AZ","AD","MC"]

export const InteractiveMapEurope = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [countriesData, setCountriesData] = useState<CountryData[]>([])
  const [loader, setLoader] = useState<boolean>(false) //loading animation switch
  const [dataToProcess, setDataToProcess] = useState<DataToProcess>({
    dataType: "None", selectedYear: "2019", visibleCountries: "EU"
  })

  const fetchData = async (selectedYear: string) => {
    const determineRelevantStates = () => { //depending on user's choice, determine which countries should be included in the data
      switch(dataToProcess.visibleCountries){
        case("EU"): {return euStates}
        case("EEA"): {return euStates.concat(eeaStates)}
        default: {return euStates.concat(eeaStates, otherRelevantStates)}
      }
    }
    const relevantStatesParam = determineRelevantStates().join(";") //create param to specify relevant countries for the api endpoint
    const determineResponseType = async () => {
      switch(dataToProcess.dataType) {
        case("GDP"): {
          return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/NY.GDP.MKTP.CD?date=${selectedYear}&format=json`)
        }
        case("GDP Per Capita"): {
          return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/NY.GDP.PCAP.CD?date=${selectedYear}&format=json`)
        }
        case("GDP Growth"): {
          return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/NY.GDP.MKTP.KD.ZG?date=${selectedYear}&format=json`)
        }       
        case("Population"): {
          return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/SP.POP.TOTL?date=${selectedYear}&format=json`)
        }
        case("Population Density"): {
          return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/EN.POP.DNST?date=${selectedYear}&format=json`)
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
    const data = await response.json()
    if(data) { 
      //fetch data of only relevant countries and set it to state:
      const relevantCountries = determineRelevantStates()
      const newArr = data[1].filter((state:any) => relevantCountries.includes(state.country.id))
      setCountryData(newArr)
      setLoader(false)
    }
  }

  useEffect(() => {
    if (dataToProcess.dataType === "None") {return setCountryData([])}
    fetchData(dataToProcess.selectedYear)
  }, [dataToProcess])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP/POP:
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