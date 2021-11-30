import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import styled from "styled-components";

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  const Wrapper = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  `;
  const Column = styled.div`
    background: white;
    height: 100vh;
    overflow: scroll;

    &:last-child {
      background: #efefef;
    }
  `;
  const Main = styled.div`
    padding-left: 50px;
  `;

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;

    axios
      .get(url)
      .then((res) => {
        setAirline(res.data);
        setLoaded(true);
      })
      .catch((res) => console.log(res));
  }, []);

  const handleChange = (event) => {
    event.preventDefault();

    setReview({ ...review, [event.target.name]: event.target.value });

    console.log("review:", review);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    const airline_id = airline.data.id;
    axios
      .post("/api/v1/reviews", { review, airline_id })
      .then((res) => {
        const included = [...airline.included, res.data.data];
        setAirline({ ...airline, included });
        setReview({ title: "", description: "", score: 0 });
      })
      .catch((res) => {});
  };

  return (
    <Wrapper>
      {loaded && (
        <>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included}
              ></Header>
              <div className="reviews"></div>
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              attributes={airline.data.attributes}
              review={review}
            />
          </Column>
        </>
      )}
    </Wrapper>
  );
};

export default Airline;
