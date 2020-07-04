// const createGrid = require("./src/createGrid/createGrid");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  console.log("root=", root);
  createGrid(root);
});

function createGrid(container) {
  const gridContainer = document.createElement("div");
  // console.dir(gridContainer);
  gridContainer.className += "grid";
  for (let index = 0; index < 100; index++) {
    const element = document.createElement("div");
    gridContainer.appendChild(element);
  }
  container.appendChild(gridContainer);
}
