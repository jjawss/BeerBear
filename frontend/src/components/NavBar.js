import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import "../App.css";
import { Menu } from "semantic-ui-react";
import vectorstock_24045561 from "../vectorstock_24045561 crop.png";
import daddy_bear from "../daddy_bear.png";

export function NavBar(props) {
  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.user);
  let history = useHistory();

  let handleLogout = () => {
    if (currentUser) {
      fetch(`http://localhost:3000/logout`, {
        credentials: "include"
      });
    }
    dispatch({ type: "USER_LOGOUT", user: null });
  };

  return (
    <div>
      <Menu color="yellow" inverted borderless>
        <Menu.Item style={{ height: "55px" }}>
          <img src={daddy_bear} />
        </Menu.Item>
        <Link to={"/beerbear"}>
          <Menu.Item
            style={{ height: "55px" }}
            name="Home"
            onClick={e => console.log(e.target.value)}
          >
            Home
          </Menu.Item>
        </Link>
        {/* <Link to={"/beerlist"}> */}
        <Menu.Item
          style={{ height: "55px" }}
          name="Beers"
          onClick={() => {
            if (
              window.location.pathname !== "/beerlist" &&
              currentUser !== null
            ) {
              dispatch({ type: "GET_BEER_DATA" });
              history.push("/beerlist");
            } else {
              history.push("/login");
            }
          }}
        >
          Beers
        </Menu.Item>
        {/* </Link> */}
        {/* <Link to={"/profile"}> */}
        <Menu.Item
          style={{ height: "55px" }}
          name="Profile"
          onClick={e =>
            currentUser == null
              ? history.push("/login")
              : history.push("/profile")
          }
        >
          Favorites
        </Menu.Item>
        {/* </Link> */}
        <Link to={"/login"}>
          <Menu.Item
            style={{ height: "55px" }}
            name="Login"
            onClick={e => console.log(e.target.value)}
          >
            Login
          </Menu.Item>
        </Link>
        <Link to={"/beerbear"}>
          <Menu.Item style={{ height: "55px" }} onClick={() => handleLogout()}>
            Logout
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  );
}
// export default withRouter(NavBar);
