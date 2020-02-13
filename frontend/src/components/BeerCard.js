import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Item, Segment } from "semantic-ui-react";

export function BeerCard(props) {
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
  const beerScore = score => {
    if (score === 0) {
    }
  };

  return (
    <Segment raised style={{ margin: "40px" }}>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={props.beer.image} />
          <Item.Content>
            <Link to={`/beer/${props.beer.id}`}>
              <Item.Header as="a" style={{ fontSize: "35px" }}>
                {props.beer.name}
              </Item.Header>
            </Link>
            <Item.Description style={{ width: "97%" }}>
              {props.beer.description}
            </Item.Description>
          </Item.Content>
          <Item.Header>
            <Item.Header
              floated="right"
              style={{ fontSize: "25px", marginRight: "0%" }}
            >
              AVG SCORE
            </Item.Header>
            <Item.Header
              floated="right"
              style={{ fontSize: "29px", padding: "10%", marginRight: "10%" }}
            >
              {props.beer.average_score}
            </Item.Header>
            <Item.Extra floated="right">
              {starScore(props.beer.average_score)}
            </Item.Extra>
          </Item.Header>
        </Item>
      </Item.Group>
    </Segment>
  );
}
