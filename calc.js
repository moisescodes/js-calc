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
  }
}

function handleNumber(value) {
  const num = parseInt(value);

  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }

  rerender(buffer);
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
  }
}

document
  .querySelector(".calc-controls")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
