import React, { useEffect } from "react";
import { ReviewForm } from "./ReviewForm";
import { useSelector, useDispatch } from "react-redux";
import { Header, Comment, Icon } from "semantic-ui-react";

export function Reviews(props) {
  let dispatch = useDispatch();

  // console.log(props.beerId);
  // const beerId = props.match.params.id;
  useEffect(() => {
    fetch(`http://localhost:3000/beer/reviews/${props.beerId}`)
      .then(res => res.json())
      .then(reviews =>
        dispatch({ type: "GET_REVIEWS_BY_BEER", payload: reviews })
      ); //=> console.log(reviews));
  }, []);
  let reviews = useSelector(state => state.reviews_by_beer);
  if (reviews === null) {
    return <h1>loading...</h1>;
  }

  const starScore = score => {
    if (score === 5) {
      return (
        <div>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </div>
      );
    } else if (score === 4) {
      return (
        <div>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star outline" />
        </div>
      );
    } else if (score === 3) {
      return (
        <div>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
        </div>
      );
    } else if (score === 2) {
      return (
        <div>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
        </div>
      );
    } else if (score === 1) {
      return (
        <div>
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
        </div>
      );
    } else {
      return (
        <div>
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
          <Icon color="yellow" name="star outline" />
        </div>
      );
    }
  };

  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Reviews
        </Header>
        {reviews.map(review => {
          if (review.user.username === null) {
            return <h1>loading...</h1>;
          }
          return (
            <div>
              <segment raised>
                <Comment>
                  <Comment.Content>
                    <Comment.Author as="a">
                      {review.user.username}
                    </Comment.Author>
                    <Comment.Text>
                      <p>{review.content}</p>
                    </Comment.Text>
                    <Comment.Metadata>
                      {starScore(review.score)}
                      {review.score}
                    </Comment.Metadata>
                  </Comment.Content>
                </Comment>
              </segment>
            </div>
          );
        })}
      </Comment.Group>
    </div>
  );
}
