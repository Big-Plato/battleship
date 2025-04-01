import { Real, Computer } from "./player.js";
import {
  start,
  typeWriter,
  generateBoard,
  generateRandomShips,
  triggerGlitch,
} from "./domManipulation.js";

const divBoard = document.querySelector(".board-div");
const pBoard = document.querySelector(".board");
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
  });

  switchTurns();
};

const playButtons = () => {
  const randomizeBtn = document.createElement("button");
  randomizeBtn.setAttribute("id", "random-btn");
  ctrlDiv.insertBefore(randomizeBtn, start);
};

const switchTurns = (Player = "Ressens") => {
  typeWriter(info, `${Player}'s turn`);
};

export function handleBtnClick() {
  console.log("Clicked");
}
