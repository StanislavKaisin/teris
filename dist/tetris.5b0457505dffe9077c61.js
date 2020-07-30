/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./styles.css");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);
// const createGrid = require("./src/createGrid/createGrid");

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector("#root"); // console.log("root=", root);
  //create a game field

  var grid = createGrid(root);
  var miniGrid = createMiniGrid(root);
  console.log("grid=", grid);
  console.dir(grid);
  var squares = Array.from(document.querySelectorAll(".grid>div")); // console.log("squares=", squares);

  var scoreDisplay = document.querySelector("#score"); // console.log("scoreDisplay=", scoreDisplay);

  var startBtn = document.querySelector("#startButton"); // console.log("startBtn=", startBtn);

  var width = 10;
  var nextRandom = 0;
  var timerId = null;
  var score = 0;
  var colors = ["orange", "red", "purple", "green", "blue"]; //Tetrominos

  var lTetromino = [[1, width + 1, width * 2 + 1, 2], [width, width + 1, width + 2, width * 2 + 2], [1, width + 1, width * 2 + 1, width * 2], [width, width * 2, width * 2 + 1, width * 2 + 2]];
  var zTetromino = [[0, width, width + 1, width * 2 + 1], [width + 1, width + 2, width * 2, width * 2 + 1], [0, width, width + 1, width * 2 + 1], [width + 1, width + 2, width * 2, width * 2 + 1]];
  var tTetromino = [[1, width, width + 1, width + 2], [1, width + 1, width + 2, width * 2 + 1], [width, width + 1, width + 2, width * 2 + 1], [1, width, width + 1, width * 2 + 1]];
  var oTetromino = [[0, 1, width, width + 1], [0, 1, width, width + 1], [0, 1, width, width + 1], [0, 1, width, width + 1]];
  var iTetromino = [[1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3], [1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3]];
  var theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
  var currentPosition = 4;
  var currentRotation = 0; //randomly select a tetromino and its first rotation

  var random = Math.floor(Math.random() * theTetrominoes.length); // console.log("random=", random);

  var currentTetromino = theTetrominoes[random][currentRotation]; // console.log("theTetrominoes=", theTetrominoes);
  // console.log("theTetrominoes[0][0]=", theTetrominoes[0][0]);
  // draw the first rotation in the first tetromino

  function draw() {
    currentTetromino.forEach(function (index) {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  draw(); // unDraw the tetromino

  function unDraw() {
    currentTetromino.forEach(function (index) {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  } //make the teromino moveDown every second
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

  document.addEventListener("keydown", control); //movedown function

  function moveDown() {
    unDraw();
    currentPosition += width;
    draw();
    freeze();
  } //freeze function


  function freeze() {
    if (currentTetromino.some(function (index) {
      return squares[currentPosition + index + width].classList.contains("taken");
    })) {
      currentTetromino.forEach(function (index) {
        return squares[currentPosition + index].classList.add("taken");
      });
      random = nextRandom; //start a new tetromino falling

      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      currentTetromino = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  } //move the tetromino left unless is at the edge or there is a blockage


  function moveLeft() {
    unDraw();
    var isAtLeftEdge = currentTetromino.some(function (index) {
      return (currentPosition + index) % width === 0;
    });
    if (!isAtLeftEdge) currentPosition -= 1;

    if (currentTetromino.some(function (index) {
      return squares[currentPosition + index].classList.contains("taken");
    })) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    unDraw();
    var isAtRightEdge = currentTetromino.some(function (index) {
      return (currentPosition + index) % width === width - 1;
    });
    if (!isAtRightEdge) currentPosition += 1;

    if (currentTetromino.some(function (index) {
      return squares[currentPosition + index].classList.contains("taken");
    })) {
      currentPosition -= 1;
    }

    draw();
  } //rotate the tetromino


  function rotate() {
    unDraw();
    currentRotation++;

    if (currentRotation === currentTetromino.length) {
      currentRotation = 0;
    }

    currentTetromino = theTetrominoes[random][currentRotation];
    draw();
  } // show up-next tetromino in mini-grid


  var displaySquares = document.querySelectorAll(".mini-grid div");
  var displayWidth = 4;
  var displayIndex = 0; //the tetromino without rotations

  var upNextTetrominoes = [[1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
  [0, 1, displayWidth, displayWidth + 1], //oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ]; //displat the shape in the mini-grid display

  function displayShape() {
    //remove any trace of a tetromino from the entire grid
    displaySquares.forEach(function (square) {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach(function (index) {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    });
  } // add functionality to the button


  startBtn.addEventListener("click", function () {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  }); // add score

  function addScore() {
    //grid.children.length
    for (var i = 0; i < 199; i++) {
      var row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every(function (index) {
        return squares[index].classList.contains("taken");
      })) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(function (index) {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        var squaresRemoved = squares.splice(i, width); // console.log("squaresRemoved=", squaresRemoved);

        squares = squaresRemoved.concat(squares);
        squares.forEach(function (cell) {
          return grid.appendChild(cell);
        });
      }
    }
  } //game over


  function gameOver() {
    if (currentTetromino.some(function (index) {
      return squares[currentPosition + index].classList.contains("taken");
    })) {
      scoreDisplay.innerHTML = score + " end!";
      clearInterval(timerId);
    }
  }
}); //create grid

function createGrid(container) {
  var gridContainer = document.createElement("div"); // console.dir(gridContainer);

  gridContainer.className += "grid";

  for (var index = 0; index < 210; index++) {
    var element = document.createElement("div");
    if (index >= 200 && index <= 209) element.classList.add("taken");
    gridContainer.appendChild(element);
  }

  container.appendChild(gridContainer);
  return gridContainer;
} //create mini-grid


function createMiniGrid(container) {
  var gridContainer = document.createElement("div");
  gridContainer.className += "mini-grid";

  for (var index = 0; index < 16; index++) {
    var element = document.createElement("div");
    gridContainer.appendChild(element);
  }

  container.appendChild(gridContainer);
  return gridContainer;
}

/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });