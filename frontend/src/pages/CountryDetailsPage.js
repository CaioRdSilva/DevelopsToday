import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "../styles/Global.css";
import "../styles/CountryDetailsPage.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CountryDetailsPage = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [countryDetails, setCountryDetails] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flagImage, setFlagImage] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000);

    const countryUrl = `${process.env.REACT_APP_API_URL}/countries/countryInfo/${countryCode}`;

    fetch(countryUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching country data");
        }
        return response.json();
      })
      .then((countryData) => {
        setCountryDetails(countryData);

        const populationUrl = `${process.env.REACT_APP_API_URL}/countries/population/${countryData.commonName}`;
        const flagUrl = `${process.env.REACT_APP_API_URL}/countries/flags/${countryData.commonName}`;

        fetch(populationUrl)
          .then((populationRes) => {
            if (!populationRes.ok) {
              setPopulationData([]);
              return;
            }
            return populationRes.json();
          })
          .then((populationData) => {
            setPopulationData(populationData.populationCounts || []);
          });

        fetch(flagUrl)
          .then((flagRes) => {
            if (!flagRes.ok) {
              setFlagImage(null);
              return;
            }
            return flagRes.json();
          })
          .then((flagData) => {
            setFlagImage(flagData.flag);
          })
          .catch(() => {
            setFlagImage(null);
          });

        setLoading(false);
        clearTimeout(timeoutId);
      })
      .catch(() => {
        setPopulationData([]);
        setLoading(false);
        clearTimeout(timeoutId);
      });

    return () => clearTimeout(timeoutId);
  }, [countryCode]);

  if (loading) {
    return <div className="loading">Loading details...</div>;
  }

  const populationChartData =
    populationData && populationData.length > 0
      ? {
          labels: populationData.map((item) => item.year),
          datasets: [
            {
              label: "Population",
              data: populationData.map((item) => item.value),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        }
      : null;

  return (
    <div className="country-details-page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Countries List
        </button>
      </div>

      {countryDetails && (
        <>
          <div className="country-header">
            <h2 className="country-name">{countryDetails.commonName}</h2>
            <div className="flag-container">
              {flagImage ? (
                <img
                  className="country-flag"
                  src={flagImage}
                  alt={`Flag of ${countryDetails.commonName}`}
                />
              ) : (
                <p>Unable to load the flag.</p>
              )}
            </div>
          </div>

          <div className="country-info">
            <p>
              <strong>Region:</strong> {countryDetails.region}
            </p>
          </div>

          <div className="population-chart-container">
            <h3>Population Chart</h3>
            {populationChartData ? (
              <div className="population-chart">
                <Line data={populationChartData} />
              </div>
            ) : (
              <p>No population data available for this country.</p>
            )}
          </div>

          <div className="neighbors-list">
            <h3>Border Countries</h3>
            {countryDetails.borders && countryDetails.borders.length > 0 ? (
              countryDetails.borders.map((neighbor) => (
                <div
                  key={neighbor.countryCode}
                  className="neighbor-card"
                  onClick={() => navigate(`/country/${neighbor.countryCode}`)}
                >
                  <p>{neighbor.commonName}</p>
                </div>
              ))
            ) : (
              <p>No neighboring countries available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CountryDetailsPage;
