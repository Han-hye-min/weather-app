import React from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/weatherbutton.css';

const WeatherButton = ({ getCurrentLocation, regions, onRegionSelect }) => {

  return (
    <div>
      <div className="weather-btn">
        <Button variant="info" className="btn" onClick={getCurrentLocation}>
          현재 지역
        </Button>
        {regions.map((region, index) => (
          <Button
            key={index}
            variant="warning"
            className="btn"
            onClick={() => onRegionSelect(region.lat, region.lon)}
          >
            {region.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
