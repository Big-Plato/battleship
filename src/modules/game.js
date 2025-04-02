import { Real, Computer } from "./player.js";
import {
  start,
  typeWriter,
  generateBoard,
  generateRandomShips,
  triggerGlitch,
} from "./domManipulation.js";
import { setGameInstance } from "./gameState.js";

const ctrlDiv = document.querySelector(".ctrl-btn");
const info = document.querySelector("#info");

const p1Board = document.querySelector("#p1-board");
const p2Board = document.querySelector("#p2-board");

export const game = () => {
  start.innerHTML = "";

  const player1 = new Real();
  const player2 = new Computer();

  const player1Board = player1.board;
  const player2Board = player2.board;

  generateRandomShips(player1Board);
  generateRandomShips(player2Board);

  player1Board.printShips();
player2Board.printShips();

  generateBoard(p1Board, player1Board);
  generateBoard(p2Board, player2Board);

  triggerGlitch("p1-board");
  triggerGlitch("p2-board");

  typeWriter(start, "Begin");
  playButtons();

  const randomBtn = document.querySelector("#random-btn");
  typeWriter(randomBtn, "Randomize");

  randomBtn.addEventListener("click", () => {
    player1.board.eraseBoard();
    p1Board.innerHTML = "";
    triggerGlitch("p1-board");
    generateRandomShips(player1Board);
    generateBoard(p1Board, player1Board);
  });

  start.removeEventListener("click", game);
  start.addEventListener("click", () => {
    randomBtn.remove();
    start.remove();
    gameFlow();
  });

  const playerOne = {
    name: player1.name,
    gameOver: player1.board.gameOver(),
    board: player1.board.board,
    ships: player1.board.ships,
  };

  const playerTwo = {
    name: player2.name,
    gameOver: player2.board.gameOver(),
    board: player2.board.board,
    ships: player2.board.ships,
  };

  setGameInstance({
    receiveAttack(x, y, opponent) {
      const board = opponent === 'human' ? player2Board : player1Board;
      return board.receiveAttack(x, y);
    }
  });

  const buttonsPlayer2 = handleBtns("p2-board");

  // The game really starts here
  const gameFlow = () => {
    const checkGameOver = () => {
      if (player1.board.gameOver()) {
        typeWriter(info, "Player 2 Wins!");
        disableBoard();
        return true;
      }

      if (player2.board.gameOver()) {
        typeWriter(info, "Player 1 Wins!");
        disableBoard();
        return true;
      }
      return false;
    }

    const disableBoard = () => {
      const boards = document.querySelectorAll(".board");
      boards.forEach(board => {
        board.classList.add("disabled-board");
      });
      document.querySelectorAll(".hidden").forEach(btn => {
        btn.style.pointerEvents = "none";
      });
    };

    let currentPlayer = 'human';

    const handleHumanTurn = (e) => {
      if (currentPlayer !== 'human') return;
      if (checkGameOver()) return;

      const result = playerBtns(e, player2Board);
      typeWriter(info, `${playerOne.name}'s turn`);

      if (result === "Miss") {
        currentPlayer = 'computer';
        setTimeout(handleComputerTurn, 1000);
      }
    };

    const handleComputerTurn = () => {
      if (currentPlayer !== 'computer') return;
      if (checkGameOver()) return;

      let result;
      let consecutiveHits = 0;
      const maxConsecutiveAttempts = 100;

      do {
        result = computerPlay(player1Board);
        typeWriter(info, `${playerTwo.name}'s turn`);

        if (result === "Play Again") {
          consecutiveHits++;
          if (consecutiveHits >= maxConsecutiveAttempts) {
            console.error("Max consecutive hits reached");
            break;
          }
        }
      } while (result === "Play Again" && !checkGameOver());

      currentPlayer = 'human';
    };

    document.getElementById('p2-board').addEventListener("click", (event) => {
      const cell = event.target.closest(".hidden");
      if (cell) handleHumanTurn(cell);
    });

    typeWriter(info, `${playerOne.name}'s turn`);
  };
};

const playButtons = () => {
  const randomizeBtn = document.createElement("button");
  randomizeBtn.setAttribute("id", "random-btn");
  ctrlDiv.insertBefore(randomizeBtn, start);
};

const handleBtns = (board) => {
  let buttons = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const button = document.querySelector(`#${board}-h${i}${j}`);
      buttons.push(button);
    }
  }
  return buttons;
};

const computerPlay = (player1Board) => {
  let x, y, result;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    const cell = document.querySelector(`#p1-board-${x}${y}`);

    if (!cell.classList.contains("revealed")) {
      try {
        result = player1Board.receiveAttack(x, y);
        cell.classList.add("revealed");
        cell.classList.add(result.hit ? "hit" : "miss");
        return result.hit ? "Play Again" : "Miss";
      } catch (error) {
        console.log("Invalid attack, trying again...");
      }
    }
    attempts++;
  } while (attempts < maxAttempts);

  console.error("Failed to find valid attack after", maxAttempts, "attempts");
  return "Miss";
};

const playerBtns = (cell, board) => {
 const x = parseInt(cell.dataset.x);
 const y = parseInt(cell.dataset.y);
 const result = board.receiveAttack(x, y);

 cell.classList.add("revealed");
 cell.classList.add(result.hit ? "hit" : "miss");

 return result.hit ? "Play Again" : "Miss";
  
};
