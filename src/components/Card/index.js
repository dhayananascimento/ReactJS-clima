import React from "react";
import "./styles.css";

function Card({ type, data }) {
  return (
    <div className="card-container">
      <h1>{type} Card</h1>
    </div>
  );
}

export default Card;
