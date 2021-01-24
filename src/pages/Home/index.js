import "./styles.css";
import Card from "../../components/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [forecastData, setForecastData] = useState(false);
  const [currentData, setCurrentData] = useState(false);

  async function getWeather(latitude, longitude) {
    let params = {
      params: {
        lang: "pt_br",
        units: "metric",
        lat: latitude,
        lon: longitude,
        appid: process.env.REACT_APP_WEATHER_KEY,
      },
    };

    try {
      let current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        params
      );

      let forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        params
      );

      setCurrentData(current.data);
      setForecastData(forecast.data);
    } catch (error) {
      alert("Algo deu errado :(");
    }
  }

  function getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      function () {
        alert("Você precisa habilitar sua localização");
      }
    );
  }

  useEffect(() => {
    getGeolocation();
  }, []);

  return (
    <div className="container">
      <h1 className="title">CLima</h1>
      <div className="card-container">
        <Card />
      </div>
    </div>
  );
}

export default Home;
