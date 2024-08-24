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

const matches = [];
function randomizeArray(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const randomInt = Math.floor(Math.random() * stateData.length - 1) + 1;

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
  if (element.id.endsWith("_img")) {
    const imgElement = element.querySelectorAll("img")[0];
    imgElement.style.display = "none";
    textElement.innerHTML = "?";
  } else {
    textElement.innerHTML = "?";
  }
}

function clickEvent(e) {
  if (matches.includes(e.currentTarget.id) || matches.includes(selected)) {
    selected = "";
    hideContents(e.currentTarget);
    return;
  }
  if (selected.length) {
    const selectedElement = document.getElementById(selected);
    if (selected.split("_")[0] === e.currentTarget.id.split("_")[0]) {
      selectedElement.style.backgroundColor = "blue";
      e.currentTarget.style.backgroundColor = "blue";
      matches.push(selected, e.currentTarget.id);
      selected = "";
    } else {
      selectedElement.style.backgroundColor = "grey";
      e.currentTarget.style.backgroundColor = "grey";
      hideContents(selectedElement);
      selected = "";
    }
  } else {
    showContents(e.currentTarget);
    selected = e.currentTarget.id;
    e.currentTarget.style.backgroundColor = "red";
  }
}

function createCards() {
  stateData.forEach((state) => {
    const textElement = document.createElement("p");
    textElement.innerHTML = "?";
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
