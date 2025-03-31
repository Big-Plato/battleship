import { generateBoard } from "./domManipulation.js";
import { Real, Computer } from "./player.js";

export const game = () => {
  const divBoard = document.querySelector(".board-div");
  const pBoard = document.querySelector(".board");

  const p1Board = document.querySelector("#p1-board");
  const p2Board = document.querySelector("#p2-board");

  const player1 = new Real();
  const player2 = new Computer();

  const player1Board = player1.board;
  const player2Board = player2.board;
  console.table(player1Board);
  console.table(player2Board);

  generateRandomShips(player1Board);
  generateRandomShips(player2Board);

  generateBoard(p1Board, player1Board);
  generateBoard(p2Board, player2Board);
};

const randomizer = (num) => {
  const random = Math.floor(Math.random() * num);
  return random;
};

const generateRandomShips = (playerBoard) => {
  const ships = ["Destroyer", "Battleship", "Submarine", "Carrier"];

  for (let i = 0; i < ships.length; i++) {
    const shipName = ships[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    const direction = i % 2 === 0 ? "Horizontal" : "Vertical";

    while (!placed && attempts < maxAttempts) {
        try {
            playerBoard.setShip(shipName, randomizer(10), randomizer(10), direction);
            placed = true;
        } catch (err) {
            attempts++;
            if (attempts >= maxAttempts) {
                console.error(`Failed to place ${shipName} after ${maxAttempts} attempts.`)
            }
        }
    }
  }
};
