//Create a 3x3 game board
//2 player objects enter the board

//Your main goal here is to have as little global code as possible.
//Try tucking everything away inside of a module or factory. Rule of thumb:
//if you only ever need ONE of something
//(gameBoard, displayController), use a module.
//If you need multiples of something (players!), create them with factories.

const createBoard = () => {
  const board = [];
  const boardSize = 3;
  const boardSpace = document.getElementById("boardSpace");

  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.push(cell);
      boardSpace.appendChild(cell);
    }
    board.push(row);
  }

  return board;
};

const playerOne = {
  name: "Player 1",
  marker: "X",
};

const playerTwo = {
  name: "Player 2",
  marker: "X",
};

const gameBoard = createBoard();
