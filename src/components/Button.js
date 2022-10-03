import React from "react";

export default function button(props) {
  const printBtnText = () => {
    if (props.fetching || props.contractSumClicked) return "";
    return "Оставить заявку";
  };

  return (
    <button
      type="submit"
      form="form"
      value="Submit"
      className={`${props.fetching ? "loading" : ""} ${
        props.contractSumClicked ? "loading" : ""
      } ${props.monthPayClicked ? "disabled" : ""}`}
      disabled={props.fetching}
    >
      <h2
        className={`${props.fetching ? "loader" : ""} ${
          props.contractSumClicked ? "loader" : ""
        }`}
      >
        {printBtnText()}
      </h2>
    </button>
  );
}
