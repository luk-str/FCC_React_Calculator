import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValues: [],
    };
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleFunctionClick = this.handleFunctionClick.bind(this);
    this.allClear = this.allClear.bind(this);
  }

  allClear() {
    this.setState({ currentValues: [] });
  }

  handleNumberClick(e) {
    let valueArray = this.state.currentValues;
    let clickedValue = e.target.textContent;
    let lastPosition = valueArray[valueArray.length - 1];
    let secondLastPosition = valueArray[valueArray.length - 2];

    if (!isNaN(lastPosition) && lastPosition !== "0") {
      valueArray[valueArray.length - 1] = lastPosition + clickedValue;
    } else if (lastPosition === ".") {
      if (!isNaN(secondLastPosition)) {
        valueArray.length = valueArray.length - 2;
        valueArray.push(`${secondLastPosition}.${clickedValue}`);
      } else {
        valueArray[valueArray.length - 1] = `0.${clickedValue}`;
      }
    } else if (lastPosition !== "0") {
      valueArray.push(clickedValue);
    }

    this.setState({ currentValues: valueArray });

    console.log(this.state.currentValues);
  }

  handleFunctionClick(e) {
    let valueArray = this.state.currentValues;
    let clickedValue = e.target.textContent;
    let lastPosition = valueArray[valueArray.length - 1];
    let isLastPositionNumber = !isNaN(lastPosition);

    if (
      valueArray.length !== 0 &&
      isLastPositionNumber &&
      clickedValue === "="
    ) {
      // WYNIK
      let result = eval(valueArray.join(""));
      valueArray = [result];
    } else if (valueArray.length !== 0 && isLastPositionNumber) {
      valueArray.push(clickedValue);
    } else if (clickedValue === "." && lastPosition !== ".") {
      valueArray.push(clickedValue);
    } else if (!isLastPositionNumber) {
      valueArray[valueArray.length - 1] = clickedValue;
    }

    this.setState({ currentValues: valueArray });

    console.log(this.state.currentValues);
  }

  /// RENDER METHOD ///

  render() {
    const currentValues = this.state.currentValues;

    return (
      <main>
        <p className="label">
          LUXOR
          <span role="img" aria-label="trademark">
            ™️
          </span>
        </p>

        <h1 id="display">
          {currentValues.length > 0 ? currentValues.join(" ") : 0}
        </h1>

        <button id="clear" onClick={this.allClear}>
          AC
        </button>

        <section className="numbers">
          <button id="seven" onClick={this.handleNumberClick}>
            7
          </button>
          <button id="eight" onClick={this.handleNumberClick}>
            8
          </button>
          <button id="nine" onClick={this.handleNumberClick}>
            9
          </button>
          <button id="four" onClick={this.handleNumberClick}>
            4
          </button>
          <button id="five" onClick={this.handleNumberClick}>
            5
          </button>
          <button id="six" onClick={this.handleNumberClick}>
            6
          </button>
          <button id="one" onClick={this.handleNumberClick}>
            1
          </button>
          <button id="two" onClick={this.handleNumberClick}>
            2
          </button>
          <button id="three" onClick={this.handleNumberClick}>
            3
          </button>
          <button id="zero" onClick={this.handleNumberClick}>
            0
          </button>
          <button id="decimal" onClick={this.handleFunctionClick}>
            .
          </button>
        </section>

        <section className="functions">
          <button id="divide" onClick={this.handleFunctionClick}>
            /
          </button>
          <button id="multiply" onClick={this.handleFunctionClick}>
            *
          </button>
          <button id="subtract" onClick={this.handleFunctionClick}>
            -
          </button>
          <button id="add" onClick={this.handleFunctionClick}>
            +
          </button>
          <button id="equals" onClick={this.handleFunctionClick}>
            =
          </button>
        </section>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
