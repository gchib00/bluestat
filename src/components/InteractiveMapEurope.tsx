import React, { useEffect, useState } from "react"
import EuropeSVG from "./MapSVG/EuropeSVG"
import styled from "styled-components"
import { Color, CountryData, DataToProcess } from "../types"
import { DataCustomization } from "./DataCustomization"
import { StatesList } from "./StatesList"
import { SecondaryDataCustomization } from "./SecondaryDataCustomization"
import { useMediaQuery } from "react-responsive"

//stlying:
const MainContainer = styled.main`
  width: 90vw;
  margin: 0px 2vw 0px 2vw;
  @media (max-width: 1333px) {
    width: 60vw;
    margin: 0px 20vw 0px 20vw;
  }
  @media (max-width: 900px) {
    width: 90vw;
    margin: 0px 2vw 0px 2vw;
  }
`
const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 1333px) {
    width: 60vw;
    flex-direction: column;
    justify-content: flex-start;
  }
  @media (max-width: 900px) {
    width: 90vw;
    flex-direction: column;
    justify-content: flex-start;
  }
`
const MapContainer = styled.div`
  width: 48.6vw;
  min-height: 250px;
  margin: 0px 4px 0px 4px;
  border-radius: 4px;
  border: 2px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  @media (max-width: 1333px) {
    width: 60vw;
  }
  @media (max-width: 900px) {
    width: 90vw;
  }
  @media (max-width: 415px) {
    min-height: 130px;
  }
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
  const [dataDesc, setDataDesc] = useState<string>("")
  const [dataToProcess, setDataToProcess] = useState<DataToProcess>({
    dataType: "None", selectedYear: "2019", visibleCountries: "EU", microStates: false
  })
  const isWideScreen = useMediaQuery({ query: "(min-width: 1333px)" })

  const determineRelevantStates = () => { //depending on user"s choice, determine which countries should be included in the data
    let relevantStates = []
    switch(dataToProcess.visibleCountries){
    case("EU"): {
      relevantStates = euStates
      break
    }
    case("EEA"): {
      relevantStates = euStates.concat(eeaStates)
      break
    }
    default: {
      relevantStates = euStates.concat(eeaStates, otherRelevantStates)
    }}
    if (!dataToProcess.microStates) { //filter out micro states  
      relevantStates = relevantStates.filter(state => (!microStatesList.includes(state)))
    }
    return relevantStates
  }

  const fetchData = async (selectedYear: string) => {
    const relevantStatesParam = determineRelevantStates().join(";") //create param to specify relevant countries for the api endpoint
    const determineResponseType = async () => {
      switch(dataToProcess.dataType) {
      case("Urban Population"): {
        return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/SP.URB.TOTL.IN.ZS?date=${selectedYear}&format=json`)
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
      case("Population Growth"): {
        return fetch(`https://api.worldbank.org/v2/country/${relevantStatesParam}/indicator/SP.POP.GROW?date=${selectedYear}&format=json`)
      }
      default: {
        setLoader(false)
        return null
      }}
    }
    setLoader(true)
    const response = await determineResponseType()
    if (!response) {return null}
    const data = await response.json()
    if(data) { 
      //fetch data of the relevant countries only and set it to state:
      const relevantCountries = determineRelevantStates()
      const newArr = data[1].filter((state: CountryData) => relevantCountries.includes(state.country.id))
      setCountryData(newArr)
      setDataDesc(data[1][0].indicator.value)
      setLoader(false)
    }
  }

  useEffect(() => {
    if (dataToProcess.dataType === "None") {return setCountryData([])} //reset map if "None" is selected
    fetchData(dataToProcess.selectedYear)
  }, [dataToProcess])

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by GDP/POP:
    const orderedArr = [...countryData].sort((a:CountryData, b:CountryData) => a.value-b.value)
    setSortedCountryList(orderedArr)
  }, [countryData])

  return (
    <MainContainer>
      <DataCustomization
        loader={loader}
        dataToProcess={dataToProcess}
        setDataToProcess={setDataToProcess} 
      />
      <ContentContainer>
        <MapContainer>
          <EuropeSVG
            loader={loader}
            sortedCountryList={sortedCountryList}
            mapColor={mapColor} 
          />
        </MapContainer>
        {isWideScreen ? null : 
          <SecondaryDataCustomization
            dataToProcess={dataToProcess}
            setDataToProcess={setDataToProcess}
            mapColor={mapColor}
            setMapColor={setMapColor}
          />}
        <StatesList
          dataDesc={dataDesc}
          sortedCountryList={sortedCountryList}
          dataType={dataToProcess.dataType}
        />
      </ContentContainer>
      {isWideScreen ? <SecondaryDataCustomization dataToProcess={dataToProcess} setDataToProcess={setDataToProcess} mapColor={mapColor} setMapColor={setMapColor}/> : null}
    </MainContainer>
  )
}