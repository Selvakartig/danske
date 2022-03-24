import React, { useContext, useState } from "react";
import Form from "react-jsonschema-form";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { CardDetailsContext } from "./App";

export default function SchemaAddCard() {
  const { handleAddCard } = useContext(CardDetailsContext);
  const [newCardDetail, setNewCardDetail] = useState();
  let navigate = useNavigate();

  function handleChange(newData) {
    setNewCardDetail(newData);
  }

  function submitCreditCardDetails() {
    handleAddCard(newCardDetail);
    navigate("/");
  }

  const schema = {
    type: "object",
    required: ["CNumber", "month", "year", "CHName", "CVV"],
    properties: {
      CNumber: {
        type: "number",
        title: "Card Number",
      },
      month: {
        title: "Month",
        type: "string",
      },
      year: {
        title: "Year",
        type: "string",
      },
      CHName: {
        title: "Cardholder Name",
        type: "string",
      },
      CVV: {
        title: "Security Code CVV",
        type: "number",
      },
    },
  };

  const uiSchema = {
    CNumber: { classNames: "row" },
    month: { classNames: "row" },
    year: { classNames: "row" },
    CHName: { classNames: "row" },
    CVV: { classNames: "row" },
  };

  const formData = {
    CNumber: newCardDetail ? newCardDetail.CNumber : "",
    month: newCardDetail ? newCardDetail.month : "",
    year: newCardDetail ? newCardDetail.year : "",
    CHName: newCardDetail ? newCardDetail.CHName : "",
    CVV: newCardDetail ? newCardDetail.CVV : "",
  };

  return (
    <div className="editForm">
      <div style={{ textAlign: "center" }}>
        <Typography varient="h1">Credit Card</Typography>
      </div>
      <div className="bDiv">
        <Link to={"/"}>
          <button className="backBtn">Back</button>
        </Link>
      </div>
      <div className="previewAndForm">
        <div className="editPreview">
          <div className="editRow">
            <h3>{newCardDetail ? newCardDetail.CNumber : ""}</h3>
          </div>
          <div className="editRow">
            <div className="row">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <p>{newCardDetail ? newCardDetail.CHName : ""}</p>
            </div>
            <div className="validThruv row">
              <label>Valid Thruv</label>
              <span className="validthruv">
                <p>{newCardDetail ? newCardDetail.month : ""}</p>
                <span>/</span>
                <p>{newCardDetail ? newCardDetail.year : ""}</p>
              </span>
            </div>
          </div>
        </div>
        <Form
          className="rjsForm"
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={(e) => handleChange(e.formData)}
          children={true}
          // liveValidate
        />
        <button type="submit" onClick={submitCreditCardDetails}>
          Save Credit Card
        </button>
      </div>
    </div>
  );
}
