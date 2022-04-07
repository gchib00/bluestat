import React from "react";
import { Header } from "./components/Header";
import { MapContainer } from "./components/MapContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/europe" />} />
        <Route path="/europe" element={<MapContainer />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
