import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Comment,
  Form,
  Header,
  Dropdown,
  TextArea
} from "semantic-ui-react";
import { DropDownSelection } from "./DropDownSelection.js";

export function ReviewForm() {
  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.user);
  let selectedBeer = useSelector(state => state.selectedBeer);
  let review_content = useSelector(state => state.review_content);
  let review_score = useSelector(state => state.review_score);
  if (currentUser === null) return <h1>Loading...</h1>;

  // let handleChange = event => {
  //   dispatch({ type: "REVIEW_A_BEER", review_content: event.target.value });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/beer/reviews", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        review_beer_id: selectedBeer.id,
        review_score: review_score,
        review_content: review_content
      })
    })
      .then(res => res.json())
      .then(res => dispatch({ type: "UPDATE_REVIEWS", payload: res }));
    // dispatch({ type: "REVIEW_BEER_STATE_CHANGE", review_content: "" });
    document.getElementById("review_form").value = null;
  };

  let reviewScore = "";
  let handleReviewScore = e => {
    return (reviewScore = e.target.value);
  };
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Leave a Review!
        </Header>
        <Form reply>
          {/* <DropDownSelection /> */}
          <select
            name="score"
            onChange={e => {
              let score = e.target.value;
              console.log(score);
              dispatch({
                type: "REVIEW_SCORE",
                review_score: score
              });
            }}
          >
            <option value="" selected disabled>
              Review Score
            </option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
          <Form.TextArea
            // value={review_content}
            id="review_form"
            onChange={e => {
              let input = e.target.value;
              dispatch({
                type: "REVIEW_BEER_STATE_CHANGE",
                review_content: input,
                beer_id: selectedBeer.id,
                user_id: currentUser.username
              });
            }}
          />
          <Button
            id="submitbtn"
            onClick={e =>
              review_score != "" || currentUser === null
                ? handleSubmit(e)
                : console.log(false)
            }
            content="Add Review"
            labelPosition="left"
            icon="edit"
            style={{ marginBottom: "25px" }}
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  );
}
// NEXT STEP: need to make sure that the text captured in the input field is being sent properly to the backend API
//Make sure all params are covered when sending to the backend, ie. need to send the userId, beerId, content, and review score.
