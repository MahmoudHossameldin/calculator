import React from "react";
import formatNumber from "../utils/formatNumber";

export default function Metadata(props) {
  const changeBtnStyle = (name) => {
    if (name === "sum" && props.monthPayClicked === false)
      props.setContractSumClicked(true);
    if (name === "mpay" && props.contractSumClicked === false)
      props.setMonthPayClicked(true);

    setTimeout(() => {
      props.setContractSumClicked(false);
      props.setMonthPayClicked(false);
    }, 1500);
  };
  return (
    <div className="metadata">
      <div
        className={`contract-sum ${props.fetching ? "disabled" : ""}`}
        onClick={() => changeBtnStyle("sum")}
      >
        <p>Сумма договора лизинга</p>
        <h2 className="value">{`${
          Number.isFinite(props.contractSum)
            ? formatNumber(props.contractSum)
            : "Пожалуйста, добавьте правильный срок"
        } ₽`}</h2>
      </div>
      <div
        className={`month-pay  ${props.fetching ? "disabled" : ""}`}
        onClick={() => changeBtnStyle("mpay")}
      >
        <p>Ежемесячный платеж от</p>
        <h2 className="value">{`${
          Number.isFinite(props.monthPay)
            ? formatNumber(props.monthPay)
            : "Пожалуйста, добавьте правильный срок"
        } ₽`}</h2>
      </div>
    </div>
  );
}
