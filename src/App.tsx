import React from 'react';
import { InteractiveMapEurope } from './InteractiveMapEurope';

interface FetchProps {
  countryCode: string;
  year: string;
}

function App() {
  
  const fetchData = async ({countryCode, year}: FetchProps) => {
    const response = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?date=${year}&format=json`)
    // console.log(await response.json())
    const data = await response.json()
    console.log(data)
  } 
  fetchData({countryCode: 'IT', year: '2007'})

  return (
    <div className="App">
      <h1>test</h1>
      <InteractiveMapEurope />
    </div>
  );
}

export default App;
