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
function clickEvent(e) {
  if (selected.length && selected === e.target.id) {
    console.log("we got a match boy");
  }
  selected = e.target.id;
  setTimeout(() => {
    selected = "";
    console.log(selected);
  }, 2000);
  console.log(selected);
}

function createCards() {
  randomizeArray(stateData).forEach((state) => {
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
