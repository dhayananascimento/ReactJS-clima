import React from "react";
import "./styles.css";

function Loading() {
  return (
    <div className="loading-activity-indicator">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
}

export default Loading;
