const cellContainer = document.querySelector(".cellContainer");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  // row check
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // colunm check
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal check
  [0, 4, 8],
  [2, 4, 6],
];

class TicTacToe {
  _currentPlayer = "X";
  _gameBoard = ["", "", "", "", "", "", "", "", ""];
  _playing = true;
  _winner = false;

  constructor() {
    this._init();
  }

  _condition(a, b, c) {
    return (
      this._gameBoard[a] &&
      this._gameBoard[a] === this._gameBoard[b] &&
      this._gameBoard[b] === this._gameBoard[c]
    );
  }

  _checkWinner() {
    winConditions.forEach((winCondition) => {
      let [a, b, c] = winCondition;
      if (this._condition(a, b, c)) {
        statusText.textContent = `${this._currentPlayer} wins`;
        statusText.style.color = this._currentPlayer === "O" ? "red" : "blue";
        this._playing = false;
        this._winner = true;
      }
    });

    if (!this._gameBoard.includes("") && !this._winner) {
      statusText.textContent = `You draw`;
      statusText.style.color = "initial";
      this._playing = false;
    }
  }
  _changePlayerAndCheckWinner(cell, i) {
    if (cell.textContent !== "" || !this._playing) return;
    cell.textContent = this._currentPlayer;
    this._gameBoard[i] = this._currentPlayer;
    cell.style.color = this._currentPlayer === "O" ? "red" : "blue";
    this._checkWinner();

    if (!this._playing) return;
    this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${this._currentPlayer}'s turn`;
  }

  _cellLoopingChangingPlayerCheckWinner(cells) {
    cells.forEach((cell, i) => {
      cell.addEventListener(
        "click",
        this._changePlayerAndCheckWinner.bind(this, cell, i)
      );
    });
  }

  _restartGame() {
    cells.forEach((cell) => (cell.textContent = ""));
    statusText.textContent = `${this._currentPlayer}'s turn`;
    statusText.style.color = "#373538";
    this._gameBoard = ["", "", "", "", "", "", "", "", ""];
    this._currentPlayer = "X";
    this._playing = true;
    this._winner = false;
  }

  _init() {
    statusText.textContent = `${this._currentPlayer}'s turn`;
    this._cellLoopingChangingPlayerCheckWinner(cells);
    restartBtn.addEventListener("click", this._restartGame.bind(this));
  }
}

new TicTacToe();
