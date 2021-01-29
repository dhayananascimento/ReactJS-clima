import React from "react";
import "./styles.css";

function Card({ type, data }) {
  return (
    <div className="card-container">
      <p>
        {type === "current"
          ? "Hoje"
          : new Date(data.dt * 1000).toLocaleDateString()}
      </p>
      <div className="card-weather-container">
        <p>
          {type === "current"
            ? Math.round(data.temp)
            : Math.round(data.temp.day)}
          <span>°C</span>
        </p>
        <div className="card-weather">
          <img
            width={40}
            height={40}
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
          ></img>
          <p>{data.weather[0].description}</p>
        </div>
      </div>

      <div className="card-details">
        {type === "current" ? null : (
          <p>
            max:
            <br /> {Math.round(data.temp.max)}°C
          </p>
        )}
        {type === "current" ? null : (
          <p>
            min:
            <br /> {Math.round(data.temp.min)}°C
          </p>
        )}

        <p>
          umidade:
          {type === "current" ? <span>&nbsp;</span> : <br />}
          {data.humidity}%
        </p>
        <p>
          sensação térmica: &nbsp;
          {type === "current"
            ? Math.round(data.feels_like)
            : Math.round(data.feels_like.day)}
          °C
        </p>
      </div>

      <div className="card-sun">
        <p>
          nascer do sol: {new Date(data.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p>pôr do sol: {new Date(data.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default Card;
