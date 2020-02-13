import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";

export function FavButton(props) {
  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.user);
  let favorites = useSelector(state => state.favorites);
  let favStatus = useSelector(state => state.favStatus);
  let favoriteIds = useSelector(state => state.favoriteIds);

  let selectedBeerFavId = "";

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/user_favorites/${currentUser.id}`)
        .then(res => res.json())
        .then(data => dispatch({ type: "USER_FAVORITES", favorites: data }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/user_favorite_ids/${currentUser.id}`)
        .then(res => res.json())
        .then(data =>
          dispatch({ type: "USER_FAVORITE_IDS", favoriteIds: data })
        );
    }
  }, [currentUser]);

  useEffect(() => {
    changeFavoriteStatus(props.selectedBeer, favorites);
  }, []);

  console.log(favoriteIds);

  const changeFavoriteStatus = (currentBeer, favorites) =>
    favorites.forEach(favorite => {
      if (favorite.id === currentBeer.id) {
        return dispatch({
          type: "HEART_BUTTON_STATUS",
          favStatus: true
        });
      } else {
        return dispatch({
          type: "HEART_BUTTON_STATUS",
          favStatus: false
        });
      }
    });

  const changeHeartStyle = () => {
    if (favStatus) {
      return <Icon name="heart" />;
    } else {
      return <Icon name="heart outline" />;
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
      fetch(`http://localhost:3000/user_favorites/${currentUser.id}`)
        .then(res => res.json())
        .then(data => dispatch({ type: "USER_FAVORITES", favorites: data }));
      // changeFavoriteStatus(props.selectedBeer);
      dispatch({
        type: "HEART_BUTTON_STATUS",
        favStatus: false
      });
      changeHeartStyle();
      console.log("HEART STATUS--HANDLECLICK--favStatus TRUE ");
    } else {
      fetch(`http://localhost:3000/user_favorites/${currentUser.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          beer_id: props.selectedBeer.id,
          user_id: currentUser.id
        })
      })
        .then(res => res.json())
        .then(
          res => console.log(res),
          dispatch({ type: "UPDATE_USER_FAVORITES", favorites: res })
        );

      if (currentUser) {
        fetch(`http://localhost:3000/user_favorite_ids/${currentUser.id}`)
          .then(res => res.json())
          .then(data =>
            dispatch({ type: "USER_FAVORITE_IDS", favoriteIds: data })
          );
      }
      // changeFavoriteStatus(props.selectedBeer);
      dispatch({
        type: "HEART_BUTTON_STATUS",
        favStatus: true
      });
      findFavoriteId(props.selectedBeer.id);
      console.log("findFavoriteId");
      changeHeartStyle();
      console.log("HEART STATUS--HANDLECLICK--favStatus FALSE ");
    }
  };

  // console.log(props.selectedBeer);
  // console.log(changeFavoriteStatus(props.selectedBeer));
  // console.log([] ? "true" : "false");

  findFavoriteId(props.selectedBeer.id);
  // console.log("findFavoriteId RAN");
  // console.log(selectedBeerFavId);

  //send post or delete request based on current favorite status
  return (
    <div onClick={() => handleClick()}>
      {/* <Icon name="heart" />;
      <Icon name="heart outline" />; */}
      {changeHeartStyle()}
    </div>
  );
}
