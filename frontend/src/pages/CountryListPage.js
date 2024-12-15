import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import "../styles/CountryListPage.css";

const CountryListPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL + "/countries";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching country data");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="country-list-page">
      <h1 className="page-title">Country List</h1>
      <div className="country-list">
        {countries.map((country) => (
          <div
            key={country.countryCode}
            className="country-card"
            onClick={() => handleCountryClick(country.countryCode)}
          >
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryListPage;
