import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "semantic-ui-react";

//change state of the beers displayed on screen so they only include the beers that are searched. Might be easiest to do this with a local state because then I don't change the over arching beer list... is the beer list beeing accessed anywhere else? If i went back to a previous page would it rerender a fresh list of beers or would it only show the filtered list of beers...?

// in order to access the search bar I need to create the input
// Then I need to

export function Search() {
  let beers = useSelector(state => state.beers);
  let dispatch = useDispatch();

  let searchBeers = event =>
    beers.filter(beer => {
      return beer.name.includes(event.target.value);
    });

  return (
    <div>
      <Input
        style={{ width: "100%", height: "100px", fontSize: "75px" }}
        type="text"
        placeholder="Search..."
        onChange={e => {
          let input = e.target.value;
          dispatch({ type: "SEARCH_BEERS", input: input });
        }}
      />
    </div>
  );
}
