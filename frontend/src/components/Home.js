import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { NavBar } from "./NavBar";

export function Home(props) {
  return (
    <div className="cover-page-content">
      <div>
        <NavBar />
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            top: "200",
            marginLeft: "25%"
          }}
        >
          <h1
            style={{
              fontSize: "200px",
              fontFamily: "kalam",
              color: "white",
              marginTop: "0%"
            }}
          >
            BEER BEAR
          </h1>
          <h2
            style={{
              marginTop: "44%",
              fontSize: "50px",
              color: "brown",
              height: "30%",
              fontFamily: "kalam",
              color: "white"
            }}
          >
            Discover-Rate-Remember
          </h2>
          <Link to={"/login"}>
            <Button color="yellow" size="massive" style={{ floated: "right" }}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
