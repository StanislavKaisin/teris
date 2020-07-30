// const createGrid = require("./src/createGrid/createGrid");
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  // console.log("root=", root);
  //create a game field

  const grid = createGrid(root);
  const miniGrid = createMiniGrid(root);
  console.log("grid=", grid);
  console.dir(grid);
  let squares = Array.from(document.querySelectorAll(".grid>div"));

  // console.log("squares=", squares);
  const scoreDisplay = document.querySelector("#score");
  // console.log("scoreDisplay=", scoreDisplay);
  const startBtn = document.querySelector("#startButton");
  // console.log("startBtn=", startBtn);
  const width = 10;
  let nextRandom = 0;
  let timerId = null;
  let score = 0;

  const colors = ["orange", "red", "purple", "green", "blue"];

  //Tetrominos
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  //randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  // console.log("random=", random);
  let currentTetromino = theTetrominoes[random][currentRotation];

  // console.log("theTetrominoes=", theTetrominoes);
  // console.log("theTetrominoes[0][0]=", theTetrominoes[0][0]);
  // draw the first rotation in the first tetromino
  function draw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }
  draw();

  // unDraw the tetromino
  function unDraw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //make the teromino moveDown every second
  // timerId = setInterval(moveDown, 1000);

  //assign functions to keyCodes
  function control(e) {
    // console.log("e.keyCode =", e.keyCode);
    if (e.keyCode && e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode && e.keyCode === 38) {
      rotate();
    } else if (e.keyCode && e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode && e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keydown", control);

  //movedown function
  function moveDown() {
    unDraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function
  function freeze() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      currentTetromino.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      random = nextRandom;
      //start a new tetromino falling
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      currentTetromino = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  //move the tetromino left unless is at the edge or there is a blockage
  function moveLeft() {
    unDraw();
    const isAtLeftEdge = currentTetromino.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }
  function moveRight() {
    unDraw();
    const isAtRightEdge = currentTetromino.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
  //rotate the tetromino
  function rotate() {
    unDraw();
    currentRotation++;
    if (currentRotation === currentTetromino.length) {
      currentRotation = 0;
    }
    currentTetromino = theTetrominoes[random][currentRotation];
    draw();
  }
  // show up-next tetromino in mini-grid
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  const displayIndex = 0;
  //the tetromino without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
  ];

  //displat the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino from the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }
  // add functionality to the button
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });
  // add score
  function addScore() {
    //grid.children.length
    for (let i = 0; i < 199; i++) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        // console.log("squaresRemoved=", squaresRemoved);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
  //game over
  function gameOver() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = score + " end!";
      clearInterval(timerId);
    }
  }
});

//create grid
function createGrid(container) {
  const gridContainer = document.createElement("div");
  // console.dir(gridContainer);
  gridContainer.className += "grid";
  for (let index = 0; index < 200; index++) {
    const element = document.createElement("div");
    if (index >= 200 && index <= 209) element.classList.add("taken");
    gridContainer.appendChild(element);
  }
  createFinishLine(gridContainer);
  container.appendChild(gridContainer);

  return gridContainer;
}
//create finish line
function createFinishLine(container) {
  // const gridContainer = document.createElement("div");
  // console.dir(gridContainer);
  // gridContainer.className += "grid";
  for (let index = 0; index < 10; index++) {
    const element = document.createElement("div");
    element.classList.add("taken");
    container.appendChild(element);
  }
  // container.appendChild(gridContainer);
  // return gridContainer;
}
//create mini-grid
function createMiniGrid(container) {
  const gridContainer = document.createElement("div");
  gridContainer.className += "mini-grid";
  for (let index = 0; index < 16; index++) {
    const element = document.createElement("div");
    gridContainer.appendChild(element);
  }
  container.appendChild(gridContainer);
  return gridContainer;
}
