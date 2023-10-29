//Make a button that creates the gameBoard and starts the game
//Add score count
//Add a overlay that displays a rematch button and the score counter
//tweek animations

const createBoard = () => {
  const board = [];
  const boardSize = 3;
  const boardSpace = document.getElementById("boardSpace");
  let currentPlayer = playerOne;

  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.push(cell);
      boardSpace.appendChild(cell);

      //When cell is clicked it will check to see if a cell
      //hasn't already had a move made on it
      //then if fires the makeMove function then makes the
      //Current player variable equal
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          makeMove(cell, currentPlayer);
          if (winCon(currentPlayer.name, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} wins!`);
          }
          currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }
      });
    }
    board.push(row);
  }

  return board;
};

//Click the cell --> Checks if cell does not contain content
//Sets that cells content to the players marker
const makeMove = (cell, player) => {
  if (!cell.textContent) {
    cell.textContent = player.marker;
  }
};

//Selects all the cells in the board with the cell class
const clearCells = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
};

//Factory that stores the players information
function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
  };
}

//Use the createPlayer template to make players 1 and 2
const playerOne = createPlayer("Player 1", "X");
const playerTwo = createPlayer("Player 2", "O");

const gameBoard = createBoard();

const winCon = (name, marker) => {
  const cells = document.querySelectorAll(".cell");

  const possWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of possWin) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent === marker &&
      cells[b].textContent === marker &&
      cells[c].textContent === marker
    ) {
      return true;
    }
  }

  return false;
};
