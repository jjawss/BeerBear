import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Menu } from "semantic-ui-react";
import { BeerList } from "./components/BeerList.js";
import { Route } from "react-router";
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { BeerProfile } from "./components/BeerProfile";
import { Home } from "./components/Home";
import "semantic-ui-css/semantic.min.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_BEER_DATA" });
    dispatch({ type: "GET_LOGGED_IN_USER" });
  }, []);
  let currentUser = useSelector(state => state.user);
  let beer = useSelector(state => state.beer);

  return (
    <div className="App">
      <Router>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/beerbear"} component={Home} />
        <Route exact path={"/beerlist"} component={BeerList} />
        <Route exact path={"/beer/:id"} component={BeerProfile} />
      </Router>
    </div>
  );
}

export default App;
