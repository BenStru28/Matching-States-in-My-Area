const stateData = [
  { isImage: false, name: "Delaware" },
  { isImage: false, name: "Pennsylvania" },
  { isImage: false, name: "New Jersey" },
  { isImage: false, name: "Maryland" },
  { isImage: false, name: "Virginia" },
  { isImage: false, name: "West Virginia" },
  { isImage: false, name: "New York" },
  { isImage: false, name: "Connecticut" },
  { isImage: true, name: "Delaware" },
  { isImage: true, name: "Pennsylvania" },
  { isImage: true, name: "New Jersey" },
  { isImage: true, name: "Maryland" },
  { isImage: true, name: "Virginia" },
  { isImage: true, name: "West Virginia" },
  { isImage: true, name: "New York" },
  { isImage: true, name: "Connecticut" },
];
function randomizeArray(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const randomInt = Math.floor(Math.random() * stateData.length - 1) + 1;

let selected = "";

const matches = [];

function clickEvent(e) {
  if (matches.includes(e.target.id) || matches.includes(selected)) {
    selected = "";
  }
  if (selected.length) {
    if (selected !== e.target.id && selected === e.target.id.split("_")[0]) {
      document.getElementById(selected).style.backgroundColor = "blue";
      e.target.style.backgroundColor = "blue";
      matches.push(selected, e.target.id);
      selected = "";
    } else {
      document.getElementById(selected).style.backgroundColor = "grey";
      e.target.style.backgroundColor = "grey";
      selected = "";
    }
  } else {
    selected = e.target.id;
    e.target.style.backgroundColor = "red";
  }
}

function createCards() {
  stateData.forEach((state) => {
    const updatedName = state.name.replace(" ", "");
    if (state.isImage) {
      const card = document.createElement("div");
      const img = document.createElement("img");
      img.src = `assets/${updatedName}.png`;
      img.width = 50;
      img.height = 50;
      img.style.display = "none";
      card.appendChild(img);
      card.innerHTML = "?";
      card.classList.add("card");
      card.id = updatedName + "_img";
      card.addEventListener("click", clickEvent);
      document.getElementById("board").appendChild(card);
    } else {
      const card = document.createElement("div");
      card.innerHTML = "?";
      card.classList.add("card");
      card.id = updatedName;
      card.addEventListener("click", clickEvent);
      document.getElementById("board").appendChild(card);
    }
  });
}

function render() {
  createCards();
}

render();
