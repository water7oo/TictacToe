//Make a button that creates the gameBoard and starts the game
//Add score count
//Add a overlay that displays a rematch button and the score counter
//tweek animations

document.getElementById("startOverlay").style.display = "block";

function startGame() {
  const startOverlay = document.getElementById("startOverlay");
  startOverlay.style.display = "none";

  createBoard();
  toggleOverlay2();
}

function toggleOverlay2() {
  document.getElementById("startOverlay").style.display = "none";
}

const createBoard = () => {
  const board = [];
  const boardSize = 3;

  const boardSpace = document.getElementById("boardSpace");

  let P1score = 0;
  let p2score = 0;

  const scoreCounter = document.getElementById("score");
  // scoreCounter.textContent = `${P1score} - ${P2score}`;

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
            scores();
            showScores();
          }
          currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }
      });
    }
    board.push(row);
  }

  return board;
};

const startButton = document.getElementById("startButton");
startButton.onclick = () => {
  const boardSpace = document.getElementById("boardSpace");
  boardSpace.innerHTML = "";
  startGame();
  console.log("Game Start");
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

//score counter
function scores(player) {
  if (player === playerOne) {
    playerOne.score++;
  } else if (player === playerTwo) {
    playerTwo.score++;
  }
}

function showScores(playerOne, playerTwo) {
  const scoreCounter = document.getElementById("score");
  scoreCounter.textContent = ` ${playerOne.scored} - ${playerTwo.scored}`;
}

function updateScores() {
  if (playerOne.scored) {
    playerOne.score++;
  } else {
    playerTwo.score++;
  }
}

//Factory that stores the players information
function createPlayer(name, marker, score) {
  return {
    name: name,
    marker: marker,
    score: score,
  };
}

//Use the createPlayer template to make players 1 and 2
const playerOne = createPlayer("P1", "X", 0);
const playerTwo = createPlayer("P2", "O", 0);

const gameBoard = createBoard();

const winCon = (name, marker, score) => {
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
    let hasWon = false;
    if (
      cells[a].textContent === marker &&
      cells[b].textContent === marker &&
      cells[c].textContent === marker
    ) {
      hasWon = true;
      toggleOverlay(true, name);
      return true;
    }
  }

  return false;
};

function toggleOverlay(hasWon, name, score) {
  const overlay = document.getElementById("overlay");
  const gameText = document.getElementById("winnerMessage");
  const P1score = document.getElementById("P1score");
  const P2score = document.getElementById("P2score");

  gameText.style.textAlign = "center";

  if (hasWon) {
    gameText.textContent = `${name} wins!`;
    playerOne.scored = true;
    P1score.textContent = playerOne.score;
  }

  overlay.style.display = "block";

  showScores();
}

function replayGame() {
  clearCells();
  toggleOverlay(false);
}
