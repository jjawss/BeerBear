import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";

export function FavButton(props) {
  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.user);
  let favorites = useSelector(state => state.favorites);
  let favStatus = favorites.some(
    favorite => favorite.id === props.selectedBeer.id
  );
  let favoriteIds = useSelector(state => state.favoriteIds);

  let selectedBeerFavId = "";

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/user_favorites`, {
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => dispatch({ type: "USER_FAVORITES", favorites: data }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/user_favorite_ids/${currentUser.id}`, {
        credentials: "include"
      })
        .then(res => res.json())
        .then(data =>
          dispatch({ type: "USER_FAVORITE_IDS", favoriteIds: data })
        );
    }
  }, [currentUser]);

  const changeHeartStyle = () => {
    if (favStatus) {
      return <Icon name="heart" size="big" color="red" />;
    } else {
      return <Icon name="heart outline" size="big" color="red" />;
    }
  };

  const findFavoriteId = selectedBeer => {
    favoriteIds.forEach(favoriteId => {
      if (favoriteId.beer_id === selectedBeer) {
        selectedBeerFavId = favoriteId.id;
        return selectedBeerFavId;
      }
    });
  };

  const handleClick = () => {
    if (favStatus) {
      fetch(`http://localhost:3000/favorites/${selectedBeerFavId}`, {
        method: "DELETE"
      });

      dispatch({
        type: "USER_FAVORITES",
        favorites: favorites.filter(
          favorite => favorite.id !== props.selectedBeer.id
        )
      });
    } else {
      fetch(`http://localhost:3000/user_favorites`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          beer_id: props.selectedBeer.id,
          user_id: currentUser.id
        })
      });

      dispatch({
        type: "UPDATE_USER_FAVORITES",
        new_favorite: props.selectedBeer
      });

      if (currentUser) {
        fetch(`http://localhost:3000/user_favorite_ids/${currentUser.id}`)
          .then(res => res.json())
          .then(data =>
            dispatch({ type: "USER_FAVORITE_IDS", favoriteIds: data })
          );
      }
      findFavoriteId(props.selectedBeer.id);
    }
  };

  findFavoriteId(props.selectedBeer.id);

  return (
    <div style={props.style} onClick={() => handleClick()}>
      {changeHeartStyle()}
    </div>
  );
}
