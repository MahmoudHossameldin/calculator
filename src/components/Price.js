import React from "react";
import formatNumber from "../utils/formatNumber";

export default function Price(props) {
  // Set background-size property for the filled part of the price slider
  const priceBgSize = {
    backgroundSize: `${
      ((props.price - props.minPrice) * 100) / (props.maxPrice - props.minPrice)
    }% 100%`,
  };
  return (
    <div className={`field first-field ${props.fetching ? "disabled" : ""}`}>
      <label htmlFor="price">Стоимость автомобиля</label>
      <div>
        <div className="input-container">
          <h2 className="input-heading">
            <input
              type="text"
              id="price"
              name="price"
              value={formatNumber(props.price)}
              min={props.minPrice}
              max={props.maxPrice}
              onChange={props.updateInput}
              onBlur={props.handleBlur}
            ></input>
          </h2>
          <h2 className="rubles price-rubles">₽</h2>
        </div>
      </div>
      <input
        type="range"
        name="price"
        value={props.price}
        min={props.minPrice}
        max={props.maxPrice}
        className="price-range"
        style={priceBgSize}
        onChange={props.updateInput}
      ></input>
    </div>
  );
}
