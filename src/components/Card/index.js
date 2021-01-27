import React from "react";
import "./styles.css";

function Card({ data }) {
  return (
    <div className="card-container">
      <p>
        temp:
        {Math.round(data.temp.day)}
        <span>°C</span>
      </p>

      <p>
        feels_like:
        {Math.round(data.feels_like.day)}
        <span>°C</span>
      </p>

      <p>max: {data.temp.max}</p>
      <p>min: {data.temp.min}</p>

      <p>dt: {new Date(data.dt * 1000).toLocaleDateString()}</p>
      <p>humidity: {data.humidity}%</p>
      <p>sunrise: {new Date(data.sunrise * 1000).toLocaleTimeString()}</p>
      <p>sunset: {new Date(data.sunset * 1000).toLocaleTimeString()}</p>
      <p>{data.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      ></img>
    </div>
  );
}

export default Card;
