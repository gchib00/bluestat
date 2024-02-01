import React from "react";
import { Header } from "./components/Header";
import { MapContainer } from "./components/MapContainer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MapContainer />
    </BrowserRouter>
  );
}
export default App;
