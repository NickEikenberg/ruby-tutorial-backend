import React from "react";

const ReviewForm = (props) => {
  // const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
  //   return (
  //     <div key={index}>
  //       <input
  //         type="radio"
  //         value={score}
  //         checked={props.review.score == score}
  //         onChange={() => console.log("onChange")}
  //         name="rating"
  //         id={`rating-${score}`}
  //       />
  //       <label></label>
  //     </div>
  //   );
  // });

  const numArray = [5, 4, 3, 2, 1];

  return (
    <div className="wrapper">
      <form onSubmit={props.handleSubmit}>
        <div>
          Have an experience with {props.attributes.name}? Share your review!
        </div>
        <div className="field">
          <input
            onChange={props.handleChange}
            value={props.review.title}
            type="text"
            name="title"
            placeholder="Review Title"
          ></input>
        </div>
        <div className="field">
          <input
            onChange={props.handleChange}
            value={props.review.description}
            type="text"
            name="description"
            placeholder="Review Description"
          ></input>
        </div>
        <div className="field">
          <div className="rating-container">
            <div className="rating-title-text">Rate This Airline</div>
            {numArray.map((score, index) => {
              <div key={index}>
                <input
                  type="radio"
                  value={score}
                  checked={props.review.score == score}
                  onChange={() => console.log("onChange")}
                  name="rating"
                  id={`rating-${score}`}
                />
                <label></label>
              </div>;
            })}
          </div>
        </div>
        <button type="submit">Submit your review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
