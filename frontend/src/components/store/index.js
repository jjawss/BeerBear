import { createStore } from "redux";
import { useDispatch } from "react-redux";
import { FeedContent } from "semantic-ui-react";
import "../../css/splash.css";

const appReducer = (currentState, action) => {
  switch (action.type) {
    case "GET_BEER_DATA":
      fetch("http://localhost:3000/data")
        .then(res => res.json())
        .then(data =>
          store.dispatch({ type: "RECEIVED_BEER_DATA", payload: data })
        );
      return currentState;
      break;
    case "RECEIVED_BEER_DATA":
      return {
        ...currentState,
        beers: action.payload,
        searchResults: action.payload
      };
      break;
    case "GET_LOGGED_IN_USER":
      fetch("http://localhost:3000/profile", {
        credentials: "include"
      })
        .then(res => res.json())
        .then(profile => {
          if (!profile.error) {
            //need to get the logged in user from the backend to reflect in the front end in state
            // console.log(profile);
            store.dispatch({ type: "CURRENT_USER", payload: profile });
          }
          return currentState;
        });
      break;
    case "SEARCH_BEERS":
      return {
        ...currentState,
        beers: currentState.searchResults.filter(beer =>
          beer.name.toLowerCase().includes(action.input.toLowerCase())
        )
      };
      break;
    case "LOGIN":
      // need username => action.username
      // need password => action.password
      fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: action.username,
          password: action.password
        })
      })
        .then(res => res.json())
        .then(user => store.dispatch({ type: "CURRENT_USER", payload: user }));
      return currentState;
      break;
    case "SIGN_UP":
      FeedContent("http://localhost:3000/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: action.username,
          password: action.password
        })
      });
      break;
    case "CURRENT_USER":
      return {
        ...currentState,
        user: action.payload
      };
      break;
    case "USER_LOGOUT":
      return {
        ...currentState,
        user: action.user
      };
    //THE WAY IT DEFINITELY WORKED, LOADING BEER DATA
    // case "GET_A_BEER":
    //   return {
    //     ...currentState,
    //     selectedBeer: action.payload
    //   };
    case "GET_A_BEER":
      return {
        ...currentState,
        selectedBeer: action.payload
      };
      break;
    case "GET_REVIEWS_BY_BEER":
      return {
        ...currentState,
        reviews_by_beer: action.payload
      };
      break;
    case "UPDATE_REVIEWS":
      return {
        ...currentState,
        reviews_by_beer: [...currentState.reviews_by_beer, action.payload]
      };
      break;
    case "CURRENT_USER":
      return {
        ...currentState,
        user: action.payload
      };
      //
      break;
    case "REVIEW_BEER_STATE_CHANGE":
      return {
        ...currentState,
        review_content: action.review_content,
        review_beer_id: action.beer_id,
        review_user_id: action.user_id
      };
      break;
    case "REVIEW_SCORE":
      return {
        ...currentState,
        review_score: action.review_score
      };
      break;
    case "USER_FAVORITES":
      return {
        ...currentState,
        favorites: action.favorites
      };
      break;
    case "UPDATE_USER_FAVORITES":
      return {
        ...currentState,
        favorites: [...currentState.favorites, action.new_favorite]
      };
      break;
    case "HEART_BUTTON_STATUS":
      return {
        ...currentState,
        favStatus: action.favStatus
      };
      break;
    case "USER_FAVORITE_IDS":
      return {
        ...currentState,
        favoriteIds: action.favoriteIds
      };
      break;
    case "TOGGLE_MODAL":
      return {
        ...currentState,
        modal: action.payload
      };
  }
  return currentState;
};

const initialState = {
  beers: [],
  user: null,
  selectedPage: "",
  searchResults: "",
  selectedBeer: "",
  reviews_by_beer: [],
  review_content: "",
  review_score: "",
  review_beer_id: "",
  review_user_id: "",
  favorites: [],
  favStatus: false,
  favoriteIds: [],
  modal: false
};

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
