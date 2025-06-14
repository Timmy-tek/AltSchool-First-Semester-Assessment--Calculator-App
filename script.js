const display = document.getElementById("display");
const history = document.getElementById("history");
const historyBtn = document.getElementById("historyBtn");
const notificationBtn = document.getElementById("notificationBtn");
const resetBtn = document.getElementById("resetBtn");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const h3 = document.createElement("h3");
  h3.textContent = display.value;
  history.appendChild(h3);
  try {
    if (display.value.includes("^")) {
      display.value = display.value.replaceAll("^", "**");
    }
    if (display.value.includes("%")) {
      display.value = display.value.replaceAll("%", "*0.01*");
    }
    display.value = eval(display.value);
    if (display.value == "undefined" || display.value == "NaN") {
      setTimeout(clearDisplay, 2000);
    }
  } catch (error) {
    display.value = "Error";
    setTimeout(clearDisplay, 2000);
    // console.log(error);
  }
  const h2 = document.createElement("h2");
  h2.textContent = `ANS:   ${display.value}`;
  history.appendChild(h2);
  history.appendChild(document.createElement("hr"));
  notificationBtn.style.display = "block";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculate();
  }
});

historyBtn.addEventListener("click", () => {
  if (history.style.display == "none") {
    history.style.display = "flex";
    historyBtn.textContent = "<";
  } else {
    history.style.display = "none";
    historyBtn.textContent = ">";
  }
});

resetBtn.addEventListener("click", () => {
  const historyMenu = history.querySelectorAll("h2, h3, hr");
  historyMenu.forEach((menu) => menu.remove());
  clearDisplay();
  notificationBtn.style.display = "none";
});
