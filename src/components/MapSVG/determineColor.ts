import { Color, CountryData } from "../../types"

interface Props {
  country: string;
  mapColor: Color;
  sortedCountryList: CountryData[];
}

export const determineColor = ({country, mapColor, sortedCountryList}: Props) => { //formulate which color the country should get:
  if (!sortedCountryList || sortedCountryList.length === 0) {return "#292929"}
  //determine highest value:
  const highestValue = sortedCountryList[sortedCountryList.length-1].value
  const countryData = sortedCountryList.find(state => state.country.id === country)
  if (!countryData) {return "#292929"}
  //assign color accordingly:
  if (mapColor === "blue"){
    switch(true) {
    case(countryData.value < highestValue*5/100): {return "#95dbf9"}
    case(countryData.value < highestValue*10/100): {return "#82d5f8"}
    case(countryData.value < highestValue*15/100): {return "#6fcef6"}
    case(countryData.value < highestValue*20/100): {return "#5bc8f5"}
    case(countryData.value < highestValue*25/100): {return "#48c1f4"}
    case(countryData.value < highestValue*30/100): {return "#35bbf3"}
    case(countryData.value < highestValue*35/100): {return "#21b4f2"}
    case(countryData.value < highestValue*40/100): {return "#0eaef1"}
    case(countryData.value < highestValue*45/100): {return "#0da0de"}
    case(countryData.value < highestValue*50/100): {return "#0c92ca"}
    case(countryData.value < highestValue*55/100): {return "#0b84b7"}
    case(countryData.value < highestValue*60/100): {return "#0a76a4"}
    case(countryData.value < highestValue*65/100): {return "#096890"}
    case(countryData.value < highestValue*70/100): {return "#075a7d"}
    case(countryData.value < highestValue*75/100): {return "#064c6a"}
    case(countryData.value < highestValue*80/100): {return "#053e57"}
    case(countryData.value < highestValue*85/100): {return "#043143"} 
    case(countryData.value < highestValue*90/100): {return "#042735"}
    case(countryData.value < highestValue*95/100): {return "#041f2a"}
    case(countryData.value === highestValue): {return "#02151d"}
    }
  } else if (mapColor === "red") {
    switch(true) {
    case(countryData.value < highestValue*5/100): {return "#fff2f2"}
    case(countryData.value < highestValue*10/100): {return "#ffd9d9"}
    case(countryData.value < highestValue*15/100): {return "#ffbfbf"}
    case(countryData.value < highestValue*20/100): {return "#ffa6a6"}
    case(countryData.value < highestValue*25/100): {return "#ff8c8c"}
    case(countryData.value < highestValue*30/100): {return "#ff7373"}
    case(countryData.value < highestValue*35/100): {return "#ff5959"}
    case(countryData.value < highestValue*40/100): {return "#ff4040"}
    case(countryData.value < highestValue*45/100): {return "#ff2626"}
    case(countryData.value < highestValue*50/100): {return "#ff0d0d"}
    case(countryData.value < highestValue*55/100): {return "#f20000"}
    case(countryData.value < highestValue*60/100): {return "#d90000"}
    case(countryData.value < highestValue*65/100): {return "#bf0000"}
    case(countryData.value < highestValue*70/100): {return "#a60000"}
    case(countryData.value < highestValue*75/100): {return "#8c0000"}
    case(countryData.value < highestValue*80/100): {return "#730000"}
    case(countryData.value < highestValue*85/100): {return "#590000"} 
    case(countryData.value < highestValue*90/100): {return "#400000"}
    case(countryData.value < highestValue*95/100): {return "#260000"}
    case(countryData.value === highestValue): {return "#0d0000"}
    }    
  } else if (mapColor === "green") {
    switch(true) {
    case(countryData.value < highestValue*5/100): {return "#f7fbf6"}
    case(countryData.value < highestValue*10/100): {return "#e6f4e5"}
    case(countryData.value < highestValue*15/100): {return "#d6edd4"}
    case(countryData.value < highestValue*20/100): {return "#c5e6c3"}
    case(countryData.value < highestValue*25/100): {return "#b5deb2"}
    case(countryData.value < highestValue*30/100): {return "#a4d7a1"}
    case(countryData.value < highestValue*35/100): {return "#94d090"}
    case(countryData.value < highestValue*40/100): {return "#83c97f"}
    case(countryData.value < highestValue*45/100): {return "#73c16e"}
    case(countryData.value < highestValue*50/100): {return "#62ba5d"}
    case(countryData.value < highestValue*55/100): {return "#52b34c"}
    case(countryData.value < highestValue*60/100): {return "#4aa245"}
    case(countryData.value < highestValue*65/100): {return "#42913e"}
    case(countryData.value < highestValue*70/100): {return "#3a8036"}
    case(countryData.value < highestValue*75/100): {return "#336f2f"}
    case(countryData.value < highestValue*80/100): {return "#2b5e28"}
    case(countryData.value < highestValue*85/100): {return "#234d21"} 
    case(countryData.value < highestValue*90/100): {return "#1b3c19"}
    case(countryData.value < highestValue*95/100): {return "#132b12"}
    case(countryData.value === highestValue): {return "#0c1a0b"}
    }     
  }
}
