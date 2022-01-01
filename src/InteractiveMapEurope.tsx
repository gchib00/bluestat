import React from 'react'
import EuropeSVG from './static/europe'
import styled from 'styled-components'

//stlying:
const MapContainer = styled.main`
  width: 60vw;
  height: 86vh;
  border: 3px solid black;
`

export const InteractiveMapEurope = () => {
  return (
    <MapContainer>
      <EuropeSVG />
    </MapContainer>
  )
}
