import React from "react";
import "./styles.css";

function Card({ type, data }) {
  if (type === "current") {
    return (
      <div className="card-container">
        <p className="card-temp">
          {Math.round(data.main.temp)}
          <span>°C</span>
        </p>
        <p className="card-location">
          {data.name}, {data.sys.country}
        </p>

        <p className="card-feels">
          Sensação: {Math.round(data.main.feels_like)}°C
        </p>
        <p className="card-description">{data.weather[0].description}</p>
      </div>
    );
  }

  const date = data.list?.[0].dt_txt.split(" ", 1);

  return (
    <div className="card-container">
      <p>{date}</p>
      <p>
        {data.city.name}, {data.city.country}
      </p>

      <div className="forecast-container">
        {data.list.map((item, index) => {
          return (
            <div key={index} className="forecast-container-time">
              <p>{item.dt_txt.split(" ")[1]}</p>
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
