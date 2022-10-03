import React from "react";
import formatNumber from "../utils/formatNumber";

export default function Months(props) {
  // Set background-size property for the filled part of the months slider
  const monthsBgSize = {
    backgroundSize: `${
      ((props.months - props.minMonths) * 100) /
      (props.maxMonths - props.minMonths)
    }% 100%`,
  };
  return (
    <div className={`field third-field ${props.fetching ? "disabled" : ""}`}>
      <label htmlFor="months">Срок лизинга</label>
      <div>
        <div className="input-container">
          <h2 className="input-heading">
            <input
              type="text"
              id="months"
              name="months"
              value={formatNumber(props.months)}
              min={props.minMonths}
              max={props.maxMonths}
              onChange={props.updateInput}
              onBlur={props.handleBlur}
            ></input>
          </h2>
          <h2 className="months">мес.</h2>
        </div>
      </div>
      <input
        type="range"
        name="months"
        value={props.months}
        min={props.minMonths}
        max={props.maxMonths}
        style={monthsBgSize}
        className="months-range"
        onChange={props.updateInput}
      ></input>
    </div>
  );
}
