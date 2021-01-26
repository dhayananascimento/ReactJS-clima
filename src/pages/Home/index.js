import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

import Card from "../../components/Card";
import Loading from "../../components/Loading";

function Home() {
  const [forecastData, setForecastData] = useState([]);
  const [currentData, setCurrentData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  async function getWeather(latitude, longitude) {
    setIsLoading(true);
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

      let tam = forecast.data.list.length;
      let newForecast = [];

      for (let i = 0; i < tam; i += 8) {
        newForecast.push({
          city: forecast.data.city,
          list: forecast.data.list.slice(i, i + 8),
        });
      }

      setCurrentData(current.data);
      setForecastData(newForecast);
    } catch (error) {
      alert("Algo deu errado :(");
    }

    setIsLoading(false);
  }

  async function getGeolocation() {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      function () {
        setIsLoading(false);
        return;
      }
    );
  }

  useEffect(() => {
    getGeolocation();
  }, []);

  if (isLoading) {
    return (
      <div className="home-container">
        <Loading />
      </div>
    );
  } else if(!isLoading && !currentData){
    return (
      <div className="home-container">
        <h1>Localização não está habilitada :(</h1>
        <p>Habilite a localização e recarregue a página.</p>
      </div>
    )
  }else {
    return (
      <div className="home-container">
        <h1 className="home-title">Clima</h1>
        <div className="home-card-container">
          <Card type="current" data={currentData} />

          {forecastData.map((item, index) => {
            return <Card key={index} type="forecast" data={item} />;
          })}
        </div>
      </div>
    );
  }
}

export default Home;
