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
    const clickedValue = e.target.textContent;
    const lastIndex = valueArray.length - 1;
    const lastPosition = valueArray[lastIndex];

    if (valueArray.length === 0 || isNaN(lastPosition)) {
      if (clickedValue !== "0") {
        valueArray.push(clickedValue);
      }
    } else if (!(lastPosition === "0" && clickedValue === "0")) {
      valueArray[lastIndex] += clickedValue;
    }

    this.setState({ currentValues: valueArray });

    console.log(this.state.currentValues);
  }

  handleFunctionClick(e) {
    let valueArray = this.state.currentValues;
    const clickedValue = e.target.textContent;
    const lastPosition = valueArray[valueArray.length - 1];
    const secondLastPosition = valueArray[valueArray.length - 2];
    const lastIndex = valueArray.length - 1;
    const isLastPositionNumber = !isNaN(lastPosition);

    switch (clickedValue) {
      case "=":
        if (valueArray.length !== 0 && isLastPositionNumber) {
          let result = eval(valueArray.join(""));
          valueArray.length = 0;
          valueArray[0] = result.toString();
        }
        break;
      case ".":
        if (valueArray.length === 0 || isNaN(lastPosition)) {
          valueArray.push("0.");
        } else if (!lastPosition.includes(".")) {
          valueArray[lastIndex] += ".";
        }
        break;
      case "-":
        if (valueArray.length === 0) {
          valueArray.push("0", clickedValue);
        } else if (lastPosition !== "-") {
          valueArray.push(clickedValue);
        }
        break;
      default:
        if (isLastPositionNumber) {
          valueArray.push(clickedValue);
        } else if (valueArray.length !== 0) {
          if (isNaN(secondLastPosition)) {
            valueArray.length -= 2;
            valueArray.push(clickedValue);
          } else {
            valueArray[lastIndex] = clickedValue;
          }
        }
    }

    this.setState({ currentValues: valueArray });

    console.log(this.state.currentValues);
  }

  render() {
    const currentValues = this.state.currentValues;
    const lastPosition = currentValues[currentValues.length - 1];
    const secondLastPosition = currentValues[currentValues.length - 2];

    return (
      <main>
        <p className="label">
          LUXOR
          <span role="img" aria-label="trademark">
            ™️
          </span>
        </p>

        <h1 id="display">
          {currentValues.length > 0
            ? isNaN(lastPosition)
              ? secondLastPosition.slice(0, 16)
              : lastPosition.slice(0, 16)
            : 0}
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
