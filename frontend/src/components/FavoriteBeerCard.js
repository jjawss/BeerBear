import React, { useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export function FavoriteBeerCard(props) {
  console.log(props.favorite.average_score);

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
      <Link to={`/beer/${props.favorite.id}`}>
        <Card
          style={{ margin: "12px" }}
          image={props.favorite.image}
          header={props.favorite.name}
          meta={props.favorite.style}
          meta="Avg Score"
          meta={starScore(props.favorite.average_score)}
          description={`${props.favorite.description.substring(0, 200)}...`}
        />
      </Link>
    </div>
  );
}
