import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const list = airlines.map((item) => {
    return <li key={item.attributes.name}>{item.attributes.name}</li>;
  });

  return (
    <div>
      <div>This is the Airlines#index view for our app.</div>
      <ul>{list}</ul>
    </div>
  );
};

export default Airlines;
