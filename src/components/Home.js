import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import CardList from "./CardList";
import { CardDetailsContext } from "./App";

export default function Home() {
  const { handleAddCard } = useContext(CardDetailsContext);
  return (
    <>
      <Typography varient="h1">List of Credit Cards</Typography>
      <p className="addBtn">
        <Link to={"/addCard"}>
          <button>+ Add Credit Card</button>
        </Link>
      </p>
      <CardList />
    </>
  );
}
