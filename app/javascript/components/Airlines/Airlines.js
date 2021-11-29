import React, { useState, useEffect } from "react";
import axios from "axios";
import Airline from "./Airline";

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    // Get all of our airlines from api
    // Update airlines in our state

    axios
      .get("/api/v1/airlines.json")
      .then((res) => {
        setAirlines(res.data.data);
      })
      .catch((res) => console.log(res));
  }, []);

  const grid = airlines.map((item) => {
    return (
      <Airline
        key={item.attributes.name}
        attributes={item.attributes}
      ></Airline>
    );
  });

  return (
    <div className="home">
      <div className="header">
        <h1>OpenFlights</h1>
        <div className="subheader">Honest, unbiased airline reviews</div>
      </div>
      <div className="grid">
        <ul>{grid}</ul>
      </div>
    </div>
  );
};

export default Airlines;
