import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BeerCard } from "./BeerCard";
import { NavBar } from "./NavBar";
import { Search } from "./Search";

export function BeerList(props) {
  let beer = useSelector(state => state.beers);
  return (
    <div>
      <NavBar />
      <Search />
      {beer.map(beer => {
        return (
          <div>
            <BeerCard beer={beer} />
          </div>
        );
      })}
    </div>
  );
}
