import React, { useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "./NavBar";
import { FavoriteBeerCard } from "./FavoriteBeerCard.js";
import { Grid, Card } from "semantic-ui-react";

export function Profile(props) {
  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.user);
  let favorites = useSelector(state => state.favorites);

  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/user_favorites`, {
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => dispatch({ type: "USER_FAVORITES", favorites: data }));
    }
  }, [currentUser]);

  if (currentUser === null) return <h1>Loading...</h1>;

  // console.log(currentUser.favorites);

  return (
    <div>
      <NavBar />
      <h2 style={{ marginRight: "80%", fontSize: "35px", color: "white" }}>
        {currentUser.username}'s favorite beers:
      </h2>
      <Grid centered columns={4}>
        <Card.Group>
          {favorites.map(favorite => {
            return <FavoriteBeerCard favorite={favorite} />;
          })}
        </Card.Group>
      </Grid>
    </div>
  );
}
