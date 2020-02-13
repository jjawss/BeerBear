import React from "react";
import { Dropdown } from "semantic-ui-react";

const ratingOptions = [
  {
    key: "1 star",
    text: "1 star",
    value: 1
  },
  {
    key: "2 stars",
    text: "2 stars",
    value: 2
  },
  {
    key: "3 stars",
    text: "3 stars",
    value: 3
  },
  {
    key: "4 stars",
    text: "4 stars",
    value: 4
  },
  {
    key: "5 stars",
    text: "5 stars",
    value: 5
  }
];

export const DropDownSelection = e => (
  <Dropdown
    placeholder="Rate the Beer"
    fluid
    selection
    options={ratingOptions}
    onChange={e => console.log(e.target.value)}
  />
);
