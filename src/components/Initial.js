import React from "react";
import formatNumber from "../utils/formatNumber";

export default function Initial(props) {
  // Set background-size property for the filled part of the slider
  const initialBgSize = {
    backgroundSize: `${
      ((props.initial - props.minInitial) * 100) /
      (props.maxInitial - props.minInitial)
    }% 100%`,
  };
  return (
    <div className={`field second-field ${props.fetching ? "disabled" : ""}`}>
      <label htmlFor="initial">Первоначальный взнос</label>
      <div>
        <div className="input-container">
          <h2 className="rubles initial-rubles">{`${formatNumber(
            props.initialRubles
          )} ₽`}</h2>
          <div className="percentage-bg">
            <div className="percentage-container">
              <h2 className="input-heading">
                <input
                  type="text"
                  id="initial"
                  name="initial"
                  value={formatNumber(props.initial)}
                  min={props.minInitial}
                  max={props.maxInitial}
                  onChange={props.updateInput}
                  onBlur={props.handleBlur}
                ></input>
                <span className="percentage">%</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <input
        type="range"
        name="initial"
        value={props.initial}
        min={props.minInitial}
        max={props.maxInitial}
        style={initialBgSize}
        className="initial-range"
        onChange={props.updateInput}
      ></input>
    </div>
  );
}
