const stateData = [
  { isImage: false, name: "Delaware" },
  { isImage: false, name: "Pennsylvania" },
  { isImage: false, name: "New_Jersey" },
  { isImage: false, name: "Maryland" },
  { isImage: false, name: "Virginia" },
  { isImage: false, name: "West_Virginia" },
  { isImage: false, name: "New_York" },
  { isImage: false, name: "Connecticut" },
  { isImage: true, name: "Delaware" },
  { isImage: true, name: "Pennsylvania" },
  { isImage: true, name: "New_Jersey" },
  { isImage: true, name: "Maryland" },
  { isImage: true, name: "Virginia" },
  { isImage: true, name: "West_Virginia" },
  { isImage: true, name: "New_York" },
  { isImage: true, name: "Connecticut" },
];

let selected = "";

let matches = [];
function randomizeArray(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function resetBoardEvent() {
  const board = document.getElementById("board");
  for (const child of board.children) {
    child.style.backgroundColor = "white";
    hideContents(child);
  }
  matches = [];
  selected = "";
  clearTimeout(timerId);
  timerId = setInterval(countdown, 1000);
}

function showContents(element) {
  const textElement = element.querySelectorAll("p")[0];
  if (element.id.endsWith("_img")) {
    const imgElement = element.querySelectorAll("img")[0];
    imgElement.style.display = "block";
    textElement.innerHTML = "";
  } else {
    textElement.innerHTML = element.id.replace("_", " ");
  }
}

function hideContents(element) {
  const textElement = element.querySelectorAll("p")[0];
  textElement.innerHTML = "?";
  if (element.id.endsWith("_img")) {
    const imgElement = element.querySelectorAll("img")[0];
    imgElement.style.display = "none";
  }
}

function clickEvent(e) {
  if (matches.includes(e.currentTarget.id) || matches.includes(selected)) {
    selected = "";
    return;
  }
  if (selected.length) {
    const selectedElement = document.getElementById(selected);
    if (
      selected !== e.currentTarget.id &&
      selected.split("_img")[0] === e.currentTarget.id.split("_img")[0]
    ) {
      selectedElement.style.backgroundColor = "blue";
      e.currentTarget.style.backgroundColor = "blue";
      matches.push(selected, e.currentTarget.id);
      showContents(e.currentTarget);
      selected = "";
      setTimeout((e) => {
        const el = document.querySelector("#" + selected);
        el.style.backgroundColor = "grey";
        el.style.backgroundColor = "grey";
      }, 1000);
    } else {
      selectedElement.style.backgroundColor = "grey";
      e.currentTarget.style.backgroundColor = "grey";
      hideContents(selectedElement);
      selected = "";
      setTimeout((e) => {
        const el = document.querySelector("#" + selected);
        el.style.backgroundColor = "grey";
        el.style.backgroundColor = "grey";
      }, 1000);
    }
  } else {
    showContents(e.currentTarget);
    selected = e.currentTarget.id;
    e.currentTarget.style.backgroundColor = "red";
    setTimeout((e) => {
      const el = document.querySelector("#" + selected);
      el.style.backgroundColor = "grey";
      el.style.backgroundColor = "grey";
    }, 1000);
  }
}

function createCards() {
  document
    .getElementById("reset_button")
    .addEventListener("click", resetBoardEvent);
  randomizeArray(stateData).forEach((state) => {
    const textElement = document.createElement("p");
    textElement.innerHTML = "?";
    textElement.id = state.name;
    textElement.classList.add("text");
    if (state.isImage) {
      const card = document.createElement("div");
      const img = document.createElement("img");
      img.src = `assets/${state.name}.png`;
      img.width = 50;
      img.height = 50;
      img.alt = "Map of " + state.name;
      img.style.display = "none";
      img.classList.add("img");
      card.appendChild(img);
      card.appendChild(textElement);
      card.classList.add("card");
      card.id = state.name + "_img";
      card.addEventListener("click", clickEvent);
      document.getElementById("board").appendChild(card);
    } else {
      const card = document.createElement("div");
      card.appendChild(textElement);
      card.classList.add("card");
      card.id = state.name;
      card.addEventListener("click", clickEvent);
      document.getElementById("board").appendChild(card);
    }
  });
}

function render() {
  createCards();
}

render();

var timeLeft = 30;
var elem = document.getElementById("timer");
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
    doSomething();
  } else {
    elem.innerHTML = timeLeft + " Seconds remaining";
    timeLeft--;
  }
}
