//gameboard module
const gameboard = (() => {
  const board = new Array(9);
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return board;
})();
let currentBoard = gameboard;

//View - Display Controller Module
const display = (function () {
  let board = document.querySelector(".board");

  return {
    updateBoard: function (player, symbol, moveLocation) {
      console.log(`${player} put a ${symbol} in cell location ${moveLocation}`);
    },

    init: function () {
      let board = document.querySelector(".board");
      for (i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell", "flex");
        cell.setAttribute("data-cell", i);
        board.append(cell);
      }
      display.boardListener();
    },

    boardListener: function () {
      board.addEventListener("click", (e) => {
        let selectedCell = null;
        if (e.target.classList.contains("cell")) {
          selectedCell = e.target.dataset.cell;
        } else {
          let getClosestContainer = e.target.closest(".cell");
          selectedCell = getClosestContainer.dataset.cell;
        }
        display.updateBoard("player1", "x", selectedCell);
        display.updateBoardTest(selectedCell);
      });
    },
    updateBoardTest: function (selectedCell) {
      const cellNodes = document.querySelectorAll(".cell");
      const cellArray = Array.from(cellNodes);
      cellArray[selectedCell].innerText = selectedCell;
    },

    winner: function () {
      console.log("Winner");
    },

    resetBoard: function () {
      board.replaceChildren();
      display.init();
    },
  };
})();

//player Factory
const player = (name, computer, symbol) => {
  return { name, computer, symbol };
};

const jon = player("Jon", false, "circle");

function checkForWinningLine(arr, val) {
  var indexes = [];

  for (i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
}

const x = checkForWinningLine(currentBoard, "x");
const reset = document.querySelector(".reset");
reset.addEventListener("click", display.resetBoard);
display.init();
