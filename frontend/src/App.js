import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryListPage from "./pages/CountryListPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryListPage />} />

        <Route path="/country/:countryCode" element={<CountryDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
