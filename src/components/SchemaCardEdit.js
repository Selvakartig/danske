import React, { useContext, useState } from "react";
import Form from "react-jsonschema-form";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { CardDetailsContext } from "./App";

export default function SchemaCardEdit() {
  const { selectedCard, handleCardEdit } = useContext(CardDetailsContext);
  const [modifiedDetail, setModifiedDetail] = useState();

  let navigate = useNavigate();

  function handleChange(detail) {
    setModifiedDetail({ ...selectedCard, ...detail });
  }
  function handleSubmit() {
    handleCardEdit(selectedCard.id, modifiedDetail);
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
    CNumber: modifiedDetail
      ? parseInt(modifiedDetail.CNumber)
      : parseInt(selectedCard.CNumber),
    month: modifiedDetail ? modifiedDetail.month : selectedCard.month,
    year: modifiedDetail ? modifiedDetail.year : selectedCard.year,
    CHName: modifiedDetail ? modifiedDetail.CHName : selectedCard.CHName,
    CVV: modifiedDetail
      ? parseInt(modifiedDetail.CVV)
      : parseInt(selectedCard.CVV),
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
            <h3>{selectedCard ? selectedCard.CNumber : ""}</h3>
          </div>
          <div className="editRow">
            <div className="row">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <p>{selectedCard ? selectedCard.CHName : ""}</p>
            </div>
            <div className="validThruv row">
              <label>Valid Thruv</label>
              <span className="validthruv">
                <p>{selectedCard ? selectedCard.month : ""}</p>
                <span>/</span>
                <p>{selectedCard ? selectedCard.year : ""}</p>
              </span>
            </div>
          </div>
        </div>
        <Form
          className="rjsForm"
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          onChange={(e) => handleChange(e.formData)}
          children={true}
        />
        <button type="submit" onClick={handleSubmit}>
          Save Credit Card
        </button>
      </div>
    </div>
  );
}
