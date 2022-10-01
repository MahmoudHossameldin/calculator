import { useState } from "react";
import "./App.css";
import "./fonts/Gilroy/Gilroy-Regular.ttf";
import "./fonts/Nekst/Nekst-Black.ttf";

function App() {
  // Стоимость автомобиля
  const defaultPrice = 3300000;
  const [price, setPrice] = useState(defaultPrice);
  // Первоначальный взнос
  const defaultInitial = 10;
  const [initial, setInitial] = useState(defaultInitial);
  // Срок лизинга || Срок кредита в месяцах
  const defaultMonths = 60;
  const [months, setMonths] = useState(defaultMonths);

  const [fetching, setFetching] = useState(false);

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

  const updateInput = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value.replace(/\s/g, ""));
    const min = e.target.min;
    const max = e.target.max;

    if (name === "price") setPrice(value);
    if (name === "initial") setInitial(value);
    if (name === "months") setMonths(value);

    e.target.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";
  };

  const minPrice = 1000000;
  const maxPrice = 6000000;
  const minInitial = 10;
  const maxInitial = 60;
  const minMonths = 1;
  const maxMonths = 60;

  const handleBlur = (e) => {
    const name = e.target.name;
    let value = Number(e.target.value.replace(/\s/g, ""));
    const min = e.target.min;
    const max = e.target.max;
    console.log(min, max);
    if (name === "price") {
      if (value < min) value = minPrice;
      if (value > max) value = maxPrice;
      setPrice(value);
    }
    if (name === "initial") {
      if (value < min) value = minInitial;
      if (value > max) value = maxInitial;
      setInitial(value);
    }
    if (name === "months") {
      if (value < min) value = minMonths;
      if (value > max) value = maxMonths;
      setMonths(value);
    }
  };

  const priceBgSize = {
    backgroundSize: `${
      ((price - minPrice) * 100) / (maxPrice - minPrice)
    }% 100%`,
  };
  const initialBgSize = {
    backgroundSize: `${
      ((initial - minInitial) * 100) / (maxInitial - minInitial)
    }% 100%`,
  };
  const monthsBgSize = {
    backgroundSize: `${
      ((months - minMonths) * 100) / (maxMonths - minMonths)
    }% 100%`,
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
      }
    } catch (err) {
      console.log("CAUGHT ERROR: ", err);
    }
  };

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-heading">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="calculator">
          <form onSubmit={handleSubmit} id="form">
            <div className="input-fields">
              {/* FIRST FIELD */}
              <div
                className={`field first-field ${fetching ? "disabled" : ""}`}
              >
                <label htmlFor="price">Стоимость автомобиля</label>
                <div>
                  <div className="input-container">
                    <h2 className="input-heading">
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formatNumber(price)}
                        min={minPrice}
                        max={maxPrice}
                        onChange={updateInput}
                        onBlur={handleBlur}
                      ></input>
                    </h2>
                    <h2 className="rubles price-rubles">₽</h2>
                  </div>
                </div>
                <input
                  type="range"
                  name="price"
                  value={price}
                  min={minPrice}
                  max={maxPrice}
                  className="price-range"
                  style={priceBgSize}
                  onChange={updateInput}
                ></input>
              </div>
              {/* SECOND FIELD */}
              <div
                className={`field second-field ${fetching ? "disabled" : ""}`}
              >
                <label htmlFor="initial">Первоначальный взнос</label>
                <div>
                  <div className="input-container">
                    <h2 className="rubles initial-rubles">{`${formatNumber(
                      initialRubles
                    )} ₽`}</h2>
                    <div className="percentage-bg">
                      <div className="percentage-container">
                        <h2 className="input-heading">
                          <input
                            type="text"
                            id="initial"
                            name="initial"
                            value={formatNumber(initial)}
                            min={minInitial}
                            max={maxInitial}
                            onChange={updateInput}
                            onBlur={handleBlur}
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
                  value={initial}
                  min={minInitial}
                  max={maxInitial}
                  style={initialBgSize}
                  className="initial-range"
                  onChange={updateInput}
                ></input>
              </div>
              {/* END SECOND FIELD */}
              {/* THIRD Field */}
              <div
                className={`field third-field ${fetching ? "disabled" : ""}`}
              >
                <label htmlFor="months">Срок лизинга</label>
                <div>
                  <div className="input-container">
                    <h2 className="input-heading">
                      <input
                        type="text"
                        id="months"
                        name="months"
                        value={formatNumber(months)}
                        min={minMonths}
                        max={maxMonths}
                        onChange={updateInput}
                        onBlur={handleBlur}
                      ></input>
                    </h2>
                    <h2 className="months">мес.</h2>
                  </div>
                </div>
                <input
                  type="range"
                  name="months"
                  value={months}
                  min={minMonths}
                  max={maxMonths}
                  style={monthsBgSize}
                  className="months-range"
                  onChange={updateInput}
                ></input>
              </div>
              {/* END THIRD FIELD */}
            </div>
            <div className="form-footer">
              <div className="metadata">
                <div className={`contract-sum ${fetching ? "disabled" : ""}`}>
                  <p>Сумма договора лизинга</p>
                  <h2 className="value">{`${formatNumber(contractSum)} ₽`}</h2>
                </div>
                <div className={`month-pay  ${fetching ? "disabled" : ""}`}>
                  <p>Ежемесячный платеж от</p>
                  <h2 className="value">{`${formatNumber(monthPay)} ₽`}</h2>
                </div>
              </div>
              <button type="submit" form="form" value="Submit">
                <h2 className={`${fetching ? "loader" : ""}`}>{`${
                  fetching ? "" : "Оставить заявку"
                }`}</h2>
              </button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
