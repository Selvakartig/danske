import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { CardDetailsContext } from "./App";
import validator from "validator";

export default function CardEdit() {
  const { handleAddCard } = useContext(CardDetailsContext);
  const [error, setError] = useState({});
  const [newCardDetail, setNewCardDetail] = useState({
    id: "",
    CHName: "",
    CNumber: "",
    month: "",
    year: "",
    CVV: "",
  });
  let navigate = useNavigate();

  function handleChange(detail) {
    setNewCardDetail({ ...newCardDetail, ...detail });
    handleError(detail);
  }

  function submitCreditCardDetails() {
    for (var key in error) {
      if (error[key] !== "") {
        return false;
      } else {
        handleAddCard(newCardDetail);
        navigate("/");
      }
    }
  }

  function handleError(errorCheck) {
    if (errorCheck.CNumber) {
      if (errorCheck.CNumber.length === 16) {
        if (validator.isCreditCard(errorCheck.CNumber)) {
          errorCheck.CNumber = "";
          setError({ ...error, ...errorCheck });
        } else {
          errorCheck.CNumber = "Enter valid Credit Card Number!";
          setError({ ...error, ...errorCheck });
        }
      } else {
        errorCheck.CNumber = "Number Should be 16 Digits!";
        setError({ ...error, ...errorCheck });
      }
    } else if (errorCheck.CVV) {
      if (errorCheck.CVV.length < 3) {
        errorCheck.CVV = "CVV Should be 3 digits";
        setError({ ...error, ...errorCheck });
      } else {
        errorCheck.CVV = "";
        setError({ ...error, ...errorCheck });
      }
    } else if (errorCheck.CHName) {
      if (!/^[a-zA-Z]+$/.test(errorCheck.CHName)) {
        errorCheck.CHName = "Enter only Characters";
        setError({ ...error, ...errorCheck });
      } else {
        errorCheck.CHName = "";
        setError({ ...error, ...errorCheck });
      }
    } else if (errorCheck.month) {
      if (!/^[0-9]+$/.test(errorCheck.month)) {
        errorCheck.month = "Only Numbers";
        setError({ ...error, ...errorCheck });
      } else {
        errorCheck.month = "";
        setError({ ...error, ...errorCheck });
      }
    } else if (errorCheck.year) {
      if (!/^[0-9]+$/.test(errorCheck.year)) {
        errorCheck.year = "Only Numbers";
        setError({ ...error, ...errorCheck });
      } else {
        errorCheck.year = "";
        setError({ ...error, ...errorCheck });
      }
    }
  }

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
        <div>
          <div className="editRow">
            <div className="row">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="number"
                name="cardNumber"
                id="cardNumber"
                required={true}
                value={newCardDetail ? newCardDetail.CNumber : ""}
                onChange={(e) =>
                  handleChange(
                    e.target.value.length <= 16
                      ? { CNumber: e.target.value }
                      : false
                  )
                }
              />
              {error.CNumber && (
                <span className="errorMsg">{error.CNumber}</span>
              )}
            </div>
            <div className="row">
              <label>Valid Thruv</label>
              <span className="expiration">
                <input
                  type="string"
                  name="month"
                  placeholder="MM"
                  maxLength={2}
                  size={2}
                  value={newCardDetail ? newCardDetail.month : ""}
                  onChange={(e) => handleChange({ month: e.target.value })}
                />
                <span>/</span>
                <input
                  type="string"
                  name="year"
                  placeholder="YY"
                  maxLength={2}
                  size={2}
                  value={newCardDetail ? newCardDetail.year : ""}
                  onChange={(e) => handleChange({ year: e.target.value })}
                />
              </span>
              {error.month && <span className="errorMsg">{error.month}</span>}
              {error.year && <span className="errorMsg">{error.year}</span>}
            </div>
          </div>
          <div className="editRow">
            <div className="row">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                id="cardholderName"
                value={newCardDetail ? newCardDetail.CHName : ""}
                onChange={(e) => handleChange({ CHName: e.target.value })}
              />
              {error.CHName && <span className="errorMsg">{error.CHName}</span>}
            </div>
            <div className="row">
              <label htmlFor="cvv">Security Code CVV</label>
              <input
                type="number"
                name="cvv"
                id="cvv"
                value={newCardDetail ? newCardDetail.CVV : ""}
                onChange={(e) =>
                  handleChange(
                    e.target.value.length <= 3 ? { CVV: e.target.value } : false
                  )
                }
              />
              {error.CVV && <span className="errorMsg">{error.CVV}</span>}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" onClick={submitCreditCardDetails}>
            Save Credit Card
          </button>
        </div>
      </div>
    </div>
  );
}
