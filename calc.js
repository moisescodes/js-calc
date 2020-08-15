// Start
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".calc-output");

function rerender(value) {
  screen.innerHTML = value;
}

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
    rerender(buffer);
  }
}

function flushOperation(num) {
  // console.log("flush: ", num, previousOperator, runningTotal, buffer);
  switch (previousOperator) {
    case "+":
      runningTotal += num;
      break;
    case "–":
      runningTotal -= num;
      break;
    case "×":
      runningTotal *= num;
      break;
    case "÷":
      runningTotal /= num;
      break;
    default:
      break;
  }
}

function handleMath(value) {
  if (buffer === "0") return;

  const num = parseInt(buffer);
  // console.log("math: ", runningTotal, num);
  if (runningTotal === 0) {
    runningTotal = num;
  } else {
    flushOperation(num);
    rerender(runningTotal);
  }

  previousOperator = value;
  buffer = "0";
}

function handleNumber(value) {
  const num = parseInt(value);

  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      rerender(buffer);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      rerender(buffer);
      runningTotal = 0;
      break;
    case "←":
      if (buffer === "0") {
        return;
      } else if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      rerender(buffer);
      break;
    default:
      handleMath(value);
      break;
  }
}

document
  .querySelector(".calc-controls")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
