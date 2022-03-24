import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddCard from "./AddCard";
import CardEdit from "./CardEdit";
import { v4 as uuidv4 } from "uuid";
import SchemaAddCard from "./SchemaAddCard";
import SchemaCardEdit from "./SchemaCardEdit";
import "../css/app.css";

export const CardDetailsContext = createContext();
const LOCAL_KEY = "CreditCardDetails";

function App() {
  const [cardDetails, setCardDetails] = useState(SampleDate);
  const [selectedCardId, setSelectedCardId] = useState();
  const selectedCard = cardDetails.find((card) => card.id === selectedCardId);

  useEffect(() => {
    const savedDetails = localStorage.getItem(LOCAL_KEY);
    if (savedDetails != null) setCardDetails(JSON.parse(savedDetails));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cardDetails));
  }, [cardDetails]);

  const cardDetailsContextValue = {
    handleAddCard,
    handleDeleteCard,
    handleSelectedCard,
    handleCardEdit,
    selectedCard,
    cardDetails,
    setCardDetails,
  };

  function handleAddCard(detail) {
    let newDetails = [...cardDetails];
    detail.id = uuidv4();
    newDetails.push(detail);
    setCardDetails(newDetails);
  }

  function handleDeleteCard(id) {
    setCardDetails(cardDetails.filter((card) => card.id !== id));
  }

  function handleSelectedCard(id) {
    setSelectedCardId(id);
  }

  function handleCardEdit(id, modifiedDetail) {
    const newCardDetails = [...cardDetails];
    const index = newCardDetails.findIndex((card) => card.id === id);
    newCardDetails[index] = modifiedDetail;
    setCardDetails(newCardDetails);
  }

  return (
    <CardDetailsContext.Provider value={cardDetailsContextValue}>
      <Routes>
        <Route path="/editCard" element={<CardEdit />} />
        <Route path="/addCard" element={<AddCard />} />
        <Route path="/" element={<Home />} />

        {/* --------------React JSON Schema Form----------------- */}
        {/* <Route path="/editCard" element={<SchemaCardEdit />} /> */}
        {/* <Route path="/addCard" element={<SchemaAddCard />} /> */}
      </Routes>
    </CardDetailsContext.Provider>
  );
}

const SampleDate = [
  {
    id: 1,
    CHName: "Sample User 1",
    CNumber: "1234123412341234",
    month: "03",
    year: "22",
    CVV: 123,
  },
  {
    id: 2,
    CHName: "Sample User 2",
    CNumber: "1234123412341235",
    month: "03",
    year: "22",
    CVV: 456,
  },
  {
    id: 3,
    CHName: "Sample User 3",
    CNumber: "1234123412341236",
    month: "03",
    year: "22",
    CVV: 789,
  },
  {
    id: 4,
    CHName: "Sample User 4",
    CNumber: "1234123412341237",
    month: "03",
    year: "22",
    CVV: 912,
  },
];

export default App;
