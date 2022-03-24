import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CardDetailsContext } from "./App";

export default function Card({ id, CHName, CNumber, month, year }) {
  const { handleDeleteCard, handleSelectedCard } =
    useContext(CardDetailsContext);
  return (
    <>
      <div className="maincard">
        <div className="cardrow">
          <p>{CHName}</p>
          <button className="deleteBtn" onClick={() => handleDeleteCard(id)}>
            Delete Card
          </button>
        </div>
        <div className="cardrow">
          <p>{CNumber}</p>
          <p />
          <span className="cardrow">
            <p>{month}</p>
            <span>/</span>
            <p>{year}</p>
          </span>
          <Link to={"/editCard"}>
            <button className="editBtn" onClick={() => handleSelectedCard(id)}>
              Edit Card
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
