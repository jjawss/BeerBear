import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Grid, Header, Item, Icon } from "semantic-ui-react";
import { NavBar } from "./NavBar";
import { ReviewForm } from "./ReviewForm";
import { Reviews } from "./Reviews";
import { FavButton } from "./FavButton";

export function BeerProfile(props) {
  let dispatch = useDispatch();
  // console.log(props.match.params.id);
  const beerId = props.match.params.id;
  useEffect(() => {
    fetch(`http://localhost:3000/beer/${beerId}`)
      .then(res => res.json())
      .then(beer => dispatch({ type: "GET_A_BEER", payload: beer }));
  }, []);

  let selectedBeer = useSelector(state => state.selectedBeer);

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
    <div style={{ class: "mainbackground" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItem: "center",
          textAlign: "center",
          paddingLeft: "25%"
        }}
      >
        <Item>
          <Grid>
            <Grid.Column width={3} style={{ borderStyle: "hidden" }}>
              <Item.Image
                // style={{ width: "200px", borderStyle: "none" }}
                size="medium"
                src={selectedBeer.image}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Grid.Row>
                <h1 style={{ float: "left", marginTop: "77%" }}>
                  {selectedBeer.name}
                </h1>
              </Grid.Row>
              <Grid.Row>
                <h4 style={{ float: "left" }}>{selectedBeer.style}</h4>
              </Grid.Row>
              <FavButton
                selectedBeer={selectedBeer}
                style={{ position: "absolute", right: "2px", bottom: "45px" }}
              />
            </Grid.Column>
            <Grid.Column divided width={3}>
              <h1
                style={{
                  position: "absolute",
                  marginTop: "115px",
                  marginLeft: "16%"
                }}
              >
                SCORE
              </h1>
              <div
                style={{
                  borderLeftStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                  height: "60%",
                  marginTop: "100px",
                  marginLeft: "10%"
                }}
              >
                <h1
                  style={{
                    fontSize: "50px",
                    position: "absolute",
                    right: "41%",
                    marginTop: "50px",
                    height: "20%"
                  }}
                >
                  {selectedBeer.average_score}
                  <div style={{ fontSize: "16px", marginBottom: "50%" }}>
                    {starScore(selectedBeer.average_score)}
                  </div>
                </h1>
              </div>
              <div></div>
            </Grid.Column>
            <Grid.Row>
              <Grid.Column width={9}>
                <Grid.Row>{selectedBeer.description}</Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item>
        <div style={{ marginTop: "7%", marginLeft: "5%" }}>
          <ReviewForm />
          <Reviews beerId={beerId} />
        </div>
      </div>
    </div>
  );
}
