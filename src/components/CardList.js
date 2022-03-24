import React, { useContext } from "react";
import Card from "./Card";
import { CardDetailsContext } from "./App";

export default function CardList() {
  const { cardDetails } = useContext(CardDetailsContext);

  if (cardDetails.length === 0) {
    return (
      <h2 style={{ textAlign: "center" }} className="noCard">
        No Cards to Display!
      </h2>
    );
  }

  return (
    <>
      {cardDetails.map((detail) => {
        return <Card key={detail.id} {...detail} />;
      })}
    </>
  );
}
