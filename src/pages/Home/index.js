import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

import Card from "../../components/Card";
import Loading from "../../components/Loading";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getWeather(latitude, longitude) {
    setIsLoading(true);
    let params = {
      params: {
        lang: "pt_br",
        units: "metric",
        lat: latitude,
        lon: longitude,
        exclude: "minutely, hourly, alerts",
        appid: process.env.REACT_APP_WEATHER_KEY,
      },
    };

    try {
      let weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall`,
        params
      );
      setData(weather.data.daily);
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
  } else if (!isLoading && data.length === 0) {
    return (
      <div className="home-container">
        <h1>Localização não está habilitada :(</h1>
        <p>Habilite a localização e recarregue a página.</p>
      </div>
    );
  } else {
    return (
      <div className="home-container">
        <h1 className="home-title">Clima</h1>
        <div className="home-card-container">
          {data.map((item, index) => {
            return <Card key={index} type="forecast" data={item} />;
          })}
        </div>
      </div>
    );
  }
}

export default Home;
