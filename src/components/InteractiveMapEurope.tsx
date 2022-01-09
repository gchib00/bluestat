import React, { useEffect, useState } from 'react'
import EuropeSVG from './MapSVG/EuropeSVG'
import styled from 'styled-components'
import { Color, CountryData, DataToProcess } from '../types'
import { DataCustomization } from './DataCustomization'
import { StatesList } from './StatesList'
import { SecondaryDataCustomization } from './SecondaryDataCustomization'

//stlying:
const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`
const MapContainer = styled.div`
  width: 48.6vw;
  min-height: 250px;
  margin: 0px 0px 0px 4px;
  border-radius: 4px;
  border: 3px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
`
//relevant countries - for filtering worldbank data:
const euStates=["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"]
const eeaStates=["IS","NO","LI"]
const otherRelevantStates=["GB","CH","RU","BY","UA","MD","BA","RS","ME","MK","AL","TR","GE","AM","AZ","AD","MC"]
const microStatesList = ["LI","AD","MC"]

export const InteractiveMapEurope = () => {
  const [mapColor, setMapColor] = useState<Color>("blue")
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [sortedCountryList, setSortedCountryList] = useState<CountryData[]>([])
  const [loader, setLoader] = useState<boolean>(false) //loading animation switch
  const [dataToProcess, setDataToProcess] = useState<DataToProcess>({
    dataType: "None", selectedYear: "2019", visibleCountries: "EU", microStates: false
  })

  const determineRelevantStates = () => { //depending on user's choice, determine which countries should be included in the data
    let relevantStates = []
    switch(dataToProcess.visibleCountries){
      case("EU"): {relevantStates = euStates; break}
      case("EEA"): {relevantStates = euStates.concat(eeaStates); break}
      default: {relevantStates = euStates.concat(eeaStates, otherRelevantStates)}
    }
    if (!dataToProcess.microStates) { //filter out micro states  
      relevantStates = relevantStates.filter(state => (!microStatesList.includes(state)))
    }
    return relevantStates
  }

  const fetchData = async (selectedYear: string) => {
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
    if (dataToProcess.dataType === "None") {return setCountryData([])} //reset map if "None" is selected
    fetchData(dataToProcess.selectedYear)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToProcess])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP/POP:
    const orderedArr = [...countryData].sort((a:CountryData, b:CountryData) => a.value-b.value)
    setSortedCountryList(orderedArr)
  }, [countryData])

  return (
    <main style={{marginLeft: 20, marginRight: 40}}>
    <DataCustomization loader={loader} dataToProcess={dataToProcess} setDataToProcess={setDataToProcess} />
    <MainContainer>
      <MapContainer>
        <EuropeSVG loader={loader} sortedCountryList={sortedCountryList} mapColor={mapColor} />
      </MapContainer>
      <StatesList sortedCountryList={sortedCountryList} dataType={dataToProcess.dataType} year={dataToProcess.selectedYear} />
    </MainContainer>
    <SecondaryDataCustomization dataToProcess={dataToProcess} setDataToProcess={setDataToProcess} setMapColor={setMapColor}/>
    </main>
  )
}