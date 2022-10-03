import { useState } from "react";
import "./App.css";
import "./fonts/Gilroy/Gilroy-Regular.ttf";
import "./fonts/Nekst/Nekst-Black.ttf";
import formatNumber from "./utils/formatNumber";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Price from "./components/Price";
import Initial from "./components/Initial";
import Months from "./components/Months";
import Metadata from "./components/Metadata";

function App() {
  // Initiate all states and set default values

  // Стоимость автомобиля
  const defaultPrice = 3300000;
  const [price, setPrice] = useState(defaultPrice);
  // Первоначальный взнос
  const defaultInitial = 10;
  const [initial, setInitial] = useState(defaultInitial);
  // Срок лизинга || Срок кредита в месяцах
  const defaultMonths = 60;
  const [months, setMonths] = useState(defaultMonths);

  // Check if POST request is being proccessed
  const [fetching, setFetching] = useState(false);
  // Check if metadata are clicked so as to change button style
  const [contractSumClicked, setContractSumClicked] = useState(false);
  const [monthPayClicked, setMonthPayClicked] = useState(false);

  // Первоначальный взнос в рублях
  const initialRubles = Math.round((initial / 100) * price);
  // Ежемесячный платеж
  const monthPay = Math.round(
    (price - initial) *
      ((0.035 * Math.pow(1 + 0.035, months)) /
        (Math.pow(1 + 0.035, months) - 1))
  );
  // Сумма договора лизинга
  const contractSum = initial * months * monthPay;

  //Get min and max values
  const minPrice = 1000000;
  const maxPrice = 6000000;
  const minInitial = 10;
  const maxInitial = 60;
  const minMonths = 1;
  const maxMonths = 60;

  // пересчитывать все числа
  const updateInput = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value.replace(/\s/g, ""));
    const min = e.target.min;
    const max = e.target.max;

    if (name === "price") setPrice(value);
    if (name === "initial") setInitial(value);
    if (name === "months") setMonths(value);

    // Update background-size property for the filled part of the slider
    e.target.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";
  };

  // ограничивать пользователя в выборе данных, при вводе некорректного значения с клавиатуры, сбрасываться к ближайшему корректному числу (максимуму или минимуму)
  const handleBlur = (e) => {
    const name = e.target.name;
    let value = Number(e.target.value.replace(/\s/g, ""));
    const min = e.target.min;
    const max = e.target.max;

    if (value < min) {
      if (name === "price") setPrice(minPrice);
      if (name === "initial") setPrice(minInitial);
      if (name === "months") setPrice(minMonths);
    }
    if (value > max) {
      if (name === "price") setPrice(maxPrice);
      if (name === "initial") setPrice(maxInitial);
      if (name === "months") setPrice(maxMonths);
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    try {
      let res = await fetch("https://eoj3r7f3r4ef6v4.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          СтоимостьАвтомобиля: price,
          ПервоначальныйВзнос: initial,
          ПервоначальныйВзносВРублях: initialRubles,
          СрокЛизинга: months,
          СуммаДоговораЛизинга: contractSum,
          ЕжемесячныйПлатеж: monthPay,
        }),
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        console.log("fetch success");
        setFetching(false);
        setPrice(defaultPrice);
        setInitial(defaultInitial);
        setMonths(defaultMonths);
      } else {
        console.log("Error sending data!!!");
        setFetching(false);
      }
    } catch (err) {
      console.log("CAUGHT ERROR: ", err);
      setFetching(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Heading />
        <div className="calculator">
          <form onSubmit={handleSubmit} id="form">
            <div className="input-fields">
              {/* FIRST FIELD */}
              <Price
                price={price}
                minPrice={minPrice}
                maxPrice={maxPrice}
                fetching={fetching}
                updateInput={updateInput}
                handleBlur={handleBlur}
              />
              {/* END FIRST FIELD */}
              {/* SECOND FIELD */}
              <Initial
                initial={initial}
                minInitial={minInitial}
                maxInitial={maxInitial}
                fetching={fetching}
                initialRubles={initialRubles}
                updateInput={updateInput}
                handleBlur={handleBlur}
              />
              {/* END SECOND FIELD */}
              {/* THIRD Field */}
              <Months
                months={months}
                minMonths={minMonths}
                maxMonths={maxMonths}
                fetching={fetching}
                updateInput={updateInput}
                handleBlur={handleBlur}
              />
              {/* END THIRD FIELD */}
            </div>
            <div className="form-footer">
              <Metadata
                monthPayClicked={monthPayClicked}
                contractSumClicked={contractSumClicked}
                setMonthPayClicked={setMonthPayClicked}
                setContractSumClicked={setContractSumClicked}
                fetching={fetching}
                contractSum={contractSum}
                monthPay={monthPay}
              />
              <Button
                fetching={fetching}
                contractSumClicked={contractSumClicked}
                monthPayClicked={monthPayClicked}
              />
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
